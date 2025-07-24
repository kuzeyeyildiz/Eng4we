// src/context/AuthRoleContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase"; // import auth instance
import { getUserRole } from "../services/firebaseService"; // import your role fetcher

const AuthRoleContext = createContext();

export function AuthRoleProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    console.log("Subscribing to auth changes");

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("Auth state changed:", firebaseUser);

      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const fetchedRole = await getUserRole(firebaseUser.uid);
          console.log("Role fetched:", fetchedRole);
          setRole(fetchedRole);
        } catch (err) {
          console.error("Error fetching role:", err);
          setError(err);
          setRole(null);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthRoleContext.Provider value={{ user, role, loading, error }}>
      {children}
    </AuthRoleContext.Provider>
  );
}

export function useAuthRole() {
  return useContext(AuthRoleContext);
}
