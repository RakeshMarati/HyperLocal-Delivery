const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  updateAddress,
  updateProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/address', protect, updateAddress);
router.put('/profile', protect, updateProfile);

module.exports = router;

