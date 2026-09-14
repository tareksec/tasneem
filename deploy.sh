#!/usr/bin/env bash
set -e

echo "=========================================================="
echo "   Tasneem Knit Industry - Hostinger Deployment Script    "
echo "=========================================================="

# 1. Disable corepack so it does not intercept npm
echo "--> Disabling Corepack..."
corepack disable 2>/dev/null || true

# 2. Clean old corepack cache if present
rm -rf ~/.cache/node/corepack 2>/dev/null || true

# 3. Check environment
echo "--> Node version: $(node -v)"
echo "--> NPM version: $(npm -v)"
echo "--> Directory: $(pwd)"

# 4. Pull latest code from GitHub
echo "--> Pulling latest code from GitHub (main)..."
git pull origin main || {
  echo "--> Running git fetch & reset to latest main..."
  git fetch origin main
  git reset --hard origin/main
}

# 5. Install dependencies cleanly
echo "--> Installing dependencies with npm..."
npm install

# 6. Prisma Database Setup
echo "--> Generating Prisma Client..."
npx prisma generate

# If DATABASE_URL is set in environment, sync schema
if [ -n "$DATABASE_URL" ]; then
  echo "--> Syncing schema with Hostinger MySQL (prisma db push)..."
  npx prisma db push --skip-generate || echo "--> Note: DB push failed or skipped. Run manually if needed."
else
  echo "--> Notice: DATABASE_URL not detected in shell environment. Remember to set it in Hostinger hPanel."
fi

# 7. Build Next.js application
echo "--> Building production application (npm run build)..."
npm run build

# 7. Check PM2 status
echo "--> Checking PM2 process..."
if command -v pm2 &> /dev/null; then
  pm2 restart tasneem 2>/dev/null || pm2 start server.js --name "tasneem"
  pm2 save
  echo "--> PM2 process 'tasneem' is running!"
elif npx --yes pm2 -v &> /dev/null; then
  npx pm2 restart tasneem 2>/dev/null || npx pm2 start server.js --name "tasneem"
  npx pm2 save
  echo "--> PM2 process 'tasneem' is running via npx!"
else
  echo "--> Node.js build complete. If using Hostinger hPanel Node.js, click 'Restart Application' in your control panel."
fi

echo "=========================================================="
echo "   Deployment Complete! Tasneem Knit Industry is Live!   "
echo "=========================================================="
