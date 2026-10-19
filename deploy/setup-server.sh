#!/usr/bin/env bash
# Adds the portfolio to a shared server without touching the other sites on it. Safe to re-run.
# Touches only: /var/www/portfolio, the nginx site file for $DOMAIN, the PM2 app "portfolio".
# Installs nothing and removes nothing; node, pm2, nginx and certbot must already be present.
set -euo pipefail

DOMAIN=avazoff.zonic.fit
APP_DIR=/var/www/portfolio
REPO=https://github.com/Avazov03/my.portfolio.git
EMAIL=avazovogabek86@gmail.com
PORT=3210
SITE=/etc/nginx/sites-available/$DOMAIN

step() { printf '\n==> %s\n' "$*"; }

step "Preflight"
for t in node npm pm2 nginx certbot git; do
  command -v "$t" >/dev/null || { echo "missing: $t"; exit 1; }
done
node -e 'const [a,b]=process.versions.node.split(".").map(Number);process.exit(a>20||(a===20&&b>=9)?0:1)' \
  || { echo "Node >= 20.9 is required"; exit 1; }
if ss -tln | awk '{print $4}' | grep -q ":$PORT\$" && ! pm2 describe portfolio >/dev/null 2>&1; then
  echo "Port $PORT is used by another process"; exit 1
fi
sudo nginx -t

step "Checkout"
sudo mkdir -p "$APP_DIR"
sudo chown "$USER":"$USER" "$APP_DIR"
if [ ! -d "$APP_DIR/.git" ]; then
  git clone "$REPO" "$APP_DIR"
else
  git -C "$APP_DIR" pull --ff-only
fi
cd "$APP_DIR"

step "Build (low priority so the other apps keep their CPU)"
npm ci
NODE_OPTIONS=--max-old-space-size=1024 nice -n 10 npm run build

step "PM2"
if pm2 describe portfolio >/dev/null 2>&1; then
  pm2 reload deploy/ecosystem.config.cjs --update-env
else
  pm2 start deploy/ecosystem.config.cjs
fi
pm2 save

step "Nginx site (added only if absent, so certbot's edits survive re-runs)"
[ -f "$SITE" ] || sudo cp "deploy/nginx/$DOMAIN.conf" "$SITE"
sudo ln -sf "$SITE" "/etc/nginx/sites-enabled/$DOMAIN"
if ! sudo nginx -t; then
  sudo rm -f "/etc/nginx/sites-enabled/$DOMAIN"
  echo "nginx test failed; the portfolio site was disabled again, other sites untouched"
  exit 1
fi
sudo systemctl reload nginx

step "HTTPS (only when DNS already points here)"
public_ip=$(curl -fsS https://checkip.amazonaws.com || true)
dns_ip=$(getent ahostsv4 "$DOMAIN" | awk 'NR==1{print $1}' || true)
if [ -n "$dns_ip" ] && [ "$dns_ip" = "$public_ip" ]; then
  sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$EMAIL" --redirect
else
  echo "DNS for $DOMAIN is '$dns_ip', this server is '$public_ip'; certbot skipped, re-run after the DNS change."
fi

step "Health"
sleep 2
curl -fsS -o /dev/null -w 'app on :3210 -> %{http_code}\n' "http://127.0.0.1:$PORT/uz"
curl -sS -o /dev/null -w 'nginx Host routing -> %{http_code}\n' -H "Host: $DOMAIN" http://127.0.0.1/uz
