import React, { useContext, createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

// Create a context
const AuthContext = createContext();

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firebase's built-in auth state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Set user state
      setLoading(false); // Done loading when auth state has been determined
    });

    // Cleanup the listener on unmount
    return unsubscribe;
  }, []);

  // Define the context value
  const value = {
    currentUser,
    userLoggedIn: !!currentUser, // Check if the user is logged in
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Loading...</div>} {/* Show loading or children */}
    </AuthContext.Provider>
  );
}
