# 🚀 Vercel Deployment Guide

## Quick Deploy (5 minutes)

### Option 1: Deploy with Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? **Your account**
   - Link to existing project? **N**
   - Project name: **mim-al-rock-twist** (or your preferred name)
   - Directory: **./** (current directory)
   - Override settings? **N**

### Option 2: Deploy with GitHub (Automatic)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite project

## 🔧 Environment Variables Setup

### 1. **Get EmailJS Credentials**
Follow the guide in `EMAILJS_SETUP.md` to get your credentials.

### 2. **Add Environment Variables in Vercel**

1. Go to your project dashboard on Vercel
2. Click **Settings** → **Environment Variables**
3. Add these variables:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_EMAILJS_SERVICE_ID` | `your_service_id` | Production, Preview, Development |
| `VITE_EMAILJS_TEMPLATE_ID` | `your_template_id` | Production, Preview, Development |
| `VITE_EMAILJS_PUBLIC_KEY` | `your_public_key` | Production, Preview, Development |
| `VITE_SITE_URL` | `https://your-domain.vercel.app` | Production, Preview, Development |

### 3. **Redeploy After Adding Variables**
```bash
vercel --prod
```

## 📁 Project Structure for Vercel

```
mim-al-rock-twist/
├── vercel.json          # Vercel configuration
├── package.json         # Build scripts
├── vite.config.ts       # Vite configuration
├── env.example          # Environment variables template
├── src/
│   ├── lib/
│   │   └── emailjs.ts   # EmailJS configuration
│   └── ...
└── dist/                # Build output (auto-generated)
```

## ⚙️ Build Configuration

### Build Command
```bash
npm run vercel-build
```

### Output Directory
```
dist
```

### Install Command
```bash
npm install
```

## 🔍 Post-Deployment Checklist

- [ ] **Environment variables** are set in Vercel
- [ ] **EmailJS** is configured and working
- [ ] **Custom domain** is set up (optional)
- [ ] **Analytics** is enabled (optional)
- [ ] **Preview deployments** are working
- [ ] **Email capture** is tested

## 🌐 Custom Domain Setup

1. **In Vercel Dashboard:**
   - Go to **Settings** → **Domains**
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update Environment Variables:**
   - Update `VITE_SITE_URL` to your custom domain

## 📊 Performance Optimizations

The deployment includes:
- ✅ **Code splitting** for faster loading
- ✅ **Asset optimization** with proper caching
- ✅ **Gzip compression** (automatic)
- ✅ **CDN distribution** (automatic)
- ✅ **Image optimization** (automatic)

## 🔄 Continuous Deployment

Once connected to GitHub:
- **Push to `main`** → Deploys to production
- **Push to other branches** → Creates preview deployments
- **Pull requests** → Automatic preview URLs

## 🐛 Troubleshooting

### Common Issues:

1. **Build fails**
   - Check `vercel.json` syntax
   - Verify all dependencies are in `package.json`
   - Check build logs in Vercel dashboard

2. **Environment variables not working**
   - Ensure variables start with `VITE_`
   - Redeploy after adding variables
   - Check variable names match exactly

3. **EmailJS not working**
   - Verify all environment variables are set
   - Check EmailJS service is active
   - Test with browser console

4. **Routing issues**
   - Check `vercel.json` rewrites
   - Ensure all routes redirect to `index.html`

### Debug Commands:

```bash
# Check build locally
npm run build

# Preview production build
npm run preview

# Check Vercel deployment
vercel logs

# Redeploy
vercel --prod
```

## 📈 Monitoring

- **Vercel Analytics**: Built-in performance monitoring
- **EmailJS Dashboard**: Track email delivery
- **Browser Console**: Check for errors

## 🎉 You're Live!

Your MIM AL website is now deployed and ready to rock! 🎸

**Next Steps:**
1. Test email capture functionality
2. Set up custom domain (optional)
3. Enable analytics (optional)
4. Share your music with the world!
