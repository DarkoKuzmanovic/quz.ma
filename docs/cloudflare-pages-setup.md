# Cloudflare Pages Setup Guide

## Prerequisites

- GitHub repo `quz.ma` pushed and public
- Cloudflare account with `quz.ma` domain managed (DNS on Cloudflare)

## Step 1: Create the Pages Project

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your account
3. Sidebar → **Workers & Pages**
4. Click **Create** → **Pages** → **Connect to Git**
5. Authorize GitHub if prompted
6. Select the `quz.ma` repository

## Step 2: Configure Build Settings

| Setting | Value |
|---------|-------|
| Production branch | `main` |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | 20 (or latest LTS) |

If the Node version isn't right by default, add an environment variable:

| Variable | Value |
|----------|-------|
| `NODE_VERSION` | `20` |

Click **Save and Deploy**.

## Step 3: Wait for First Deploy

Cloudflare will clone the repo, install dependencies, run `npm run build`, and deploy the `dist/` output. This takes 1-2 minutes.

Once complete, your site is live at `https://quz-ma.pages.dev` (or similar auto-generated subdomain).

## Step 4: Add Custom Domain

1. Go to your Pages project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter `quz.ma`
4. Cloudflare will automatically add the required DNS records (since the domain is already on Cloudflare DNS)
5. SSL certificate is provisioned automatically — takes a few minutes

Optionally also add `www.quz.ma` and set up a redirect rule to strip the `www`.

## Step 5: Verify

- Visit `https://quz.ma` — should show your site
- Check `https://quz.ma/rss.xml` — should return the RSS feed
- Check `https://quz.ma/sitemap-index.xml` — should return the sitemap

## Auto-Deploy

Every push to `main` triggers a new build and deploy automatically. No manual steps needed after this initial setup.

## Troubleshooting

**Build fails with Node version error:**
Add `NODE_VERSION=20` in Settings → Environment variables.

**Custom domain shows SSL error:**
Wait 5-10 minutes for the certificate to provision. If it persists, check that DNS is proxied (orange cloud icon) in the Cloudflare DNS settings.

**Pages shows old content after push:**
Check the deployment log in Workers & Pages → your project → Deployments. A new deployment should appear within a minute of pushing.
