import "dotenv/config";
import { seedDatabase } from "../src/lib/db/seed";

async function main() {
  console.log("Seeding NEBCO database...");
  try {
    const counts = await seedDatabase();
    console.log("Seed complete:", counts);
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

main();
