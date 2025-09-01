// src/pages/Signup.jsx
import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import { useNavigate, Link } from "react-router-dom";
import { useAuthRole } from "../context/AuthRoleContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

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

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setIsSigningUp(true);

    try {
      console.log("Attempting signup...");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const newUser = userCredential.user;
      console.log("User created:", newUser.uid);

      // Create user profile with default role "user"
      await setDoc(doc(db, "users", newUser.uid), {
        name: name,
        email: email,
        role: "user", // Default role for all new signups
        createdAt: new Date().toISOString(),
        uid: newUser.uid,
      });

      console.log("User profile created with default role 'user'");

      // The useAuthRole context should pick up the new user and role
      // The useEffect below will handle navigation once role is available
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message);
      setIsSigningUp(false);
    }
  };

  // Handle navigation after role is available
  useEffect(() => {
    if (user && !loading && role && isSigningUp) {
      console.log("Role available after signup:", role);
      setIsSigningUp(false);

      if (role === "volunteer") {
        navigate("/volunteer", { replace: true });
      } else if (role === "user") {
        navigate("/dashboard", { replace: true });
      } else {
        console.error("Unknown role:", role);
        setError("Invalid user role. Please contact support.");
      }
    }
  }, [user, role, loading, isSigningUp, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <form
        onSubmit={handleSignup}
        className="flex flex-col w-full max-w-md gap-6 bg-white p-8 rounded-2xl shadow-lg border border-blue-200"
      >
        <h2 className="text-3xl font-semibold text-blue-700 text-center">
          Sign Up
        </h2>
        <input
          type="text"
          placeholder="Full Name"
          className="border border-blue-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isSigningUp || loading}
        />
        <input
          type="email"
          placeholder="Email"
          className="border border-blue-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSigningUp || loading}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-blue-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isSigningUp || loading}
        />
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <button
          type="submit"
          disabled={isSigningUp || loading}
          className="bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSigningUp ? "Signing up..." : "Sign Up"}
        </button>
        <span className="text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline cursor-pointer font-medium"
          >
            Sign in here
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
