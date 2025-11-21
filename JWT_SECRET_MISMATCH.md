# JWT Secret Mismatch Issue

## Problem
The JWT secret in your local `.env` file is **different** from the one in Render environment variables.

### Current Values:
- **Local .env:** `104179cc6df3f44b34f345161590d9b99972d548c773e1a3dd46a657236e7150`
- **Render:** `1e86a101310618d4f4be3b4d726907a5c4cb96b25a13a656ae600260eaa0ee7e`

## Impact
❌ **This will cause authentication failures!**

- Tokens created locally won't work on Render (and vice versa)
- Users logged in on production won't be able to authenticate
- You'll get "Invalid token" or "Not authorized" errors

## Solution

You need to **synchronize** the JWT secrets. Choose one:

### Option 1: Update Local .env to Match Render (Recommended)
Update your local `.env` to use the Render JWT secret:

```bash
cd backend
# Backup current .env
cp .env .env.backup

# Update JWT_SECRET
sed -i '' 's/^JWT_SECRET=.*/JWT_SECRET=1e86a101310618d4f4be3b4d726907a5c4cb96b25a13a656ae600260eaa0ee7e/' .env
```

### Option 2: Update Render to Match Local
1. Go to Render Dashboard
2. Your backend service → Environment tab
3. Find `JWT_SECRET`
4. Update to: `104179cc6df3f44b34f345161590d9b99972d548c773e1a3dd46a657236e7150`
5. Save (will auto-redeploy)

## Recommendation

**Use Option 1** (update local to match Render) because:
- Render is your production environment
- Other users/deployments might be using the Render secret
- Changing production secrets invalidates all existing tokens

## After Updating

1. **Restart your local backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Test authentication:**
   - Try logging in locally
   - Verify tokens work

3. **Note:** If you update Render instead, all existing user sessions will be invalidated and users will need to log in again.

## Security Note

Both secrets are valid 64-character hex strings. The important thing is that they match between environments.

