---
description: Automated GitHub Pages deployment workflow for all web projects
---

# GitHub Pages Deployment Workflow

## 🎯 Rule for LLM

**MANDATORY**: When deploying any web project to GitHub Pages, the LLM MUST use this automated approach and NEVER require manual intervention from the user. All GitHub configurations must be handled programmatically.

## 🚀 Automated Deployment Process

### 1. Project Setup Verification
- Verify project has build output (dist/, build/, etc.)
- Check Vite/Webpack/Next.js config has correct `base` path: `/<repo-name>/`
- Ensure package.json has build script

### 2. GitHub Pages Configuration
```bash
# Check current status
gh api repos/<owner>/<repo>/pages

# Configure for legacy deployment (if needed)
gh api -X PUT repos/<owner>/<repo>/pages -f source='{"branch":"main","path":"/"}'
```

### 3. Deployment Methods (Choose One)

#### Method A: GitHub Actions (Preferred)
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '18'
    - run: npm ci
    - run: npm run build
    - uses: actions/configure-pages@v4
    - uses: actions/upload-pages-artifact@v3
      with:
        path: ./dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    if: github.ref == 'refs/heads/main'
    steps:
    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v4
```

#### Method B: Legacy Root Deployment (Fallback)
```bash
# Build project
npm run build

# Copy built files to root
cp -r dist/* .  # or build/*, out/*, etc.

# Update .gitignore to allow built files in root
echo "!/assets/" >> .gitignore
echo "!/index.html" >> .gitignore

# Commit and push
git add assets/ index.html .gitignore
git commit -m "Deploy built files to root for GitHub Pages"
git push origin main
```

### 4. Verification
```bash
# Check deployment status
gh api repos/<owner>/<repo>/pages

# Test live site
curl -I https://<owner>.github.io/<repo>/
curl -I https://<owner>.github.io/<repo>/assets/main.js

# Set homepage URL
gh repo edit <owner>/<repo> --homepage https://<owner>.github.io/<repo>/
```

## 🔧 Common Configurations

### Vite Configuration
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  base: '/<repo-name>/',
})
```

### Next.js Configuration
```javascript
// next.config.js
module.exports = {
  basePath: '/<repo-name>',
  assetPrefix: '/<repo-name>',
  output: 'export',
  images: {
    unoptimized: true
  }
}
```

### React App Configuration
```json
// package.json
"homepage": "https://<owner>.github.io/<repo>/"
```

## 📋 Deployment Checklist

- [ ] Build project successfully
- [ ] Configure correct base path in build tool
- [ ] Choose deployment method (Actions preferred)
- [ ] Deploy files to GitHub
- [ ] Verify GitHub Pages status
- [ ] Test live site functionality
- [ ] Set repository homepage URL
- [ ] Update task tracking

## 🚨 Troubleshooting

### Issue: Empty page or 404 errors
**Solution**: Use legacy root deployment method, GitHub Pages may not be configured for GitHub Actions

### Issue: Assets not loading
**Solution**: Verify base path configuration matches repository name exactly

### Issue: CORS errors
**Solution**: Ensure all asset paths use the correct base path prefix

## 📚 Required Tools

- **GitHub CLI** (`gh`) - For API interactions
- **Git** - For version control
- **Node.js/npm** - For build processes
- **curl** - For verification testing

## 🔄 Git Integration

All deployment steps must be committed to git with descriptive messages:
```bash
git commit -m "Deploy to GitHub Pages: <description>"
git push origin main
```

## 📖 Examples

### React/Vite Project
```bash
# 1. Build
npm run build

# 2. Deploy to root
cp -r dist/* .
git add assets/ index.html
git commit -m "Deploy React app to GitHub Pages"
git push origin main

# 3. Configure
gh repo edit owner/repo --homepage https://owner.github.io/repo/
```

### Static Site
```bash
# 1. Use GitHub Actions workflow
# 2. Push workflow file
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Pages deployment workflow"
git push origin main
```

---

**Remember**: The LLM must handle ALL GitHub Pages deployment steps programmatically without requiring manual user intervention in GitHub UI.
