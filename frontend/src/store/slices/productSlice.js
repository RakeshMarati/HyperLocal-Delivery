import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
  currentMerchantId: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setProducts: (state, action) => {
      state.products = action.payload.products || action.payload;
      state.currentMerchantId = action.payload.merchantId || state.currentMerchantId;
      state.isLoading = false;
      state.error = null;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearProducts: (state) => {
      state.products = [];
      state.currentMerchantId = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setProducts,
  setSelectedProduct,
  clearError,
  clearProducts,
} = productSlice.actions;

export default productSlice.reducer;

