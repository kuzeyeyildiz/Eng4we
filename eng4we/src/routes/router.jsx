//src/routes/router.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Streaks from "../pages/Streaks";
import VolunteerDashboard from "../pages/VolunteerDashboard";
import { useAuthRole } from "../context/AuthRoleContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthRole();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

const RoleBasedRedirect = () => {
  const { user, role, loading } = useAuthRole();

  console.log(
    "RoleBasedRedirect - User:",
    user?.uid,
    "Role:",
    role,
    "Loading:",
    loading
  );

  // Show loading while we're still determining authentication/role
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If we have a user but no role yet, show a different loading state
  if (user && !role) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Setting up your account...</p>
        </div>
      </div>
    );
  }

  // Redirect based on role
  if (role === "volunteer") {
    console.log("Redirecting to volunteer dashboard");
    return <Navigate to="/volunteer" replace />;
  } else if (role === "user") {
    console.log("Redirecting to user dashboard");
    return <Navigate to="/dashboard" replace />;
  } else {
    // If role is something unexpected, redirect to login
    console.error("Unexpected role:", role);
    return <Navigate to="/login" replace />;
  }
};

const AppRouter = () => {
  const { user, loading } = useAuthRole();

  return (
    <Routes>
      {/* Public Routes - Only accessible when NOT logged in */}
      <Route
        path="/login"
        element={user && !loading ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/signup"
        element={user && !loading ? <Navigate to="/" replace /> : <Signup />}
      />

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

      {/* Root route - Redirects based on role */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <RoleBasedRedirect />
          </PrivateRoute>
        }
      />

      {/* Catch all unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
