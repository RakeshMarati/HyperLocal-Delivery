const express = require('express');
const router = express.Router();
const {
  getMerchants,
  getMerchantById,
  getMerchantsByCategory,
} = require('../controllers/merchantController');

router.get('/', getMerchants);
router.get('/category/:category', getMerchantsByCategory);
router.get('/:id', getMerchantById);

module.exports = router;

