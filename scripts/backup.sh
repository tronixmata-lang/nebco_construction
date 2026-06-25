#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKUP_DIR="${BACKUP_DIR:-$ROOT_DIR/backups}"
STAMP="$(date +%Y%m%d-%H%M%S)"
TARGET="$BACKUP_DIR/nebco-$STAMP"

mkdir -p "$TARGET"

if [ -f "$ROOT_DIR/.env.local" ]; then
  # shellcheck disable=SC1091
  set -a
  source "$ROOT_DIR/.env.local"
  set +a
fi

MONGODB_URI="${MONGODB_URI:-mongodb://127.0.0.1:27017/nebco}"

echo "Backing up MongoDB to $TARGET/database"
mongodump --uri="$MONGODB_URI" --out="$TARGET/database"

if [ -d "$ROOT_DIR/uploads" ]; then
  echo "Backing up uploads/ to $TARGET/uploads"
  cp -a "$ROOT_DIR/uploads" "$TARGET/uploads"
elif [ -d "$ROOT_DIR/public/uploads" ]; then
  echo "Backing up legacy public/uploads/ to $TARGET/uploads"
  cp -a "$ROOT_DIR/public/uploads" "$TARGET/uploads"
else
  echo "No uploads directory found — skipping file backup"
fi

ARCHIVE="$BACKUP_DIR/nebco-$STAMP.tar.gz"
tar -czf "$ARCHIVE" -C "$BACKUP_DIR" "nebco-$STAMP"
rm -rf "$TARGET"

echo "Backup complete: $ARCHIVE"
