#!/usr/bin/env bash
set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$APP_DIR"

if [ -f ".env.local" ]; then
  set -a
  # shellcheck disable=SC1091
  source .env.local
  set +a
fi

PORT="${PORT:-3010}"
HOSTNAME="${HOSTNAME:-0.0.0.0}"

exec node node_modules/next/dist/bin/next start -H "$HOSTNAME" -p "$PORT"
