#!/usr/bin/env bash
set -euo pipefail

transform_file_var() {
  local variables
  variables=$(echo "$@" | tr " " "\n")
  for variable in $variables; do
    if [ -v "${variable}"_FILE ] ; then
      file_variable=${variable}_FILE
      if [ ! -f "${!file_variable}" ] ; then
        echo "[transform_file_var] ${variable}_FILE set, but file doesn't exist" >&2
        return 1
      fi
      export "${variable}"="$(cat "${!file_variable}")"
    fi
  done
}

transform_file_var DATABASE_URL

echo "Applying database migrations..."
npm run prisma -- migrate deploy
echo "Database migrations applied."
