# Deployment Connection Issue Fix

## Problem
Frontend (Vercel) cannot connect to backend (Render) - "Unable to connect to server" error.

## Root Cause
CORS (Cross-Origin Resource Sharing) is blocking requests because:
1. Backend `CLIENT_URL` environment variable in Render doesn't match frontend URL
2. Frontend might be using wrong API URL

## Solution

### Step 1: Update Render Environment Variables

1. Go to **Render Dashboard**: https://dashboard.render.com
2. Select your backend service: `hyperlocal-delivery-api`
3. Go to **Environment** tab
4. Find `CLIENT_URL` variable
5. Update it to: `https://hyper-local-delivery.vercel.app`
6. **Save** (will auto-redeploy)

**Current (Wrong):**
```
CLIENT_URL=https://your-vercel-app.vercel.app
```

**Should be:**
```
CLIENT_URL=https://hyper-local-delivery.vercel.app
```

### Step 2: Verify Frontend API URL

1. Go to **Vercel Dashboard**: https://vercel.com
2. Select your frontend project: `hyper-local-delivery`
3. Go to **Settings** → **Environment Variables**
4. Verify `REACT_APP_API_URL` is set to:
```
REACT_APP_API_URL=https://hyperlocal-delivery-api.onrender.com/api
```

### Step 3: Wait for Redeployment

- Render will automatically redeploy after saving environment variables
- Wait 2-3 minutes for deployment to complete
- Check Render logs to ensure deployment succeeded

### Step 4: Test Connection

1. Open your frontend: https://hyper-local-delivery.vercel.app
2. Try to register a new user
3. Check browser console (F12) for any errors

## Alternative: Update CORS to Allow Multiple Origins

If you want to allow both localhost and production:

Update `backend/server.js`:
```javascript
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.CLIENT_URL,
      'http://localhost:3000',
      'https://hyper-local-delivery.vercel.app'
    ].filter(Boolean);
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

Then redeploy backend.

## Quick Check Commands

**Test backend health:**
```bash
curl https://hyperlocal-delivery-api.onrender.com/api/health
```

**Test CORS (should return Access-Control headers):**
```bash
curl -H "Origin: https://hyper-local-delivery.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -X OPTIONS \
     https://hyperlocal-delivery-api.onrender.com/api/auth/register \
     -v
```

## Common Issues

1. **Render service sleeping**: Free tier services sleep after 15 min inactivity
   - First request after sleep takes 30-60 seconds
   - Consider upgrading to paid plan for always-on

2. **Wrong API URL**: Frontend pointing to wrong backend URL
   - Check Vercel environment variables

3. **CORS not updated**: Backend CORS still pointing to localhost
   - Update `CLIENT_URL` in Render

4. **Backend not deployed**: Check Render deployment status
   - Should show "Live" status

## Verification Checklist

- [ ] `CLIENT_URL` in Render = `https://hyper-local-delivery.vercel.app`
- [ ] `REACT_APP_API_URL` in Vercel = `https://hyperlocal-delivery-api.onrender.com/api`
- [ ] Backend shows "Live" status in Render
- [ ] Backend health check works: `/api/health`
- [ ] Frontend can make requests (check browser network tab)

