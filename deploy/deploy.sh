#!/usr/bin/env bash
# Routine deploy of origin/main on the portfolio instance (run on the server).
set -euo pipefail

cd /var/www/portfolio
git pull --ff-only
npm ci
npm run build
pm2 reload deploy/ecosystem.config.cjs --update-env
pm2 save
curl -fsS -o /dev/null -w 'local app: %{http_code}\n' http://127.0.0.1:3210/uz
