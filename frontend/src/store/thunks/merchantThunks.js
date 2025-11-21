import { setLoading, setError, setMerchants, setSelectedMerchant, clearError } from '../slices/merchantSlice';
import api from '../../services/api';

// Get all merchants
export const fetchMerchants = (filters = {}) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(clearError());

    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.city) params.append('city', filters.city);
    if (filters.search) params.append('search', filters.search);

    const response = await api.get(`/merchants?${params.toString()}`);

    dispatch(setMerchants(response.data.data || []));

    return { success: true, merchants: response.data.data };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Failed to fetch merchants. Please try again.';
    dispatch(setError(errorMessage));
    return { success: false, error: errorMessage };
  }
};

// Get merchant by ID
export const fetchMerchantById = (merchantId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(clearError());

    const response = await api.get(`/merchants/${merchantId}`);

    dispatch(setSelectedMerchant(response.data.data));

    return { success: true, merchant: response.data.data };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Failed to fetch merchant. Please try again.';
    dispatch(setError(errorMessage));
    return { success: false, error: errorMessage };
  }
};

// Get merchants by category
export const fetchMerchantsByCategory = (category, city = null) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(clearError());

    const params = city ? `?city=${city}` : '';
    const response = await api.get(`/merchants/category/${category}${params}`);

    dispatch(setMerchants(response.data.data || []));

    return { success: true, merchants: response.data.data };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Failed to fetch merchants. Please try again.';
    dispatch(setError(errorMessage));
    return { success: false, error: errorMessage };
  }
};

