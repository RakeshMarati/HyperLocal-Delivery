# CORS Error Fix - 500 on Preflight Request

## Problem
- **CORS error** on main request
- **500 Internal Server Error** on preflight (OPTIONS) request
- Registration fails with "Unable to connect to server"

## Root Cause
The CORS middleware was throwing errors that were being caught by the error handler, causing 500 errors on preflight requests instead of proper CORS responses.

## Fix Applied

### 1. Improved CORS Configuration
- Better origin matching logic
- Explicit methods and headers
- More permissive in production (temporarily) to debug

### 2. Better Error Handling
- CORS errors now return 403 instead of 500
- Prevents error handler from catching CORS rejections

## Next Steps

### 1. Redeploy Backend on Render
1. Go to **Render Dashboard**: https://dashboard.render.com
2. Your backend service should **auto-redeploy** after the git push
3. Wait 2-3 minutes for deployment
4. Check deployment logs for any errors

### 2. Verify CORS is Working
After redeployment, test:
```bash
curl -X OPTIONS https://hyperlocal-delivery-api.onrender.com/api/auth/register \
  -H "Origin: https://hyper-local-delivery.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -v
```

Should return **204** (not 500).

### 3. Test Registration
1. Open: https://hyper-local-delivery.vercel.app
2. Try to register
3. Check browser console/network tab
4. Should see **200/201** (not CORS error or 500)

## If Still Not Working

### Check Render Logs
1. Render Dashboard → Your service → **Logs** tab
2. Look for CORS-related errors
3. Check if MongoDB connection is working

### Verify Environment Variables
In Render → Environment tab:
- `CLIENT_URL` = `https://hyper-local-delivery.vercel.app`
- `MONGODB_URI` = Your MongoDB connection string
- `JWT_SECRET` = Your JWT secret
- `NODE_ENV` = `production`

### Test Backend Directly
```bash
# Test health
curl https://hyperlocal-delivery-api.onrender.com/api/health

# Test registration
curl -X POST https://hyperlocal-delivery-api.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -H "Origin: https://hyper-local-delivery.vercel.app" \
  -d '{"name":"Test","email":"test@test.com","password":"test123","phone":"1234567890"}'
```

## Temporary CORS Permissiveness

The current fix allows all origins in production temporarily. Once everything works, you can restrict it:

```javascript
// In server.js, change this:
} else {
  callback(null, true); // Currently allows all
}

// To this (more secure):
} else {
  callback(new Error('Not allowed by CORS'));
}
```

But only do this after confirming everything works!

