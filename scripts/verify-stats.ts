import { connectDB } from "@/lib/db/connect";
import { Stat } from "@/lib/db/models";
import { getStats } from "@/lib/data/content";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

async function main() {
  await connectDB();

  const target = await Stat.findOne({ legacyId: "years", published: true }).lean();
  assert(Boolean(target), 'No published stat with legacyId "years" found. Run npm run seed first.');

  const originalValue = target!.value;
  const originalLabel = target!.label;
  const testValue = `99+`;
  const testLabel = `Verify Label ${Date.now()}`;

  await Stat.findByIdAndUpdate(
    target!._id,
    { $set: { value: testValue, label: testLabel } },
    { runValidators: true },
  );

  const publicStats = await getStats();
  const yearsStat = publicStats.find((stat) => stat.id === "years");
  assert(Boolean(yearsStat), 'getStats() did not return a stat with id "years"');
  assert(yearsStat!.value === testValue, `value mismatch: expected "${testValue}", got "${yearsStat!.value}"`);
  assert(yearsStat!.label === testLabel, `label mismatch: expected "${testLabel}", got "${yearsStat!.label}"`);

  await Stat.findByIdAndUpdate(
    target!._id,
    { $set: { value: originalValue, label: originalLabel } },
    { runValidators: true },
  );

  const restored = await getStats();
  const restoredYears = restored.find((stat) => stat.id === "years");
  assert(restoredYears?.value === originalValue, "failed to restore original stat value");
  assert(restoredYears?.label === originalLabel, "failed to restore original stat label");

  console.log("✓ Stat admin updates flow through getStats() to the public site");
  console.log("\nAll stat checks passed.");
}

main().catch((error) => {
  console.error("\nStat verification failed:");
  console.error(error);
  process.exit(1);
});
