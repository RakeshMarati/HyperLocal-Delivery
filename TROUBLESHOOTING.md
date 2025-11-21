# Troubleshooting "Unable to connect to server" Error

## Error Message
```
Unable to connect to server. Please check your internet connection and ensure the backend is running.
```

## Common Causes & Solutions

### 1. ✅ Frontend API URL Missing `/api` (MOST COMMON)

**Check:**
- Open browser console (F12) → Network tab
- Look at the failed request URL
- If it shows: `https://hyperlocal-delivery-api.onrender.com/auth/register` ❌
- Should be: `https://hyperlocal-delivery-api.onrender.com/api/auth/register` ✅

**Fix:**
1. Go to **Vercel** → Your project → **Settings** → **Environment Variables**
2. Check `REACT_APP_API_URL`
3. Must be: `https://hyperlocal-delivery-api.onrender.com/api` (with `/api` at the end)
4. **Redeploy** frontend after updating

---

### 2. ✅ Backend Sleeping (Render Free Tier)

**Symptom:**
- First request after 15+ minutes of inactivity takes 30-60 seconds
- Request times out or shows "Unable to connect"

**Fix:**
- **Wait 30-60 seconds** and try again (backend is waking up)
- Or **upgrade to paid Render plan** for always-on service
- Or **ping the backend first** to wake it up:
  ```bash
  curl https://hyperlocal-delivery-api.onrender.com/api/health
  ```

---

### 3. ✅ Frontend Not Redeployed After Env Var Change

**Check:**
- Vercel → **Deployments** tab
- Check if latest deployment was **after** you updated `REACT_APP_API_URL`

**Fix:**
1. Go to **Deployments** tab
2. Click **three dots** (⋯) on latest deployment
3. Click **Redeploy**
4. Wait 1-2 minutes

---

### 4. ✅ CORS Issue

**Check:**
- Browser console → Network tab → Failed request
- Look for CORS error messages

**Fix:**
1. Go to **Render** → Your backend service → **Environment** tab
2. Check `CLIENT_URL` = `https://hyper-local-delivery.vercel.app`
3. Save (auto-redeploys)

---

### 5. ✅ Backend Not Running

**Check:**
```bash
curl https://hyperlocal-delivery-api.onrender.com/api/health
```

**Should return:**
```json
{"status":"OK","message":"HyperLocal Delivery API is running",...}
```

**If not:**
- Check Render dashboard → Your service status
- Should show "Live" (green)
- Check logs for errors

---

## Quick Diagnostic Steps

### Step 1: Check Browser Console
1. Open: https://hyper-local-delivery.vercel.app
2. Press **F12** → **Console** tab
3. Try to register
4. Look for error messages

### Step 2: Check Network Tab
1. Press **F12** → **Network** tab
2. Try to register
3. Find the failed request
4. Check:
   - **Request URL** (should include `/api`)
   - **Status Code** (404 = wrong URL, timeout = sleeping)
   - **Response** (any error message)

### Step 3: Test Backend Directly
```bash
curl -X POST https://hyperlocal-delivery-api.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123","phone":"1234567890"}'
```

**Should return user data (not error)**

---

## Verification Checklist

- [ ] `REACT_APP_API_URL` in Vercel = `https://hyperlocal-delivery-api.onrender.com/api`
- [ ] Frontend redeployed after env var update
- [ ] `CLIENT_URL` in Render = `https://hyper-local-delivery.vercel.app`
- [ ] Backend shows "Live" status in Render
- [ ] Backend health check works: `/api/health`
- [ ] Request URL in browser includes `/api/auth/register`
- [ ] Waited 30-60 seconds if first request (Render free tier)

---

## Still Not Working?

1. **Clear browser cache** and try again
2. **Check Render logs** for backend errors
3. **Check Vercel logs** for frontend build errors
4. **Verify MongoDB connection** in Render logs
5. **Test with curl** to isolate frontend vs backend issue

---

## Updated Code

I've updated the frontend to:
- ✅ Increase timeout to 60 seconds (for Render free tier wake-up)
- ✅ Better error messages for timeout vs connection issues
- ✅ More helpful error messages

**Next:** Redeploy frontend to get the updated code.

