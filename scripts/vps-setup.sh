#!/usr/bin/env bash
set -euo pipefail

# First-time VPS setup for Ubuntu/Debian.
# Run on the server after cloning the repo:
#   chmod +x scripts/vps-setup.sh && ./scripts/vps-setup.sh

APP_DIR="${APP_DIR:-$(cd "$(dirname "$0")/.." && pwd)}"
APP_NAME="${APP_NAME:-nebco}"
DOMAIN="${DOMAIN:-}"

cd "$APP_DIR"

echo "==> NEBCO VPS setup"
echo "App directory: $APP_DIR"

if [ ! -f ".env.local" ]; then
  echo "==> Creating .env.local from .env.example"
  cp .env.example .env.local
  echo "IMPORTANT: Edit .env.local with production values before continuing."
  echo "  nano .env.local"
  exit 1
fi

# shellcheck disable=SC1091
source "$(dirname "$0")/load-env.sh" .env.local
echo "    Site URL: $NEXT_PUBLIC_SITE_URL"
echo "    App port: $PORT"

echo "==> Installing dependencies..."
npm ci

echo "==> Building production app..."
npm run build

echo "==> Creating upload directory..."
mkdir -p uploads
if [ -d public/uploads ]; then
  cp -rn public/uploads/. uploads/ 2>/dev/null || true
fi

echo "==> Seeding database (safe to re-run)..."
npm run seed

if ! command -v pm2 >/dev/null 2>&1; then
  echo "==> Installing PM2..."
  sudo npm install -g pm2
fi

echo "==> Starting app with PM2..."
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup | tail -n 1 | bash || true

if [ -n "$DOMAIN" ] && command -v nginx >/dev/null 2>&1; then
  NGINX_CONF="/etc/nginx/sites-available/$APP_NAME"
  if [ ! -f "$NGINX_CONF" ]; then
    echo "==> Installing Nginx config for $DOMAIN"
    sudo sed "s/YOUR_DOMAIN/$DOMAIN/g" deploy/nginx.nebco.conf | sudo tee "$NGINX_CONF" >/dev/null
    sudo ln -sf "$NGINX_CONF" "/etc/nginx/sites-enabled/$APP_NAME"
    sudo nginx -t && sudo systemctl reload nginx
    echo "Run SSL next: sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
  fi
fi

if [ -x "scripts/verify-production.sh" ]; then
  echo "==> Verifying production setup..."
  bash scripts/verify-production.sh || true
fi

echo ""
echo "Setup complete."
echo "  Site:  ${NEXT_PUBLIC_SITE_URL:-http://127.0.0.1:3000}"
echo "  Admin: ${NEXT_PUBLIC_SITE_URL:-http://127.0.0.1:3000}/admin/login"
echo "  Verify: bash scripts/verify-production.sh"
echo "  Logs:  pm2 logs $APP_NAME"
