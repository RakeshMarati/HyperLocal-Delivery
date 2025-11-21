const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { items, merchantId, deliveryAddress, paymentMethod, deliveryFee: providedDeliveryFee } = req.body;

    // Validation
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item',
      });
    }

    if (!merchantId) {
      return res.status(400).json({
        success: false,
        message: 'Merchant ID is required',
      });
    }

    if (!deliveryAddress || !deliveryAddress.city || !deliveryAddress.pincode) {
      return res.status(400).json({
        success: false,
        message: 'Complete delivery address is required',
      });
    }

    // Calculate totals
    const subtotal = items.reduce((sum, item) => {
      return sum + item.productPrice * item.quantity;
    }, 0);

    // Calculate delivery fee
    // Free delivery if subtotal is ₹100 or above
    // 
    // FUTURE: Distance-based pricing
    // To implement distance-based delivery fee:
    // 1. Get merchant location: merchant.address.coordinates (latitude, longitude)
    // 2. Get delivery address: deliveryAddress.coordinates (latitude, longitude)
    // 3. Calculate distance using Haversine formula or Google Maps Distance Matrix API
    // 4. Set deliveryFee based on distance tiers (e.g., 0-2km: ₹30, 2-5km: ₹50, 5-10km: ₹80, etc.)
    // 5. Still apply free delivery for orders above ₹100
    //
    // For now, use provided deliveryFee from frontend or calculate based on subtotal
    const deliveryFee = providedDeliveryFee !== undefined 
      ? providedDeliveryFee 
      : (subtotal >= 100 ? 0 : 50);
    const total = subtotal + deliveryFee;

    // Prepare order items
    const orderItems = items.map((item) => ({
      product: item.productId,
      productName: item.productName,
      productPrice: item.productPrice,
      quantity: item.quantity,
      subtotal: item.productPrice * item.quantity,
    }));

    // Create order
    const order = await Order.create({
      user: req.user._id,
      merchant: merchantId,
      items: orderItems,
      deliveryAddress,
      subtotal,
      deliveryFee,
      total,
      paymentMethod: paymentMethod || 'cod',
      estimatedDeliveryTime: '30-45 mins',
    });

    // Populate merchant and user details
    await order.populate('merchant', 'name address');
    await order.populate('user', 'name email phone');

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : {},
    });
  }
};

// @desc    Get user's orders
// @route   GET /api/orders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('merchant', 'name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : {},
    });
  }
};

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('merchant', 'name address phone')
      .populate('user', 'name email phone');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Check if order belongs to user
    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order',
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : {},
    });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Admin/Merchant only - for future use)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    order.status = status;
    await order.save();

    res.json({
      success: true,
      data: order,
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
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
};

