#!/usr/bin/env bash
# One-time provisioning of the dedicated portfolio Lightsail instance. Safe to re-run.
# Touches only: /var/www/portfolio, the nginx site for $DOMAIN, the PM2 app "portfolio", /swapfile.
set -euo pipefail

DOMAIN=avazoff.zonic.fit
APP_DIR=/var/www/portfolio
REPO=https://github.com/Avazov03/my.portfolio.git
EMAIL=avazovogabek86@gmail.com
SITE=/etc/nginx/sites-available/$DOMAIN

step() { printf '\n==> %s\n' "$*"; }

step "Guard: this instance must not host other nginx sites"
if [ -d /etc/nginx/sites-enabled ]; then
  others=$(ls /etc/nginx/sites-enabled | grep -v -x -e default -e "$DOMAIN" || true)
  if [ -n "$others" ]; then
    echo "Other sites are enabled here: $others"
    echo "Aborting so nothing else is affected."
    exit 1
  fi
fi

step "Swap (builds need it on small instances)"
if [ "$(free -m | awk '/^Mem:/{print $2}')" -lt 2000 ] && ! swapon --show | grep -q /swapfile; then
  sudo fallocate -l 2G /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  grep -q '^/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
fi

step "System packages"
sudo apt-get update -y
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y nginx git curl certbot python3-certbot-nginx

step "Node.js 22 + PM2"
if ! node -v 2>/dev/null | grep -q '^v22\.'; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs
fi
command -v pm2 >/dev/null || sudo npm install -g pm2

step "App checkout and build"
sudo mkdir -p "$APP_DIR"
sudo chown "$USER":"$USER" "$APP_DIR"
if [ ! -d "$APP_DIR/.git" ]; then
  git clone "$REPO" "$APP_DIR"
else
  git -C "$APP_DIR" pull --ff-only
fi
cd "$APP_DIR"
npm ci
npm run build

step "PM2 process"
if pm2 describe portfolio >/dev/null 2>&1; then
  pm2 reload deploy/ecosystem.config.cjs --update-env
else
  pm2 start deploy/ecosystem.config.cjs
fi
pm2 save
sudo env PATH="$PATH" pm2 startup systemd -u "$USER" --hp "$HOME" >/dev/null

step "Nginx site"
sudo cp deploy/nginx/$DOMAIN.conf "$SITE"
sudo ln -sf "$SITE" /etc/nginx/sites-enabled/$DOMAIN
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

step "HTTPS (only when DNS already points here)"
public_ip=$(curl -fsS https://checkip.amazonaws.com || true)
dns_ip=$(getent ahostsv4 "$DOMAIN" | awk 'NR==1{print $1}' || true)
if [ -n "$dns_ip" ] && [ "$dns_ip" = "$public_ip" ]; then
  sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$EMAIL" --redirect
else
  echo "DNS for $DOMAIN is '$dns_ip', server is '$public_ip' — skipping certbot, re-run later."
fi

step "Health"
curl -fsS -o /dev/null -w 'local app: %{http_code}\n' http://127.0.0.1:3210/uz
