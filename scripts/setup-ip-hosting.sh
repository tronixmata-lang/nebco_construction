#!/usr/bin/env bash
# First-time VPS setup using public IP only (no domain, no SSL).
# Usage:
#   ./scripts/setup-ip-hosting.sh YOUR_VPS_IP [PORT]
# Examples:
#   ./scripts/setup-ip-hosting.sh 163.47.151.250 3010
#   ./scripts/setup-ip-hosting.sh                    # auto-detect IP + free port

set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
APP_NAME="${APP_NAME:-nebco}"
cd "$APP_DIR"

pick_free_port() {
  local candidate
  for candidate in 3010 3012 3015 3020 8080; do
    if ! ss -tln 2>/dev/null | grep -q ":${candidate} "; then
      echo "$candidate"
      return 0
    fi
  done
  echo "3010"
}

port_in_use() {
  ss -tln 2>/dev/null | grep -q ":$1 "
}

VPS_IP="${1:-}"
APP_PORT="${2:-}"

if [ -z "$VPS_IP" ]; then
  echo "==> Detecting public IP..."
  VPS_IP="$(curl -fsSL --max-time 8 ifconfig.me 2>/dev/null || curl -fsSL --max-time 8 icanhazip.com 2>/dev/null || true)"
fi

if [ -z "$VPS_IP" ]; then
  echo "ERROR: Could not detect public IP. Pass it as an argument:"
  echo "  ./scripts/setup-ip-hosting.sh 163.47.151.250 3010"
  exit 1
fi

if [ -z "$APP_PORT" ]; then
  APP_PORT="$(pick_free_port)"
  echo "==> Ports 3000/3001 in use — picked free port: $APP_PORT"
elif port_in_use "$APP_PORT"; then
  echo "ERROR: Port $APP_PORT is already in use. Pick another, e.g. 3012"
  exit 1
fi

SITE_URL="http://${VPS_IP}:${APP_PORT}"
echo "==> NEBCO IP-only hosting setup"
echo "    Public URL: $SITE_URL"
echo "    Admin:      $SITE_URL/admin/login"
echo "    App port:   $APP_PORT"
echo ""

set_env() {
  local key="$1"
  local value="$2"
  if grep -q "^${key}=" .env.local 2>/dev/null; then
    sed -i "s|^${key}=.*|${key}=${value}|" .env.local
  else
    echo "${key}=${value}" >> .env.local
  fi
}

if [ ! -f ".env.local" ]; then
  cp .env.example .env.local
fi

sed -i 's/\r$//' .env.local 2>/dev/null || true

set_env "NEXT_PUBLIC_SITE_URL" "$SITE_URL"
set_env "NODE_ENV" "production"
set_env "PORT" "$APP_PORT"
set_env "HOSTNAME" "0.0.0.0"

if grep -q "^JWT_SECRET=change-me" .env.local || grep -q "^JWT_SECRET=$" .env.local; then
  JWT_SECRET="$(openssl rand -base64 48)"
  set_env "JWT_SECRET" "$JWT_SECRET"
  echo "==> Generated new JWT_SECRET"
fi

# shellcheck disable=SC1091
source "$(dirname "$0")/load-env.sh" .env.local

echo "==> Installing dependencies..."
npm ci

echo "==> Building for $NEXT_PUBLIC_SITE_URL ..."
npm run build

echo "==> Creating upload directory..."
mkdir -p public/uploads

echo "==> Seeding database..."
npm run seed

if ! command -v pm2 >/dev/null 2>&1; then
  echo "==> Installing PM2..."
  sudo npm install -g pm2
fi

echo "==> Starting app with PM2 on port $APP_PORT..."
if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  pm2 restart ecosystem.config.cjs --update-env
else
  pm2 start ecosystem.config.cjs
  pm2 save
  pm2 startup | tail -n 1 | bash || true
fi

if command -v ufw >/dev/null 2>&1; then
  echo "==> Opening firewall port $APP_PORT..."
  sudo ufw allow OpenSSH >/dev/null 2>&1 || true
  sudo ufw allow "${APP_PORT}/tcp" >/dev/null 2>&1 || true
  sudo ufw --force enable >/dev/null 2>&1 || true
fi

if [ -x "scripts/verify-production.sh" ]; then
  echo "==> Verifying..."
  bash scripts/verify-production.sh || true
fi

echo ""
echo "Setup complete (IP only, no domain)."
echo "  Site:  $SITE_URL"
echo "  Admin: $SITE_URL/admin/login"
echo "  Email: $ADMIN_EMAIL"
echo "  Pass:  (ADMIN_PASSWORD in .env.local)"
echo ""
echo "If admin login fails, run: npm run fix-admin"
