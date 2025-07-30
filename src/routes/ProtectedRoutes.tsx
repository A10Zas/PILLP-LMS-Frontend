import React from 'react';
import { Navigate, useLocation } from 'react-router';

// Define the types of authenticated users
type AuthType = 'user' | 'partner' | 'manager' | 'hr' | 'hr-manager';

const ProtectedRoutes = ({
  children,
  requiredRole, // Optional role requirement
}: {
  children: React.ReactNode;
  requiredRole?: AuthType;
}) => {
  const location = useLocation();

  // Check authentication and role
  const isAuthenticated = () => {
    const user = localStorage.getItem('user');
    const partner = localStorage.getItem('partner');
    const manager = localStorage.getItem('manager');
    const hr = localStorage.getItem('hr');
    const hrManager = localStorage.getItem('hr-manager');

    if (!user && !partner && !manager && !hr && !hrManager) return false;

    if (requiredRole) {
      switch (requiredRole) {
        case 'user':
          return !!user;
        case 'partner':
          return !!partner;
        case 'manager':
          return !!manager;
        case 'hr':
          return !!hr;
        case 'hr-manager':
          return !!hrManager;
        default:
          return false;
      }
    }

    return true;
  };

  console.log('Location:', location);

  if (!isAuthenticated()) {
    // Redirect to login page with the current location they came from
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
