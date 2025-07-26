// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate, Link } from "react-router-dom";
import { useAuthRole } from "../context/AuthRoleContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();
  const { user, role, loading } = useAuthRole();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user && !loading && role) {
      console.log("User already logged in, redirecting based on role:", role);
      if (role === "volunteer") {
        navigate("/volunteer", { replace: true });
      } else if (role === "user") {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [user, role, loading, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoggingIn(true);

    try {
      console.log("Attempting login...");
      await signInWithEmailAndPassword(auth, email, password);

      // Don't navigate immediately - let the useEffect handle it
      // after the role is fetched
      console.log("Login successful, waiting for role...");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
      setIsLoggingIn(false);
    }
  };

  // Handle navigation after role is available
  useEffect(() => {
    if (user && !loading && role && isLoggingIn) {
      console.log("Role available after login:", role);
      setIsLoggingIn(false);

      if (role === "volunteer") {
        navigate("/volunteer", { replace: true });
      } else if (role === "user") {
        navigate("/dashboard", { replace: true });
      } else {
        console.error("Unknown role:", role);
        setError("Invalid user role. Please contact support.");
      }
    }
  }, [user, role, loading, isLoggingIn, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-blue-200">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoggingIn || loading}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoggingIn || loading}
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isLoggingIn || loading}
            className="bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingIn ? "Logging in..." : "Log In"}
          </button>

          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
