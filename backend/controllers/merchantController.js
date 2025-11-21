const Merchant = require('../models/Merchant');

// @desc    Get all merchants
// @route   GET /api/merchants
// @access  Public
const getMerchants = async (req, res) => {
  try {
    const { category, city, search } = req.query;

    // Build query
    const query = { isActive: true };

    if (category) {
      query.category = category;
    }

    if (city) {
      query['address.city'] = new RegExp(city, 'i'); // Case-insensitive search
    }

    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
      ];
    }

    const merchants = await Merchant.find(query).sort({ rating: -1, createdAt: -1 });

    res.json({
      success: true,
      count: merchants.length,
      data: merchants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : {},
    });
  }
};

// @desc    Get single merchant by ID
// @route   GET /api/merchants/:id
// @access  Public
const getMerchantById = async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id);

    if (!merchant || !merchant.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Merchant not found',
      });
    }

    res.json({
      success: true,
      data: merchant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : {},
    });
  }
};

// @desc    Get merchants by category
// @route   GET /api/merchants/category/:category
// @access  Public
const getMerchantsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { city } = req.query;

    const query = {
      category,
      isActive: true,
    };

    if (city) {
      query['address.city'] = new RegExp(city, 'i');
    }

    const merchants = await Merchant.find(query).sort({ rating: -1 });

    res.json({
      success: true,
      count: merchants.length,
      data: merchants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : {},
    });
  }
};

module.exports = {
  getMerchants,
  getMerchantById,
  getMerchantsByCategory,
};

