# Get Inside Colombia - Netlify Deployment Guide

## 🚀 Quick Deployment Steps

### 1. **Prepare Repository**
- ✅ Push all changes to your Git repository
- ✅ Ensure all files are committed

### 2. **Netlify Setup**
1. Go to [Netlify](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your Git provider (GitHub, GitLab, etc.)
4. Select your `get-inside-colombia` repository

### 3. **Build Settings**
Netlify should auto-detect these settings, but verify:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: `18` (set in netlify.toml)

### 4. **Site Configuration**
- **Site name**: Choose a custom name like `get-inside-colombia`
- **Domain**: Will be `https://get-inside-colombia.netlify.app`
- **Custom domain**: Add your own domain later if needed

### 5. **Environment Variables** (Optional)
Currently no environment variables are required, but you can add them later in:
- Netlify Dashboard → Site Settings → Environment Variables

## 📁 **Files Created for Deployment**

### `netlify.toml`
- Build configuration
- Redirect rules for SPA routing
- Performance headers
- API route handling

### `public/_redirects`
- Backup redirect rules
- Ensures proper routing for tours, blog, and API

### Updated `astro.config.mjs`
- Changed output to "server" for API support
- Updated site URL for Netlify
- Netlify adapter configured

### Updated `package.json`
- Project name: `get-inside-colombia`
- Version: `1.0.0`
- Added description and additional scripts

## 🔧 **Technical Configuration**

### **Output Mode**: Server
- Supports API routes (`/api/*`)
- Server-side rendering for dynamic content
- Netlify Functions integration

### **Routing**
- `/tours/*` → Tour listing pages
- `/tour/*` → Individual tour pages
- `/blog/*` → Blog pages
- `/api/*` → API endpoints

### **Performance Optimizations**
- Static asset caching (1 year)
- Image optimization
- CSS/JS minification
- Security headers

## 🌐 **Post-Deployment Steps**

### 1. **Update Site URL**
After deployment, update the site URL in `astro.config.mjs`:
```js
site: "https://your-actual-netlify-url.netlify.app"
```

### 2. **Test Functionality**
- ✅ Homepage loads correctly
- ✅ Search form works
- ✅ Tours listing page functions
- ✅ Individual tour pages load
- ✅ API endpoints respond
- ✅ Blog pages work
- ✅ Contact forms (if any)

### 3. **Custom Domain** (Optional)
- Add your custom domain in Netlify settings
- Update DNS records
- SSL certificate will be auto-generated

### 4. **Analytics** (Optional)
- Add Google Analytics
- Set up Netlify Analytics
- Configure performance monitoring

## 🚨 **Troubleshooting**

### **Build Fails**
- Check Node.js version (should be 18+)
- Verify all dependencies are installed
- Check for TypeScript errors

### **API Routes Don't Work**
- Ensure output is set to "server" in astro.config.mjs
- Check netlify.toml redirect rules
- Verify Netlify Functions are enabled

### **Images Don't Load**
- Check image paths are correct
- Ensure images are in `src/assets/` or `public/`
- Verify Astro Image component usage

### **Routing Issues**
- Check _redirects file
- Verify netlify.toml redirects
- Test SPA routing

## 📞 **Support**

If you encounter issues:
1. Check Netlify build logs
2. Review browser console for errors
3. Test locally with `npm run build && npm run preview`
4. Check Netlify documentation

## 🎉 **Success!**

Once deployed, your Colombia tourism website will be live at:
`https://get-inside-colombia.netlify.app`

The site will automatically rebuild when you push changes to your repository!
