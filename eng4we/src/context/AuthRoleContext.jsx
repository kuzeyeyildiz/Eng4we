//src/context/AuthRoleContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { getUserRole } from "../services/firebaseService";

const AuthRoleContext = createContext();

export function AuthRoleProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("Auth state changed:", firebaseUser?.uid);

      if (firebaseUser) {
        setUser(firebaseUser);
        setLoading(true); // Set loading to true while fetching role

        try {
          const fetchedRole = await getUserRole(firebaseUser.uid);
          const normalizedRole = fetchedRole
            ? fetchedRole.trim().toLowerCase()
            : null;
          setRole(normalizedRole);
          console.log(
            "Role fetched for user:",
            firebaseUser.uid,
            "->",
            normalizedRole
          );
        } catch (err) {
          console.error("Error fetching role:", err);
          setRole(null);
        }
      } else {
        console.log("User logged out");
        setUser(null);
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const contextValue = {
    user,
    role,
    loading,
  };

  console.log("AuthRoleContext state:", contextValue);

  return (
    <AuthRoleContext.Provider value={contextValue}>
      {children}
    </AuthRoleContext.Provider>
  );
}

export function useAuthRole() {
  const context = useContext(AuthRoleContext);
  if (!context) {
    throw new Error("useAuthRole must be used within an AuthRoleProvider");
  }
  return context;
}
