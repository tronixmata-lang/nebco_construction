# Deploy NEBCO to a Linux VPS

This guide deploys the Next.js app with **Node.js**, **PM2**, **MongoDB**, and optional **Nginx** on Ubuntu/Debian.

## Quick start: IP only (no domain) — recommended for now

Use your VPS public IP. If **3000 and 3001 are already in use**, use port **3010** (or another free port).

```bash
ssh root@YOUR_VPS_IP
cd /var/www/nebco
chmod +x scripts/*.sh
./scripts/setup-ip-hosting.sh YOUR_VPS_IP 3010
```

Then open:

- **Site:** `http://YOUR_VPS_IP:3010`
- **Admin:** `http://YOUR_VPS_IP:3010/admin/login`

`.env.local` on the server must include (example for IP `163.47.151.250` on port `3010`):

```env
NEXT_PUBLIC_SITE_URL=http://163.47.151.250:3010
NODE_ENV=production
PORT=3010
HOSTNAME=0.0.0.0
MONGODB_URI=mongodb://127.0.0.1:27017/nebco
JWT_SECRET=your-long-random-secret
ADMIN_EMAIL=admin@nebco.com.np
ADMIN_PASSWORD=your-strong-password
```

**Critical:** `NEXT_PUBLIC_SITE_URL` must match the exact URL you open (IP + port), e.g. `http://163.47.151.250:3010` — **before** `npm run build`.

Verify after setup:

```bash
npm run verify
```

---

## Requirements

| Item | Notes |
|------|-------|
| Linux VPS | Ubuntu 22.04+ or Debian 12+ recommended |
| Domain | Optional — use VPS IP + port 3000 without a domain |
| MongoDB | Local install or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) |
| Node.js 20+ | Required for Next.js 15 |

## 1. Prepare the server

SSH into your VPS:

```bash
ssh root@YOUR_VPS_IP
```

Install system packages:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl nginx ufw
```

Install Node.js 20:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Install MongoDB (local option):

```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
  sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
  sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

sudo apt update
sudo apt install -y mongodb-org
sudo systemctl enable mongod
sudo systemctl start mongod
```

Or use MongoDB Atlas and set `MONGODB_URI` to your Atlas connection string.

## 2. Clone the project

```bash
sudo mkdir -p /var/www
cd /var/www
sudo git clone https://github.com/tronixmata-lang/nebco_construction.git nebco
sudo chown -R $USER:$USER nebco
cd nebco
```

## 3. Configure environment

```bash
cp .env.example .env.local
nano .env.local
```

Production values to set:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/nebco
JWT_SECRET=generate-a-long-random-string
ADMIN_EMAIL=admin@nebco.com.np
ADMIN_PASSWORD=use-a-strong-password
NEXT_PUBLIC_SITE_URL=https://nebco.com.np
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
```

**Important:** `NEXT_PUBLIC_SITE_URL` is baked into the app at **build time**. Set it correctly in `.env.local` **before** `npm run build`. If you change the domain or port later, update `.env.local` and run `npm run build` again.

`PORT` must stay **3000** unless you also change `proxy_pass` in `deploy/nginx*.conf` to the same port.

Generate a JWT secret:

```bash
openssl rand -base64 48
```

SMTP settings are optional (contact form saves to DB without email).

## 4. First-time setup

```bash
chmod +x scripts/vps-setup.sh scripts/deploy.sh
./scripts/vps-setup.sh
```

Or run steps manually:

```bash
npm ci
npm run build
npm run seed
mkdir -p public/uploads
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

## 5. Access via IP or domain + port (simplest — no SSL)

Use this when your domain still points to Cloudflare or another host, or you want to skip Certbot for now.

### A. Direct port 3000 (recommended for quick testing)

On the VPS, set `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://YOUR_VPS_IP:3000
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
```

Restart the app and open the firewall:

```bash
pm2 restart nebco
sudo ufw allow 3000/tcp
sudo ufw reload
```

Visit:

- `http://YOUR_VPS_IP:3000`
- `http://nebco.com.np:3000` (only if DNS A record points to this VPS)

Admin login works over HTTP when `NEXT_PUBLIC_SITE_URL` starts with `http://`.

### B. Nginx on port 8080 (optional)

```bash
sudo cp deploy/nginx-port.conf /etc/nginx/sites-available/nebco-port
sudo sed -i 's/YOUR_VPS_IP/YOUR_ACTUAL_IP/g' /etc/nginx/sites-available/nebco-port
sudo ln -sf /etc/nginx/sites-available/nebco-port /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo ufw allow 8080/tcp
```

Then set `NEXT_PUBLIC_SITE_URL=http://YOUR_VPS_IP:8080` and visit that URL.

## 6. Nginx on port 80 (only when DNS points to this VPS)

Edit `deploy/nginx.nebco.conf` — replace `YOUR_DOMAIN` with your domain, then:

```bash
sudo cp deploy/nginx.nebco.conf /etc/nginx/sites-available/nebco
sudo sed -i 's/YOUR_DOMAIN/nebco.com.np/g' /etc/nginx/sites-available/nebco
sudo ln -s /etc/nginx/sites-available/nebco /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 7. HTTPS (only after DNS points to this VPS)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d nebco.com.np -d www.nebco.com.np
```

Then update `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://nebco.com.np
```

And restart: `pm2 restart nebco`

## 8. Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 3000/tcp
sudo ufw allow 8080/tcp
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## Updating after code changes

On the VPS:

```bash
cd /var/www/nebco
./scripts/deploy.sh
```

Or manually:

```bash
git pull origin main
npm ci
npm run build
pm2 restart nebco
```

## Useful commands

```bash
pm2 status              # App status
pm2 logs nebco          # View logs
pm2 restart nebco       # Restart app
npm run reset-admin     # Reset admin password from .env.local
npm run verify          # Check MongoDB, API, PM2, and Nginx alignment
```

## File locations

| Path | Purpose |
|------|---------|
| `.env.local` | Production secrets (not in git) |
| `public/uploads/` | Admin-uploaded images — back up this folder |
| `ecosystem.config.cjs` | PM2 process config |
| `deploy/nginx.nebco.conf` | Nginx template |

## Checklist

- [ ] Domain DNS points to VPS IP
- [ ] MongoDB running (local or Atlas)
- [ ] `.env.local` configured with production secrets
- [ ] `npm run build` succeeds (with production `NEXT_PUBLIC_SITE_URL` already set)
- [ ] `npm run seed` run once
- [ ] PM2 running (`pm2 status`)
- [ ] `npm run verify` passes on the server
- [ ] Nginx proxying to port 3000
- [ ] SSL certificate installed
- [ ] Admin login works at `https://yourdomain.com/admin/login`
