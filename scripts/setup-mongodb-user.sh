#!/usr/bin/env bash
set -euo pipefail

# Creates a MongoDB user for the NEBCO app when auth is enabled on mongod.
# Usage:
#   chmod +x scripts/setup-mongodb-user.sh
#   MONGO_APP_USER=nebco MONGO_APP_PASSWORD='your-password' ./scripts/setup-mongodb-user.sh

APP_USER="${MONGO_APP_USER:-nebco}"
APP_PASSWORD="${MONGO_APP_PASSWORD:-}"
APP_DB="${MONGO_APP_DB:-nebco}"

if [ -z "$APP_PASSWORD" ]; then
  echo "ERROR: Set MONGO_APP_PASSWORD before running."
  echo "Example:"
  echo "  MONGO_APP_USER=nebco MONGO_APP_PASSWORD='StrongPass123!' ./scripts/setup-mongodb-user.sh"
  exit 1
fi

if ! command -v mongosh >/dev/null 2>&1; then
  echo "ERROR: mongosh not found. Install MongoDB shell first."
  exit 1
fi

echo "==> Creating MongoDB user '$APP_USER' on database '$APP_DB'"

mongosh --quiet <<EOF
const user = "$APP_USER";
const pwd = "$APP_PASSWORD";
const dbName = "$APP_DB";

const target = db.getSiblingDB(dbName);
try {
  target.createUser({
    user,
    pwd,
    roles: [{ role: "readWrite", db: dbName }],
  });
  print("Created user: " + user);
} catch (e) {
  if (String(e).includes("already exists")) {
    target.updateUser(user, { pwd, roles: [{ role: "readWrite", db: dbName }] });
    print("Updated existing user: " + user);
  } else {
    throw e;
  }
}
EOF

ENCODED_PASSWORD=$(python3 -c "import urllib.parse; print(urllib.parse.quote('''$APP_PASSWORD''', safe=''))")

echo ""
echo "Add this to .env.local:"
echo "MONGODB_URI=mongodb://${APP_USER}:${ENCODED_PASSWORD}@127.0.0.1:27017/${APP_DB}?authSource=${APP_DB}"
echo ""
echo "Then run:"
echo "  npm run fix-admin"
echo "  pm2 restart nebco --update-env"
