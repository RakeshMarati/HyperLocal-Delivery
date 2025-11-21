import { configureStore } from '@reduxjs/toolkit';

// Import slices
import authReducer from './slices/authSlice';
// import locationReducer from './slices/locationSlice';
// import merchantReducer from './slices/merchantSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // location: locationReducer,
    // merchants: merchantReducer,
    // Add more slices as we build them
  },
  // Redux Toolkit's configureStore already includes thunk middleware by default
});

export default store;

