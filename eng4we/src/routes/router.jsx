// src/routes/router.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Streaks from "../pages/Streaks";
import VolunteerDashboard from "../pages/VolunteerDashboard";
import { useAuthRole } from "../context/AuthRoleContext";

// Shared loading component
const LoadingScreen = ({ message = "Loading..." }) => (
  <div className="flex justify-center items-center h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  </div>
);

// Route guard
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthRole();

  if (loading) return <LoadingScreen />;
  return user ? children : <Navigate to="/login" replace />;
};

// Redirect based on role
const RoleBasedRedirect = () => {
  const { user, role, loading } = useAuthRole();

  console.log(
    "RoleBasedRedirect - User:",
    user?.uid,
    "Role:",
    role,
    "Loading:",
    loading,
  );

  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  if (user && !role)
    return <LoadingScreen message="Setting up your account..." />;

  if (role === "volunteer") {
    console.log("Redirecting to volunteer dashboard");
    return <Navigate to="/volunteer" replace />;
  } else if (role === "user") {
    console.log("Redirecting to user dashboard");
    return <Navigate to="/dashboard" replace />;
  } else {
    console.error("Unexpected role:", role);
    return <Navigate to="/login" replace />;
  }
};

// Main router
const AppRouter = () => {
  // Remove the loading check here - let individual components handle loading states
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/streaks"
        element={
          <PrivateRoute>
            <Streaks />
          </PrivateRoute>
        }
      />
      <Route
        path="/volunteer"
        element={
          <PrivateRoute>
            <VolunteerDashboard />
          </PrivateRoute>
        }
      />

      {/* Root path: redirects to dashboard based on role */}
      <Route path="/" element={<RoleBasedRedirect />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
