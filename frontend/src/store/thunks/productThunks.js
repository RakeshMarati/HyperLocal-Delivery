import { setLoading, setError, setProducts, setSelectedProduct, clearError } from '../slices/productSlice';
import api from '../../services/api';

// Get products by merchant
export const fetchProductsByMerchant = (merchantId, filters = {}) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(clearError());

    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.available !== undefined) params.append('available', filters.available);

    const response = await api.get(
      `/products/merchant/${merchantId}?${params.toString()}`
    );

    dispatch(setProducts({ products: response.data.data || [], merchantId }));

    return { success: true, products: response.data.data };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Failed to fetch products. Please try again.';
    dispatch(setError(errorMessage));
    return { success: false, error: errorMessage };
  }
};

// Get product by ID
export const fetchProductById = (productId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(clearError());

    const response = await api.get(`/products/${productId}`);

    dispatch(setSelectedProduct(response.data.data));

    return { success: true, product: response.data.data };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Failed to fetch product. Please try again.';
    dispatch(setError(errorMessage));
    return { success: false, error: errorMessage };
  }
};

