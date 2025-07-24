import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import {
  signup,
  login,
  logout,
  loginWithGoogle,
} from "../services/authService";

// AuthContext provides current user and auth actions globally
const AuthContext = createContext();

// AuthProvider manages auth state and provides helper functions
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes (user logged in/out)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // Signup handler
  const register = (email, password) => signup(email, password);

  // Login handler
  const signin = (email, password) => login(email, password);

  // Logout handler
  const signout = () => logout();

  // Google login handler
  const googleLogin = () => loginWithGoogle();

  // Context value with user state and auth actions
  const value = {
    user,
    loading,
    register,
    signin,
    signout,
    googleLogin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {/* Wait until loading finishes before rendering children */}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming AuthContext easily
export const useAuthContext = () => useContext(AuthContext);
