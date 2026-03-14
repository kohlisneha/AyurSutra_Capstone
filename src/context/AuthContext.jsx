import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiGetMe, apiLogin, apiRegister, apiLogout, hasToken } from '../services/api';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check if we have a stored token and restore session
  useEffect(() => {
    const restoreSession = async () => {
      if (!hasToken()) {
        setLoading(false);
        return;
      }

      try {
        const data = await apiGetMe();
        setCurrentUser(data.user);
        setUserData(data.user);
      } catch (error) {
        // Token invalid or expired — clear it
        console.error('Session restore failed:', error);
        apiLogout();
        setCurrentUser(null);
        setUserData(null);
      }
      setLoading(false);
    };

    restoreSession();
  }, []);

  const login = async (email, password) => {
    const data = await apiLogin(email, password);
    setCurrentUser(data.user);
    setUserData(data.user);
    return data;
  };

  const register = async (name, email, password) => {
    const data = await apiRegister(name, email, password);
    setCurrentUser(data.user);
    setUserData(data.user);
    return data;
  };

  const logout = () => {
    apiLogout();
    setCurrentUser(null);
    setUserData(null);
  };

  const refreshUserData = async () => {
    try {
      const data = await apiGetMe();
      setCurrentUser(data.user);
      setUserData(data.user);
    } catch (error) {
      console.error('Refresh user data failed:', error);
    }
  };

  const value = {
    currentUser,
    userData,
    loading,
    login,
    register,
    logout,
    refreshUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
