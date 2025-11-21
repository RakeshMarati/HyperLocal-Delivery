# Environment Variables Quick Reference

## Backend (Render) - Environment Variables

Copy and paste these into Render's Environment Variables section:

```
PORT=5001
NODE_ENV=production
MONGODB_URI=your-mongodb-atlas-connection-string-here
JWT_SECRET=your-secret-key-here-generate-a-random-hex-string
CLIENT_URL=https://your-vercel-app.vercel.app
```

**MongoDB URI Format:**
Get your connection string from MongoDB Atlas dashboard:
1. Go to your cluster → Click "Connect"
2. Select "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<database-name>` with `hyperlocal_delivery` (or your preferred database name)

The format structure: `[protocol]://` + `username` + `:` + `password` + `@` + `cluster-url` + `.mongodb.net/` + `database-name` + `?retryWrites=true&w=majority`

(Protocol is `mongodb+srv` for Atlas clusters)

**Important**: 
- Replace `your-vercel-app.vercel.app` with your actual Vercel frontend URL after deploying
- Render will automatically set PORT, but include it anyway

---

## Frontend (Vercel) - Environment Variables

Copy and paste this into Vercel's Environment Variables section:

```
REACT_APP_API_URL=https://your-render-app.onrender.com/api
```

**Important**: 
- Replace `your-render-app.onrender.com` with your actual Render backend URL
- Make sure the URL ends with `/api` (not `/api/`)

---

## Step-by-Step Deployment Order

### 1. Deploy Backend First (Render)
1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repo
4. Set Root Directory: `backend`
5. Add environment variables (use placeholder for CLIENT_URL)
6. Deploy
7. Copy your Render URL (e.g., `https://hyperlocal-api.onrender.com`)

### 2. Deploy Frontend (Vercel)
1. Go to https://vercel.com
2. Import project from GitHub
3. Set Root Directory: `frontend`
4. Add environment variable: `REACT_APP_API_URL=https://your-render-app.onrender.com/api`
5. Deploy
6. Copy your Vercel URL (e.g., `https://hyperlocal-delivery.vercel.app`)

### 3. Update Backend CLIENT_URL
1. Go back to Render
2. Update `CLIENT_URL` with your Vercel URL
3. Save (will auto-redeploy)

---

## Example URLs (Replace with Your Actual URLs)

**Backend (Render):**
```
https://hyperlocal-delivery-api.onrender.com
```

**Frontend (Vercel):**
```
https://hyperlocal-delivery.vercel.app
```

**API Base URL (for frontend):**
```
https://hyperlocal-delivery-api.onrender.com/api
```

---

## Testing After Deployment

1. **Backend Health Check:**
   - Visit: `https://your-render-app.onrender.com/api/health`
   - Should return: `{"status":"OK",...}`

2. **Frontend:**
   - Visit: `https://your-vercel-app.vercel.app`
   - Should load the homepage
   - Check browser console for any API errors

3. **Full Flow Test:**
   - Sign up → Login → Set location → Browse merchants → Add to cart → Checkout → Place order

