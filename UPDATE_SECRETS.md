# Secrets Update Checklist

## ✅ JWT Secret Updated Locally
- **New JWT Secret**: `[YOUR_NEW_JWT_SECRET]` (stored in `backend/.env`)
- **Location**: `backend/.env` (local - not committed to git)

## 🔄 Next Steps

### 1. Update Render (Backend Deployment)
1. Go to https://dashboard.render.com
2. Navigate to your backend service
3. Go to **Environment** tab
4. Find `JWT_SECRET` variable
5. Update with your new JWT secret (from `backend/.env`)
6. Save (will auto-redeploy)

### 2. Rotate MongoDB Credentials (CRITICAL)
Since MongoDB credentials were exposed in git history:

1. **Go to MongoDB Atlas**: https://cloud.mongodb.com
2. **Database Access** → Find user `rakeshmarati01_db_user`
3. **Edit** → **Reset Password**
4. **Generate new password**
5. **Update**:
   - Local `backend/.env` file (MONGODB_URI)
   - Render environment variables (MONGODB_URI)

### 3. Verify .env File
Your `backend/.env` should have:
```env
PORT=5001
NODE_ENV=development
MONGODB_URI=your-new-mongodb-connection-string
JWT_SECRET=your-new-jwt-secret-here
CLIENT_URL=http://localhost:3000
```

### 4. Test After Updates
```bash
# Restart backend to use new JWT secret
cd backend
npm run dev
```

### 5. Dismiss GitGuardian Alert
After rotating MongoDB credentials:
- Go to GitGuardian dashboard
- Find the alert for MongoDB URI
- Mark as "Resolved" or "Rotated"
- The old secret will be invalid, so it's safe to dismiss

## 🔒 Security Best Practices
- ✅ Never commit `.env` files (already in `.gitignore`)
- ✅ Use placeholders in documentation
- ✅ Rotate secrets periodically
- ✅ Use different secrets for dev/prod

## 📝 Notes
- JWT secret is updated locally
- MongoDB credentials still need rotation
- Old secrets in git history are invalid after rotation

