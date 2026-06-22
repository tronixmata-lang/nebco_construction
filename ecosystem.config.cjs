/** @type {import('pm2').StartOptions[]} */
const port = process.env.PORT || 3010;

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
      env: {
        NODE_ENV: "production",
        PORT: port,
        HOSTNAME: "0.0.0.0",
      },
    },
  ],
};
