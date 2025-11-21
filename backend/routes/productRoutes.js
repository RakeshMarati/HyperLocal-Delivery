const express = require('express');
const router = express.Router();
const {
  getProductsByMerchant,
  getProductById,
} = require('../controllers/productController');

router.get('/merchant/:merchantId', getProductsByMerchant);
router.get('/:id', getProductById);

module.exports = router;

