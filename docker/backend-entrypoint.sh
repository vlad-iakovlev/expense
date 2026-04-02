#!/bin/sh
set -e

echo "Applying database migrations..."
npm run prisma -- migrate deploy

echo "Starting backend..."
exec npm run start:server
