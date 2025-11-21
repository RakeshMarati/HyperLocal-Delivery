# Quick Deployment Guide

## 🚀 Fast Track Deployment

### Backend on Render (5 minutes)

1. **Go to Render**: https://render.com → Sign up/Login
2. **New Web Service** → Connect GitHub → Select repo
3. **Settings**:
   - Name: `hyperlocal-api`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. **Environment Variables** (copy-paste these):

```
PORT=5001
NODE_ENV=production
MONGODB_URI=mongodb+srv://rakeshmarati01_db_user:KRA6tc4VHPkIIROL@cluster0.gvlxrui.mongodb.net/hyperlocal_delivery?retryWrites=true&w=majority
JWT_SECRET=1e86a101310618d4f4be3b4d726907a5c4cb96b25a13a656ae600260eaa0ee7e
CLIENT_URL=https://your-vercel-app.vercel.app
```

5. **Deploy** → Copy your Render URL (e.g., `https://hyperlocal-api.onrender.com`)

---

### Frontend on Vercel (3 minutes)

1. **Go to Vercel**: https://vercel.com → Sign up/Login
2. **New Project** → Import from GitHub → Select repo
3. **Settings**:
   - Framework: `Create React App`
   - Root Directory: `frontend`
4. **Environment Variable**:

```
REACT_APP_API_URL=https://your-render-app.onrender.com/api
```

**Replace `your-render-app.onrender.com` with your actual Render URL**

5. **Deploy** → Copy your Vercel URL (e.g., `https://hyperlocal-delivery.vercel.app`)

---

### Final Step: Update Backend

1. Go back to Render
2. Update `CLIENT_URL` with your Vercel URL
3. Save (auto-redeploys)

---

## ✅ Test Your Deployment

- Backend: `https://your-render-app.onrender.com/api/health`
- Frontend: `https://your-vercel-app.vercel.app`

---

## 📋 Full Details

See `DEPLOYMENT.md` for complete step-by-step instructions with screenshots guidance.

