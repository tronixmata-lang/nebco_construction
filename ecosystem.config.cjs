const path = require("path");

require("dotenv").config({ path: path.join(__dirname, ".env.local") });

const port = process.env.PORT || "3000";

function productionEnv() {
  const picked = {
    NODE_ENV: "production",
    PORT: port,
    HOSTNAME: process.env.HOSTNAME || "0.0.0.0",
    DOTENV_CONFIG_PATH: path.join(__dirname, ".env.local"),
  };

  for (const [key, value] of Object.entries(process.env)) {
    if (
      value &&
      (key === "MONGODB_URI" ||
        key === "JWT_SECRET" ||
        key.startsWith("ADMIN_") ||
        key.startsWith("NEXT_PUBLIC_") ||
        key.startsWith("SMTP_") ||
        key === "NOTIFY_EMAIL")
    ) {
      picked[key] = value;
    }
  }

  return picked;
}

/** @type {import('pm2').StartOptions[]} */
module.exports = {
  apps: [
    {
      name: "nebco",
      script: "scripts/start-prod.sh",
      interpreter: "bash",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "512M",
      env: productionEnv(),
    },
  ],
};
