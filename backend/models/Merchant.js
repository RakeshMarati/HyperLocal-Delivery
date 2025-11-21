const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a merchant name'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: ['food', 'grocery', 'pharmacy', 'others'],
      default: 'others',
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    deliveryTime: {
      type: String, // e.g., "30-45 mins"
      default: '30-45 mins',
    },
    minimumOrder: {
      type: Number,
      default: 0,
    },
    image: {
      type: String, // URL to merchant image
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Merchant', merchantSchema);

