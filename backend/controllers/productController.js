const Product = require('../models/Product');

// @desc    Get all products for a merchant
// @route   GET /api/products/merchant/:merchantId
// @access  Public
const getProductsByMerchant = async (req, res) => {
  try {
    const { merchantId } = req.params;
    const { category, available } = req.query;

    const query = { merchant: merchantId };

    if (category) {
      query.category = category;
    }

    if (available !== undefined) {
      query.isAvailable = available === 'true';
    }

    const products = await Product.find(query)
      .populate('merchant', 'name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : {},
    });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      'merchant',
      'name address'
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      data: product,
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
  getProductsByMerchant,
  getProductById,
};

