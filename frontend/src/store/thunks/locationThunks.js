import { setLoading, setError, setAddress, clearError } from '../slices/locationSlice';
import { updateUserAddress as updateAuthAddress } from '../slices/authSlice';
import api from '../../services/api';

// Update user address
export const updateUserAddress = (addressData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(clearError());

    const response = await api.put('/auth/address', addressData);

    dispatch(setAddress(response.data.address));
    // Also update address in auth slice
    dispatch(updateAuthAddress(response.data.address));

    return { success: true, address: response.data.address };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Failed to update address. Please try again.';
    dispatch(setError(errorMessage));
    return { success: false, error: errorMessage };
  }
};

