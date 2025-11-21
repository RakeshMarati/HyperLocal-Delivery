import { setLoading, setError, setOrders, setCurrentOrder, addOrder, clearError } from '../slices/orderSlice';
import api from '../../services/api';

// Create new order
export const createOrder = (orderData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(clearError());

    const response = await api.post('/orders', orderData);

    dispatch(addOrder(response.data.data));

    return { success: true, order: response.data.data };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Failed to create order. Please try again.';
    dispatch(setError(errorMessage));
    return { success: false, error: errorMessage };
  }
};

// Get user's orders
export const fetchMyOrders = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(clearError());

    const response = await api.get('/orders');

    dispatch(setOrders(response.data.data || []));

    return { success: true, orders: response.data.data };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Failed to fetch orders. Please try again.';
    dispatch(setError(errorMessage));
    return { success: false, error: errorMessage };
  }
};

// Get order by ID
export const fetchOrderById = (orderId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(clearError());

    const response = await api.get(`/orders/${orderId}`);

    dispatch(setCurrentOrder(response.data.data));

    return { success: true, order: response.data.data };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Failed to fetch order. Please try again.';
    dispatch(setError(errorMessage));
    return { success: false, error: errorMessage };
  }
};

