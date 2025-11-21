# Vercel Environment Variable Fix

## Problem
404 Not Found error when trying to register.

**Request URL (WRONG):**
```
https://hyperlocal-delivery-api.onrender.com/auth/register
```

**Should be:**
```
https://hyperlocal-delivery-api.onrender.com/api/auth/register
```

## Root Cause
The `REACT_APP_API_URL` in Vercel is missing the `/api` suffix.

## Solution

### Step 1: Update Vercel Environment Variable

1. Go to **Vercel Dashboard**: https://vercel.com
2. Select your project: `hyper-local-delivery`
3. Go to **Settings** → **Environment Variables**
4. Find `REACT_APP_API_URL`
5. **Current (WRONG):**
   ```
   https://hyperlocal-delivery-api.onrender.com
   ```
6. **Update to (CORRECT):**
   ```
   https://hyperlocal-delivery-api.onrender.com/api
   ```
7. **Important**: Make sure it ends with `/api` (NOT `/api/`)
8. Click **Save**

### Step 2: Redeploy Frontend

After updating the environment variable:

1. Go to **Deployments** tab in Vercel
2. Click the **three dots** (⋯) on the latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger redeployment

### Step 3: Verify

After redeployment (1-2 minutes):

1. Open: https://hyper-local-delivery.vercel.app
2. Open browser console (F12)
3. Check Network tab
4. Try to register
5. Verify the request URL is: `https://hyperlocal-delivery-api.onrender.com/api/auth/register`

## Quick Test

Test the correct endpoint:
```bash
curl -X POST https://hyperlocal-delivery-api.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123","phone":"1234567890"}'
```

Should return user data (not 404).

## Why This Happened

The frontend `api.js` uses:
```javascript
baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api'
```

If `REACT_APP_API_URL` is set to `https://hyperlocal-delivery-api.onrender.com` (without `/api`), then requests go to `/auth/register` instead of `/api/auth/register`.

## Verification Checklist

- [ ] `REACT_APP_API_URL` in Vercel = `https://hyperlocal-delivery-api.onrender.com/api`
- [ ] Frontend redeployed after updating env variable
- [ ] Request URL in browser shows `/api/auth/register`
- [ ] Registration works without 404 error

