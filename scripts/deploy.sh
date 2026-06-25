#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-$(cd "$(dirname "$0")/.." && pwd)}"
APP_NAME="${APP_NAME:-nebco}"

cd "$APP_DIR"

echo "==> Deploying NEBCO from $APP_DIR"

if [ ! -f ".env.local" ]; then
  echo "ERROR: .env.local not found. Copy .env.example to .env.local and fill in production values."
  exit 1
fi

# NEXT_PUBLIC_* variables are embedded at build time — load env before npm run build.
# shellcheck disable=SC1091
source "$(dirname "$0")/load-env.sh" .env.local

echo "    Building for: $NEXT_PUBLIC_SITE_URL (port $PORT)"

echo "==> Pulling latest code..."
git pull origin main

echo "==> Installing dependencies..."
npm ci

echo "==> Building..."
npm run build

echo "==> Ensuring upload directory exists..."
mkdir -p uploads
if [ -d public/uploads ]; then
  cp -rn public/uploads/. uploads/ 2>/dev/null || true
  rm -rf public/uploads
fi

if command -v pm2 >/dev/null 2>&1; then
  if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
    echo "==> Restarting PM2 app: $APP_NAME"
    pm2 restart ecosystem.config.cjs --update-env
  else
    echo "==> Starting PM2 app: $APP_NAME"
    pm2 start ecosystem.config.cjs
    pm2 save
  fi
  pm2 status "$APP_NAME"
else
  echo "PM2 not installed. Start manually with: bash scripts/start-prod.sh"
fi

if [ -x "scripts/verify-production.sh" ]; then
  echo "==> Running production checks..."
  bash scripts/verify-production.sh || true
fi

echo "==> Deploy complete."
