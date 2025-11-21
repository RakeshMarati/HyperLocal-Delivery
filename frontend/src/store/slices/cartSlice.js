import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage on initialization
const loadCartFromStorage = () => {
  try {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error('Error loading cart from storage:', error);
    return [];
  }
};

const initialState = {
  items: loadCartFromStorage(),
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, merchant, quantity = 1 } = action.payload;
      
      // Check if product already exists in cart from the same merchant
      const existingItemIndex = state.items.findIndex(
        (item) => item.product._id === product._id && item.merchant._id === merchant._id
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        state.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        state.items.push({
          product,
          merchant,
          quantity,
          addedAt: new Date().toISOString(),
        });
      }

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      const { productId, merchantId } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.product._id === productId && item.merchant._id === merchantId)
      );
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { productId, merchantId, quantity } = action.payload;
      const item = state.items.find(
        (item) => item.product._id === productId && item.merchant._id === merchantId
      );
      if (item) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          state.items = state.items.filter(
            (item) => !(item.product._id === productId && item.merchant._id === merchantId)
          );
        } else {
          item.quantity = quantity;
        }
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cart');
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setError,
  clearError,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => {
  return state.cart.items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
};
export const selectCartItemsCount = (state) => {
  return state.cart.items.reduce((count, item) => count + item.quantity, 0);
};

export default cartSlice.reducer;

