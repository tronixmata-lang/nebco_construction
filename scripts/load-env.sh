#!/usr/bin/env bash
# Sources .env.local for deploy/build scripts. Strips Windows CRLF if present.
set -euo pipefail

ENV_FILE="${1:-.env.local}"

if [ ! -f "$ENV_FILE" ]; then
  echo "ERROR: $ENV_FILE not found. Copy .env.example to .env.local and set production values."
  exit 1
fi

sed -i 's/\r$//' "$ENV_FILE" 2>/dev/null || true
set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

missing=0
for key in MONGODB_URI JWT_SECRET NEXT_PUBLIC_SITE_URL; do
  if [ -z "${!key:-}" ]; then
    echo "ERROR: $key is not set in $ENV_FILE"
    missing=1
  fi
done

if [ -z "${PORT:-}" ]; then
  export PORT=3000
fi

if [ -z "${HOSTNAME:-}" ]; then
  export HOSTNAME=0.0.0.0
fi

[ "$missing" -eq 0 ] || exit 1
