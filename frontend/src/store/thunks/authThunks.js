import { setLoading, setError, loginSuccess, registerSuccess, updateUserProfile } from '../slices/authSlice';
import { setAddress, clearAddress } from '../slices/locationSlice';
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
    dispatch(setLoading(false));

    return { success: true };
  } catch (error) {
    console.error('Registration error:', error);
    let errorMessage = 'Registration failed. Please try again.';
    
    if (error.response) {
      // Server responded with error
      errorMessage = error.response.data?.message || error.response.data?.error || `Server error: ${error.response.status}`;
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = 'Unable to connect to server. Please check your internet connection and ensure the backend is running.';
    } else {
      // Something else happened
      errorMessage = error.message || 'An unexpected error occurred';
    }
    
    dispatch(setError(errorMessage));
    dispatch(setLoading(false));
    return { success: false, error: errorMessage };
  }
};

// Login user
export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    // Clear location first to prevent location sharing between users
    dispatch(clearAddress());

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
    
    // Fetch user data to get address if available
    const userResponse = await api.get('/auth/me');
    if (userResponse.data.address && userResponse.data.address.city) {
      dispatch(setAddress(userResponse.data.address));
    }
    
    dispatch(setLoading(false));

    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    let errorMessage = 'Login failed. Please check your credentials.';
    
    if (error.response) {
      errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
    } else if (error.request) {
      errorMessage = 'Unable to connect to server. Please check your internet connection and ensure the backend is running.';
    } else {
      errorMessage = error.message || 'An unexpected error occurred';
    }
    
    dispatch(setError(errorMessage));
    dispatch(setLoading(false));
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
    // Only set address if user has one, otherwise keep location slice empty
    if (response.data.address && response.data.address.city) {
      dispatch(setAddress(response.data.address));
    } else {
      // Clear location if user doesn't have one
      dispatch(clearAddress());
    }
    dispatch(setLoading(false));

    return { success: true };
  } catch (error) {
    dispatch(setError(null));
    dispatch(setLoading(false));
    return { success: false };
  }
};

// Update user profile
export const updateProfile = (profileData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const response = await api.put('/auth/profile', profileData);

    dispatch(updateUserProfile(response.data.user));
    dispatch(setLoading(false));

    return { success: true, user: response.data.user };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to update profile. Please try again.';
    dispatch(setError(errorMessage));
    dispatch(setLoading(false));
    return { success: false, error: errorMessage };
  }
};

