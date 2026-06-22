#!/usr/bin/env bash
set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$APP_DIR"

echo "==> Checking .env.local"
if [ ! -f ".env.local" ]; then
  echo "ERROR: .env.local missing. Run: cp .env.example .env.local && nano .env.local"
  exit 1
fi

# Strip Windows CRLF if present in env file
sed -i 's/\r$//' .env.local 2>/dev/null || true

set -a
# shellcheck disable=SC1091
source .env.local
set +a

missing=0
for key in MONGODB_URI JWT_SECRET ADMIN_EMAIL ADMIN_PASSWORD; do
  if [ -z "${!key:-}" ]; then
    echo "ERROR: $key is not set in .env.local"
    missing=1
  fi
done
[ "$missing" -eq 0 ] || exit 1

echo "==> MongoDB"
if ! systemctl is-active --quiet mongod 2>/dev/null; then
  echo "WARN: mongod service not active. Try: sudo systemctl start mongod"
fi

echo "==> Resetting admin user: ${ADMIN_EMAIL}"
npm run reset-admin

echo "==> Done. Login with:"
echo "    Email:    $ADMIN_EMAIL"
echo "    Password: (value of ADMIN_PASSWORD in .env.local)"
echo "    URL:      ${NEXT_PUBLIC_SITE_URL:-http://localhost:3010}/admin/login"
