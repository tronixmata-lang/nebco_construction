#!/usr/bin/env bash
set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$APP_DIR"

# shellcheck disable=SC1091
source "$(dirname "$0")/load-env.sh" .env.local

PORT="${PORT:-3000}"
BASE_URL="${NEXT_PUBLIC_SITE_URL%/}"
LOCAL_URL="http://127.0.0.1:${PORT}"

echo "==> NEBCO production verification"
echo "    NEXT_PUBLIC_SITE_URL=$BASE_URL"
echo "    App port (PM2):     $PORT"
echo ""

fail=0

check() {
  if "$@"; then
    echo "  OK   $1"
  else
    echo "  FAIL $1"
    fail=1
  fi
}

echo "==> MongoDB"
if node -r dotenv/config -e "
  const mongoose = require('mongoose');
  mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
    .then(() => mongoose.connection.db.admin().ping())
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
" 2>/dev/null; then
  echo "  OK   MongoDB connection"
else
  echo "  FAIL MongoDB connection (check MONGODB_URI and mongod)"
  fail=1
fi

echo ""
echo "==> PM2"
if command -v pm2 >/dev/null 2>&1 && pm2 describe nebco >/dev/null 2>&1; then
  echo "  OK   PM2 process 'nebco' is registered"
  pm2_status=$(pm2 jlist 2>/dev/null | node -e "
    const apps = JSON.parse(require('fs').readFileSync(0,'utf8'));
    const app = apps.find(a => a.name === 'nebco');
    process.stdout.write(app?.pm2_env?.status || 'unknown');
  " 2>/dev/null || echo "unknown")
  if [ "$pm2_status" = "online" ]; then
    echo "  OK   PM2 status: online"
  else
    echo "  FAIL PM2 status: $pm2_status (run: pm2 restart nebco --update-env)"
    fail=1
  fi
else
  echo "  WARN PM2 app not running (start with: pm2 start ecosystem.config.cjs)"
fi

echo ""
echo "==> HTTP (local app on port $PORT)"
for path in "/" "/api/public/redirects" "/admin/login"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "${LOCAL_URL}${path}" || echo "000")
  if [ "$code" = "200" ] || [ "$code" = "307" ] || [ "$code" = "308" ]; then
    echo "  OK   GET ${path} -> $code"
  else
    echo "  FAIL GET ${path} -> $code"
    fail=1
  fi
done

echo ""
echo "==> Admin login API"
login_code=$(curl -s -o /tmp/nebco-login.json -w "%{http_code}" \
  -X POST "${LOCAL_URL}/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"${ADMIN_EMAIL:-admin@nebco.com.np}\",\"password\":\"${ADMIN_PASSWORD:-}\"}" || echo "000")

if [ "$login_code" = "200" ]; then
  echo "  OK   POST /api/auth/login -> 200"
elif [ "$login_code" = "401" ]; then
  echo "  WARN POST /api/auth/login -> 401 (wrong ADMIN_PASSWORD; run: npm run fix-admin)"
  fail=1
else
  echo "  FAIL POST /api/auth/login -> $login_code"
  cat /tmp/nebco-login.json 2>/dev/null || true
  fail=1
fi

echo ""
echo "==> Nginx (optional)"
if command -v nginx >/dev/null 2>&1; then
  if grep -R "proxy_pass http://127.0.0.1:${PORT}" /etc/nginx/sites-enabled/ >/dev/null 2>&1; then
    echo "  OK   Nginx proxies to port $PORT"
  else
  echo "  WARN Nginx proxy_pass may not target port $PORT (expected: http://127.0.0.1:${PORT})"
  fi
  if [ "$BASE_URL" != "$LOCAL_URL" ]; then
    public_code=$(curl -s -o /dev/null -w "%{http_code}" "${BASE_URL}/" || echo "000")
    if [ "$public_code" = "200" ]; then
      echo "  OK   Public URL ${BASE_URL}/ -> $public_code"
    else
      echo "  WARN Public URL ${BASE_URL}/ -> $public_code (DNS, firewall, or SSL may need setup)"
    fi
  fi
else
  echo "  SKIP nginx not installed"
fi

echo ""
if [ "$fail" -eq 0 ]; then
  echo "All critical checks passed."
  echo "Site:  $BASE_URL"
  echo "Admin: $BASE_URL/admin/login"
  exit 0
fi

echo "Some checks failed. Review messages above and DEPLOYMENT.md."
exit 1
