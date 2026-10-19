#!/usr/bin/env bash
# Routine deploy of origin/main on the shared server (run on the server).
set -euo pipefail

cd /var/www/portfolio
git pull --ff-only
npm ci
NODE_OPTIONS=--max-old-space-size=1024 nice -n 10 npm run build
pm2 reload deploy/ecosystem.config.cjs --update-env
pm2 save
sleep 2
curl -fsS -o /dev/null -w 'app on :3210 -> %{http_code}\n' http://127.0.0.1:3210/uz
