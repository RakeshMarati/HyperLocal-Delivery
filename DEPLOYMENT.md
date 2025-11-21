# Deployment Guide

This guide provides step-by-step instructions for deploying the HyperLocal Delivery application.

## Table of Contents
1. [Backend Deployment (Render)](#backend-deployment-render)
2. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
3. [Environment Variables Reference](#environment-variables-reference)

---

## Backend Deployment (Render)

### Prerequisites
- GitHub account with the repository pushed
- Render account (sign up at https://render.com)

### Step-by-Step Instructions

#### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up or log in with your GitHub account
3. Connect your GitHub account if prompted

#### Step 2: Create New Web Service
1. Click **"New +"** button in the dashboard
2. Select **"Web Service"**
3. Connect your GitHub repository: `RakeshMarati/HyperLocal-Delivery`
4. Select the repository and click **"Connect"**

#### Step 3: Configure Web Service
1. **Name**: `hyperlocal-delivery-api` (or any name you prefer)
2. **Region**: Choose closest to your users (e.g., `Singapore` or `US East`)
3. **Branch**: `main`
4. **Root Directory**: `backend`
5. **Runtime**: `Node`
6. **Build Command**: `npm install`
7. **Start Command**: `npm start`

#### Step 4: Add Environment Variables
Click on **"Advanced"** → **"Add Environment Variable"** and add the following:

| Key | Value | Description |
|-----|-------|-------------|
| `PORT` | `5001` | Server port (Render will override this, but keep it) |
| `NODE_ENV` | `production` | Environment mode |
| `MONGODB_URI` | `mongodb+srv://rakeshmarati01_db_user:KRA6tc4VHPkIIROL@cluster0.gvlxrui.mongodb.net/hyperlocal_delivery?retryWrites=true&w=majority` | MongoDB Atlas connection string |
| `JWT_SECRET` | `1e86a101310618d4f4be3b4d726907a5c4cb96b25a13a656ae600260eaa0ee7e` | JWT secret key for token signing |
| `CLIENT_URL` | `https://your-vercel-app.vercel.app` | Your Vercel frontend URL (update after frontend deployment) |

**Important**: 
- Replace `your-vercel-app.vercel.app` with your actual Vercel URL after deploying the frontend
- Keep `MONGODB_URI` and `JWT_SECRET` secure - don't share them publicly

#### Step 5: Deploy
1. Click **"Create Web Service"**
2. Render will start building and deploying your backend
3. Wait for deployment to complete (usually 2-5 minutes)
4. Once deployed, you'll get a URL like: `https://hyperlocal-delivery-api.onrender.com`

#### Step 6: Update MongoDB Atlas IP Whitelist
1. Go to MongoDB Atlas Dashboard
2. Navigate to **Network Access**
3. Click **"Add IP Address"**
4. Click **"Allow Access from Anywhere"** (or add Render's IP ranges)
5. Click **"Confirm"**

#### Step 7: Test Backend
1. Visit your Render URL: `https://your-app.onrender.com/api/health`
2. You should see: `{"status":"OK","message":"HyperLocal Delivery API is running",...}`

#### Step 8: Update CLIENT_URL
1. Go back to Render dashboard
2. Navigate to your service → **Environment**
3. Update `CLIENT_URL` with your Vercel frontend URL
4. Save changes (this will trigger a redeploy)

---

## Frontend Deployment (Vercel)

### Prerequisites
- GitHub account with the repository pushed
- Vercel account (sign up at https://vercel.com)

### Step-by-Step Instructions

#### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Sign up or log in with your GitHub account
3. Authorize Vercel to access your GitHub repositories

#### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Find and select your repository: `RakeshMarati/HyperLocal-Delivery`
3. Click **"Import"**

#### Step 3: Configure Project
1. **Framework Preset**: `Create React App`
2. **Root Directory**: `frontend` (click "Edit" and set to `frontend`)
3. **Build Command**: `npm run build` (should be auto-detected)
4. **Output Directory**: `build` (should be auto-detected)
5. **Install Command**: `npm install` (should be auto-detected)

#### Step 4: Add Environment Variables
Click **"Environment Variables"** and add:

| Key | Value | Description |
|-----|-------|-------------|
| `REACT_APP_API_URL` | `https://your-render-app.onrender.com/api` | Your Render backend URL (update with your actual Render URL) |

**Important**: 
- Replace `your-render-app.onrender.com` with your actual Render backend URL
- The URL should end with `/api` (not `/api/`)

#### Step 5: Deploy
1. Click **"Deploy"**
2. Vercel will build and deploy your frontend
3. Wait for deployment to complete (usually 2-3 minutes)
4. Once deployed, you'll get a URL like: `https://hyperlocal-delivery.vercel.app`

#### Step 6: Update Backend CLIENT_URL
1. Go back to Render dashboard
2. Update the `CLIENT_URL` environment variable with your Vercel URL
3. Save to trigger redeploy

#### Step 7: Test Frontend
1. Visit your Vercel URL
2. Test the application:
   - Sign up/Login
   - Set location
   - Browse merchants
   - Add items to cart
   - Place order

---

## Environment Variables Reference

### Backend Environment Variables (Render)

```env
PORT=5001
NODE_ENV=production
MONGODB_URI=mongodb+srv://rakeshmarati01_db_user:KRA6tc4VHPkIIROL@cluster0.gvlxrui.mongodb.net/hyperlocal_delivery?retryWrites=true&w=majority
JWT_SECRET=1e86a101310618d4f4be3b4d726907a5c4cb96b25a13a656ae600260eaa0ee7e
CLIENT_URL=https://your-vercel-app.vercel.app
```

**Copy-paste ready values:**
```
PORT=5001
NODE_ENV=production
MONGODB_URI=mongodb+srv://rakeshmarati01_db_user:KRA6tc4VHPkIIROL@cluster0.gvlxrui.mongodb.net/hyperlocal_delivery?retryWrites=true&w=majority
JWT_SECRET=1e86a101310618d4f4be3b4d726907a5c4cb96b25a13a656ae600260eaa0ee7e
CLIENT_URL=https://your-vercel-app.vercel.app
```

### Frontend Environment Variables (Vercel)

```env
REACT_APP_API_URL=https://your-render-app.onrender.com/api
```

**Copy-paste ready value:**
```
REACT_APP_API_URL=https://your-render-app.onrender.com/api
```

**Important Notes:**
- Replace `your-vercel-app.vercel.app` with your actual Vercel URL
- Replace `your-render-app.onrender.com` with your actual Render URL
- The frontend URL in `CLIENT_URL` should NOT have `/api` at the end
- The backend URL in `REACT_APP_API_URL` should have `/api` at the end

---

## Post-Deployment Checklist

### Backend (Render)
- [ ] Backend is accessible at Render URL
- [ ] `/api/health` endpoint returns success
- [ ] MongoDB connection is working
- [ ] CORS is configured correctly
- [ ] Environment variables are set

### Frontend (Vercel)
- [ ] Frontend is accessible at Vercel URL
- [ ] Can sign up and login
- [ ] API calls are working (check browser console)
- [ ] Environment variable `REACT_APP_API_URL` is set correctly
- [ ] Backend `CLIENT_URL` is updated with Vercel URL

### Testing
- [ ] User registration works
- [ ] User login works
- [ ] Location setting works
- [ ] Merchant listing works
- [ ] Product viewing works
- [ ] Cart functionality works
- [ ] Order placement works
- [ ] Order history works

---

## Troubleshooting

### Backend Issues

**Problem**: Backend not connecting to MongoDB
- **Solution**: Check MongoDB Atlas IP whitelist includes Render IPs or allow all IPs

**Problem**: CORS errors
- **Solution**: Verify `CLIENT_URL` in backend matches your Vercel URL exactly

**Problem**: Environment variables not working
- **Solution**: Make sure to save environment variables and redeploy

### Frontend Issues

**Problem**: API calls failing
- **Solution**: Check `REACT_APP_API_URL` is set correctly with your Render backend URL

**Problem**: Build fails
- **Solution**: Check build logs in Vercel dashboard for specific errors

**Problem**: Blank page after deployment
- **Solution**: Check browser console for errors, verify API URL is correct

---

## Quick Reference URLs

After deployment, update these in your environment variables:

- **Backend URL**: `https://your-app.onrender.com`
- **Frontend URL**: `https://your-app.vercel.app`
- **API Base URL**: `https://your-app.onrender.com/api`

---

## Support

If you encounter issues:
1. Check the deployment logs in Render/Vercel dashboards
2. Verify all environment variables are set correctly
3. Check MongoDB Atlas connection
4. Verify CORS settings match your frontend URL

