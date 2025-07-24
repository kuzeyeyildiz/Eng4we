// Firebase Auth Service: handles login, signup, logout, Google login

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";

// Sign up with email and password
export const signup = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Log in with email and password
export const login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Log out
export const logout = async () => {
  return await signOut(auth);
};

// ✅ Google login function
export const loginWithGoogle = async () => {
  return await signInWithPopup(auth, googleProvider);
};
