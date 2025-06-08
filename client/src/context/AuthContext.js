import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:3001';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const res = await axios.get('/api/auth/user');
      setUser(res.data);
      setError(null);
    } catch (err) {
      console.error('Error loading user:', err);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setError(err.response?.data?.msg || 'Error loading user data');
    }
    setLoading(false);
  };

  const register = async (name, email, password) => {
    try {
      setError(null);
      const res = await axios.post('/api/auth/register', {
        name,
        email,
        password,
      });
      const { token } = res.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await loadUser();
      return res.data;
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err.response?.data?.msg || 
        err.response?.data?.errors?.[0]?.msg || 
        'Registration failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const res = await axios.post('/api/auth/login', {
        email,
        password,
      });
      const { token } = res.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await loadUser();
      return res.data;
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.msg || 
        err.response?.data?.errors?.[0]?.msg || 
        'Login failed. Please check your credentials.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setError(null);
  };

  const updateProfile = async (profileData) => {
    try {
      setError(null);
      const res = await axios.put('/api/users/profile', profileData);
      setUser({ ...user, ...res.data });
      return res.data;
    } catch (err) {
      console.error('Profile update error:', err);
      const errorMessage = err.response?.data?.msg || 
        err.response?.data?.errors?.[0]?.msg || 
        'Failed to update profile. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 