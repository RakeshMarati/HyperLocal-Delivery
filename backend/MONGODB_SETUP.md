# MongoDB Atlas Setup Guide

Follow these steps to set up your free MongoDB Atlas cluster for the HyperLocal Delivery MVP.

## Step 1: Create MongoDB Atlas Account

1. Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account (or log in if you already have one)
3. Verify your email address if prompted

## Step 2: Create a Free Cluster

1. After logging in, you'll see the **Atlas Dashboard**
2. Click **"Build a Database"** or **"Create"** button
3. Choose the **FREE (M0) tier** - this is perfect for development
4. Select a **Cloud Provider** (AWS, Google Cloud, or Azure - choose the one closest to you)
5. Select a **Region** (choose the region closest to your location for better performance)
   - Example: If you're in India, choose `Mumbai (ap-south-1)` or `Singapore (ap-southeast-1)`
6. Leave cluster name as default (e.g., "Cluster0") or give it a custom name like "HyperLocal-Delivery"
7. Click **"Create"** - this will take 3-5 minutes to provision

## Step 3: Create Database User

1. While the cluster is being created, you'll see a **"Create Database User"** screen
2. Choose **"Password"** authentication method
3. Enter a **Username** (e.g., `hyperlocal_admin` or `admin`)
4. Enter a **Password** - **SAVE THIS PASSWORD** (you'll need it for the connection string)
   - Use a strong password (MongoDB will validate this)
   - **Important:** Store this password securely - you won't be able to see it again
5. Click **"Create Database User"**

## Step 4: Configure Network Access (IP Whitelist)

1. You'll see a **"Where would you like to connect from?"** screen
2. For development, click **"Add My Current IP Address"** - this allows your local machine to connect
3. **OR** for easier development (less secure), you can temporarily add `0.0.0.0/0` to allow all IPs
   - **Note:** For production, always restrict to specific IPs
4. Click **"Finish and Close"**

## Step 5: Get Your Connection String

1. Once your cluster is ready (status shows "Available"), click **"Connect"** button
2. Choose **"Connect your application"**
3. Select **"Node.js"** as the driver
4. Select version **"5.5 or later"** (or the latest version shown)
5. You'll see a connection string format (example structure shown below - NOT a real connection string):
   ```
   [connection-protocol]://[username]:[password]@[cluster-url].mongodb.net/?retryWrites=true&w=majority
   ```
6. **Copy this connection string from Atlas** - you'll need to replace the username and password placeholders with your actual credentials

## Step 6: Update Connection String

Replace the placeholders in your connection string:
- Replace `<username>` with the database username you created (e.g., `hyperlocal_admin`)
- Replace `<password>` with the database password you created
- **Important:** If your password contains special characters like `@`, `#`, `%`, etc., you need to URL-encode them:
  - `@` becomes `%40`
  - `#` becomes `%23`
  - `%` becomes `%25`
  - `&` becomes `%26`
  - etc.

**Your final connection string should include:**
- Protocol: [mongodb+srv protocol]
- Your username and password (from Step 3)
- Your cluster URL (from Atlas dashboard)
- Database name: /hyperlocal_delivery
- Query parameters: ?retryWrites=true&w=majority

**Example structure (NOT a real connection - replace with your actual values):**
```
[protocol]://[your-username]:[your-password]@[your-cluster-url].mongodb.net/hyperlocal_delivery?retryWrites=true&w=majority
```

**Note:** I added `/hyperlocal_delivery` before the `?` - this is the database name. You can use any name you like (e.g., `hyperlocal_dev`, `delivery_mvp`, etc.)

## Step 7: Add Connection String to .env File

1. In your `backend/` directory, create a `.env` file (if it doesn't exist)
2. Add your connection string to the `MONGODB_URI` variable
3. Also set the other required environment variables

See the `.env.example` file or the main README for the complete `.env` template.

## Troubleshooting

### Connection Issues
- **"IP not whitelisted"**: Make sure you added your IP address in Network Access
- **"Authentication failed"**: Double-check your username and password (remember to URL-encode special characters)
- **"Timeout"**: Check your internet connection and try again

### Free Tier Limitations
- **512 MB storage** - enough for development and testing
- **Shared RAM and CPU** - may be slower during peak times
- **No dedicated connection** - but sufficient for MVP development

## Next Steps

Once your `.env` file is configured:
1. Run `npm run dev` in the `backend/` directory
2. You should see: `MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net`
3. Test the health endpoint: `http://localhost:5000/api/health`

