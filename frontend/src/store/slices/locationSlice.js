import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  address: null,
  isLoading: false,
  error: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, setError, setAddress, clearError } =
  locationSlice.actions;

export default locationSlice.reducer;

