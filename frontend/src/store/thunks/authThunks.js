import { setLoading, setError, loginSuccess, registerSuccess } from '../slices/authSlice';
import { setAddress } from '../slices/locationSlice';
import api from '../../services/api';

// Register user
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const response = await api.post('/auth/register', userData);

    dispatch(registerSuccess({
      user: {
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
        role: response.data.role,
      },
      token: response.data.token,
    }));

    return { success: true };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
    dispatch(setError(errorMessage));
    return { success: false, error: errorMessage };
  }
};

// Login user
export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const response = await api.post('/auth/login', credentials);

    dispatch(loginSuccess({
      user: {
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
        role: response.data.role,
      },
      token: response.data.token,
    }));

    return { success: true };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
    dispatch(setError(errorMessage));
    return { success: false, error: errorMessage };
  }
};

// Get current user
export const getCurrentUser = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await api.get('/auth/me');
    
    dispatch(loginSuccess({
      user: response.data,
      token: localStorage.getItem('token'),
    }));

    // Sync address to location slice if available
    if (response.data.address) {
      dispatch(setAddress(response.data.address));
    }

    return { success: true };
  } catch (error) {
    dispatch(setError(null));
    return { success: false };
  }
};

