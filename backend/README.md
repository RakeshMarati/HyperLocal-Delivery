# HyperLocal Delivery - Backend API

Backend server for the HyperLocal Delivery MVP built with Node.js, Express, and MongoDB.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=your_super_secret_jwt_key_here
CLIENT_URL=http://localhost:3000
```

3. Run the development server:
```bash
npm run dev
```

## Project Structure

- `config/` - Configuration files (database, etc.)
- `controllers/` - Request handlers
- `middleware/` - Custom middleware (auth, validation, etc.)
- `models/` - Mongoose models
- `routes/` - API route definitions
- `utils/` - Utility functions
- `server.js` - Application entry point

