const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
// CORS configuration - allow multiple origins for flexibility
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:3000',
  'https://hyper-local-delivery.vercel.app',
  'https://hyper-local-delivery.vercel.app/'
].filter(Boolean);

// Simplified CORS - allow all in production for now, can restrict later
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Normalize origin (remove trailing slash)
    const normalizedOrigin = origin.replace(/\/$/, '');
    
    // Check if origin is in allowed list
    const isAllowed = allowedOrigins.some(allowed => {
      const normalizedAllowed = allowed.replace(/\/$/, '');
      return normalizedOrigin === normalizedAllowed || normalizedOrigin.startsWith(normalizedAllowed);
    });
    
    if (isAllowed) {
      callback(null, true);
    } else if (process.env.NODE_ENV === 'development') {
      // For development, allow all origins
      callback(null, true);
    } else {
      // For production, be more permissive to avoid CORS issues
      // You can restrict this later once everything works
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'HyperLocal Delivery API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health'
    }
  });
});

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'HyperLocal Delivery API is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/merchants', require('./routes/merchantRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// Error handling middleware (basic)
app.use((err, req, res, next) => {
  // Don't log CORS errors as 500 errors
  if (err.message && err.message.includes('CORS')) {
    return res.status(403).json({ 
      message: 'CORS policy violation',
      error: process.env.NODE_ENV === 'development' ? err.message : 'Not allowed by CORS'
    });
  }
  
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
// Render automatically sets PORT, but we use 5001 as fallback for local development
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

