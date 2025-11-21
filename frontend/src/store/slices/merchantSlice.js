import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  merchants: [],
  selectedMerchant: null,
  isLoading: false,
  error: null,
  filters: {
    category: null,
    city: null,
    search: null,
  },
};

const merchantSlice = createSlice({
  name: 'merchants',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setMerchants: (state, action) => {
      state.merchants = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setSelectedMerchant: (state, action) => {
      state.selectedMerchant = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: null,
        city: null,
        search: null,
      };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setMerchants,
  setSelectedMerchant,
  setFilters,
  clearFilters,
  clearError,
} = merchantSlice.actions;

export default merchantSlice.reducer;

