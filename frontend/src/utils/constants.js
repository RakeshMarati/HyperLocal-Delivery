// App constants
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// User roles (for future use)
export const USER_ROLES = {
  CUSTOMER: 'customer',
  MERCHANT: 'merchant',
  DELIVERY_PARTNER: 'delivery_partner',
};

// Order status (for future use)
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

