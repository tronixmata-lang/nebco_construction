#!/usr/bin/env bash
set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$APP_DIR"

ENV_FILE="${DOTENV_CONFIG_PATH:-.env.local}"
export DOTENV_CONFIG_PATH="$ENV_FILE"

# Load .env.local so runtime secrets match the server (not only PM2-injected vars).
if [ -f "$ENV_FILE" ]; then
  sed -i 's/\r$//' "$ENV_FILE" 2>/dev/null || true
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
fi

PORT="${PORT:-3000}"
HOSTNAME="${HOSTNAME:-0.0.0.0}"
export NODE_ENV="${NODE_ENV:-production}"

exec node -r dotenv/config node_modules/next/dist/bin/next start -H "$HOSTNAME" -p "$PORT"
