# 🚀 Deployment Guide

## Step 1: Create GitHub Repository

1. **Go to GitHub:**
   - Visit [github.com/new](https://github.com/new)

2. **Create Repository:**
   - Repository name: `emmanuel-skin`
   - Description: "Free pore-clogging ingredients checker"
   - Visibility: Public (or Private)
   - **DO NOT** initialize with README (we already have one)
   - Click "Create repository"

3. **Copy the repository URL:**
   - You'll see something like: `https://github.com/yourusername/emmanuel-skin.git`

## Step 2: Push to GitHub

Open your terminal/command prompt in the project folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Emmanuel Skin Checker"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/emmanuel-skin.git

# Push to GitHub
git push -u origin main
```

**If you get an error about "master" vs "main":**
```bash
git branch -M main
git push -u origin main
```

**If GitHub asks for credentials:**
- Use a [Personal Access Token](https://github.com/settings/tokens) instead of password
- Or set up [SSH keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

## Step 3: Deploy to Cloudflare Pages

### Method 1: Via Dashboard (Easiest)

1. **Go to Cloudflare:**
   - Login at [dash.cloudflare.com](https://dash.cloudflare.com)

2. **Create Pages Project:**
   - Workers & Pages → Create application → Pages
   - Connect to Git → Select GitHub
   - Authorize Cloudflare to access your repositories

3. **Select Repository:**
   - Choose `emmanuel-skin`
   - Click "Begin setup"

4. **Configure Build:**
   - Project name: `emmanuel-skin`
   - Production branch: `main`
   - Build command: (leave empty)
   - Build output directory: `/`
   - Click "Save and Deploy"

5. **Done!**
   - Your site will be live at: `https://emmanuel-skin.pages.dev`
   - Add custom domain (emmanuel.skin) in Settings

### Method 2: Via Wrangler CLI

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages publish . --project-name=emmanuel-skin
```

## Step 4: Add Custom Domain (emmanuel.skin)

1. **In Cloudflare Pages:**
   - Go to your project → Custom domains
   - Click "Set up a custom domain"
   - Enter: `emmanuel.skin`
   - Follow the DNS instructions

2. **If domain is NOT on Cloudflare:**
   - Add these DNS records at your registrar:
   ```
   Type: CNAME
   Name: emmanuel.skin
   Value: emmanuel-skin.pages.dev
   
   Type: CNAME
   Name: www
   Value: emmanuel-skin.pages.dev
   ```

3. **If domain IS on Cloudflare:**
   - It will configure automatically!

## Alternative: Deploy to Netlify

### Via Drag & Drop (Super Easy!)

1. **Build nothing** - your site is already ready!
2. Go to [netlify.com](https://netlify.com)
3. Drag the entire `emmanuel-skin` folder to the deploy area
4. Done! Your site is live

### Via Git

1. **Go to Netlify:**
   - [app.netlify.com/start](https://app.netlify.com/start)

2. **Connect GitHub:**
   - Click "GitHub"
   - Select your repository

3. **Configure:**
   - Build command: (leave empty)
   - Publish directory: `/`
   - Click "Deploy site"

4. **Custom Domain:**
   - Site settings → Domain management
   - Add custom domain → emmanuel.skin
   - Follow DNS instructions

## Alternative: Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: emmanuel-skin
# - Directory: ./
# - Build command: (press enter)
# - Output directory: (press enter)

# Deploy to production
vercel --prod
```

## Alternative: Deploy to GitHub Pages

1. **Push to GitHub** (already done above)

2. **Enable GitHub Pages:**
   - Go to repository settings
   - Pages (in left sidebar)
   - Source: Deploy from a branch
   - Branch: `main` → `/` (root)
   - Click "Save"

3. **Wait 1-2 minutes**
   - Your site will be at: `https://yourusername.github.io/emmanuel-skin`

4. **Custom domain (optional):**
   - Add a file named `CNAME` with content: `emmanuel.skin`
   - Add CNAME record in your DNS pointing to: `yourusername.github.io`

## Updating Your Site

After making changes:

```bash
# Add changes
git add .

# Commit
git commit -m "Update ingredients database"

# Push
git push

# Cloudflare/Netlify/Vercel will auto-deploy!
```

## Troubleshooting

### "Permission denied" when pushing

**Solution:** Set up SSH or use Personal Access Token
```bash
# Use token
git remote set-url origin https://TOKEN@github.com/username/emmanuel-skin.git
```

### Files not showing up

**Check .gitignore** - make sure you didn't accidentally ignore important files

### Site not updating

- Check deployment logs in your hosting dashboard
- Clear browser cache (Ctrl+Shift+R)
- Wait a few minutes for CDN to update

### Custom domain not working

- DNS changes take 24-48 hours to fully propagate
- Use [dnschecker.org](https://dnschecker.org) to verify DNS records
- Make sure HTTPS is enabled in hosting settings

## Need Help?

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Netlify Docs](https://docs.netlify.com/)
- [Vercel Docs](https://vercel.com/docs)
- [GitHub Pages Docs](https://pages.github.com/)

---

**Congratulations! Your site is now live! 🎉**
