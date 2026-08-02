#!/usr/bin/env bash
set -euo pipefail

# Source: https://github.com/tiredofit/docker-alpine/blob/06ce99a4f2ddde26a0185c5782d78a057f16bd35/install/assets/functions/00-container#L1446-L1465
transform_file_var() {
  local variables
  variables=$(echo "$@" | tr " " "\n")
  for variable in $variables; do
    if [ -v "${variable}"_FILE ] ; then
      file_variable=${variable}_FILE
      if [ ! -f "${!file_variable}" ] ; then
        print_error "[transform_file_var] ${variable}_FILE set as environment variable, however file doesn't exist"
        return 1
      fi
      export "${variable}"="$(cat "${!file_variable}")"
    fi
  done
  unset file_variable
  unset variables
}

transform_file_var \
  DATABASE_URL \
  CRON_SECRET \
  BETTER_AUTH_URL \
  BETTER_AUTH_SECRET \
  GOOGLE_CLIENT_ID \
  GOOGLE_CLIENT_SECRET \
  EXCHANGE_RATES_API_KEY

echo "Applying database migrations..."
npm run prisma -- migrate deploy

echo "Starting backend..."
exec npm run start:server
