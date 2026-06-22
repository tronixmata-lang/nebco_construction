#!/usr/bin/env bash
set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$APP_DIR"

PORT="${PORT:-3010}"
HOSTNAME="${HOSTNAME:-0.0.0.0}"

export DOTENV_CONFIG_PATH="${DOTENV_CONFIG_PATH:-.env.local}"
export NODE_ENV="${NODE_ENV:-production}"

exec node -r dotenv/config node_modules/next/dist/bin/next start -H "$HOSTNAME" -p "$PORT"
