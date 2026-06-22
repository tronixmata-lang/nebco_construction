# Deploy NEBCO to a Linux VPS

This guide deploys the Next.js app with **Node.js**, **PM2**, **MongoDB**, and **Nginx** on Ubuntu/Debian.

## Requirements

| Item | Notes |
|------|-------|
| Linux VPS | Ubuntu 22.04+ or Debian 12+ recommended |
| Domain | Point DNS A record to your VPS IP |
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
```

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

## 5. Nginx reverse proxy

Edit `deploy/nginx.nebco.conf` — replace `YOUR_DOMAIN` with your domain, then:

```bash
sudo cp deploy/nginx.nebco.conf /etc/nginx/sites-available/nebco
sudo sed -i 's/YOUR_DOMAIN/nebco.com.np/g' /etc/nginx/sites-available/nebco
sudo ln -s /etc/nginx/sites-available/nebco /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 6. HTTPS (required for admin login)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d nebco.com.np -d www.nebco.com.np
```

Admin cookies use `secure: true` in production, so HTTPS is required for `/admin/login`.

## 7. Firewall

```bash
sudo ufw allow OpenSSH
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
- [ ] `npm run build` succeeds
- [ ] `npm run seed` run once
- [ ] PM2 running (`pm2 status`)
- [ ] Nginx proxying to port 3000
- [ ] SSL certificate installed
- [ ] Admin login works at `https://yourdomain.com/admin/login`
