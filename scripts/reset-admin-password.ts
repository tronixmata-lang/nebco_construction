import { config } from "dotenv";
import { connectDB } from "../src/lib/db/connect";
import { User } from "../src/lib/db/models";
import { hashPassword } from "../src/lib/auth/password";

config({ path: ".env.local" });

async function main() {
  const email = (process.env.ADMIN_EMAIL ?? "admin@nebco.com.np").toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "Admin@Nebco2024";

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set in .env.local");
  }

  await connectDB();

  const existing = await User.findOne({ email });
  if (existing) {
    existing.passwordHash = await hashPassword(password);
    existing.isActive = true;
    existing.role = "superadmin";
    await existing.save();
    console.log(`Reset admin password for ${email}`);
    return;
  }

  await User.create({
    email,
    passwordHash: await hashPassword(password),
    name: "NEBCO Admin",
    role: "superadmin",
    isActive: true,
  });
  console.log(`Created admin user ${email}`);
}

main()
  .catch((error) => {
    console.error("Reset admin failed:", error);
    process.exit(1);
  })
  .finally(() => process.exit(0));
