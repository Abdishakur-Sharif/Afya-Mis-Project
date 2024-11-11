import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authcontext'; // Use the Auth context

const ProtectedRoute = ({ children, roleRequired }) => {
  const { user, role, loading } = useAuth(); // Extract user, role, and loading state
  const [isLoading, setIsLoading] = useState(true);

  // Wait for loading state to complete (check for initial role fetch)
  useEffect(() => {
    if (!loading) {
      setIsLoading(false); // Stop loading once we have user data
    }
  }, [loading]);

  // If the user is loading or authentication is still being checked, show nothing or a loading indicator
  if (isLoading) {
    return <div>Loading...</div>; // Optionally, show a loading spinner
  }

  // If the user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If the user doesn't have the required role, redirect to home page
  if (role && roleRequired && role !== roleRequired) {
    return <Navigate to="/home" />;
  }

  // If everything is fine, render the protected component (children)
  return children;
};

export default ProtectedRoute;
