# GitHub Pages Multi-Branch Deployment Setup

This repository is configured to deploy multiple branches to different paths on GitHub Pages.

## 🌐 Deployment Overview

### Main Branch Deployment
- **Branch**: `main`
- **URL**: https://web3web4.com/
- **Workflow**: `.github/workflows/deploy.yml`
- **Triggers**: On every push to `main`

### Feature Branch Deployments
- **Branches**: `feat/*`, `feature/*`, `dev/*`, `preview/*`
- **URL Pattern**: https://web3web4.com/`<sanitized-branch-name>`/
- **Workflow**: `.github/workflows/deploy-feature-branch.yml`
- **Triggers**: On every push to matching branch patterns

## 📋 How It Works

### Branch Name Sanitization
Branch names are automatically sanitized for URL compatibility:
- Forward slashes (`/`) → hyphens (`-`)
- Colons (`:`) → hyphens (`-`)
- Uppercase → lowercase

**Examples:**
- `feat/use-double-coloring-cyan-purple` → `feat-use-double-coloring-cyan-purple`
- `feature/NEW-DESIGN` → `feature-new-design`
- `dev/api:v2` → `dev-api-v2`

### PUBLIC_URL Configuration
Each deployment automatically sets the correct `PUBLIC_URL` during build:
- **Main branch**: `PUBLIC_URL=/`
- **Feature branches**: `PUBLIC_URL=/<sanitized-branch-name>`

This ensures all asset paths (CSS, JS, images) work correctly in subdirectories.

## 🚀 Using Feature Branch Deployments

### Step 1: Push Your Branch
```bash
git push origin feat/your-feature-name
```

### Step 2: Monitor Deployment
1. Go to the **Actions** tab in GitHub
2. Find the "Deploy Feature Branch to GitHub Pages" workflow
3. Watch the deployment progress

### Step 3: Access Your Preview
Once deployed, your branch will be available at:
```
https://web3web4.com/<sanitized-branch-name>/
```

For example, `feat/use-double-coloring-cyan-purple` will deploy to:
```
https://web3web4.com/feat-use-double-coloring-cyan-purple/
```

## 🔧 Current Feature Branch

Your current branch **`feat/use-double-coloring-cyan-purple`** will deploy to:
```
https://web3web4.com/feat-use-double-coloring-cyan-purple/
```

## 📝 Adding More Branch Patterns

To add more branch patterns for automatic deployment, edit `.github/workflows/deploy-feature-branch.yml`:

```yaml
on:
  push:
    branches:
      - 'feat/**'
      - 'feature/**'
      - 'dev/**'
      - 'preview/**'
      - 'your-pattern/**'  # Add your pattern here
```

## 🗑️ Cleaning Up Old Deployments

Feature branch deployments remain on GitHub Pages even after branches are deleted. To remove them:

### Option 1: Manual Cleanup
1. Clone the `gh-pages` branch:
   ```bash
   git clone --branch gh-pages https://github.com/web3web4/web3web4.com.git gh-pages-cleanup
   cd gh-pages-cleanup
   ```

2. Remove the unwanted directory:
   ```bash
   rm -rf feat-old-branch-name
   git add .
   git commit -m "Remove old deployment: feat-old-branch-name"
   git push
   ```

### Option 2: Automated Cleanup (Future Enhancement)
Consider adding a workflow that automatically removes deployments when branches are deleted.

## ⚙️ Technical Details

### File Persistence
The feature branch workflow uses `keep_files: true` to ensure:
- Multiple branch deployments coexist
- Main branch deployment isn't affected
- Feature branch deployments don't overwrite each other

### Environment Variables
Both workflows use the same environment variables from GitHub repository settings:
- `CONTACT_EMAIL`
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EMAILJS_PUBLIC_KEY`

These are automatically injected during build.

## 🛠️ Troubleshooting

### Assets Not Loading (404 errors)
- **Cause**: `PUBLIC_URL` mismatch
- **Solution**: The workflow automatically handles this, but verify the build logs show the correct `PUBLIC_URL`

### Deployment Not Triggering
- **Cause**: Branch name doesn't match patterns
- **Solution**: Check branch name matches one of the patterns in the workflow

### Old Content Still Visible
- **Cause**: Browser caching or GitHub Pages CDN delay
- **Solution**: Wait a few minutes, then hard refresh (Cmd+Shift+R / Ctrl+Shift+R)

## 📊 Monitoring Deployments

View all active deployments:
1. Visit the `gh-pages` branch on GitHub
2. Each subdirectory represents a feature branch deployment
3. Root files are from the `main` branch

## 🎯 Best Practices

1. **Use descriptive branch names** - They become part of your preview URL
2. **Clean up old branches** - Remove merged feature branches to reduce clutter
3. **Test on preview URLs** - Always verify changes on the feature branch URL before merging to main
4. **Monitor build logs** - Check the Actions tab for any build or deployment errors

---

**Note**: The first deployment may take 5-10 minutes to appear on GitHub Pages. Subsequent deployments are usually faster (1-3 minutes).
