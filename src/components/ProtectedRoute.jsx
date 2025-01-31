import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children, requiredRole, requiredPermission }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  if (!token || !user) {
    toast.error('Please login to access this page');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    toast.error('You do not have permission to access this page');
    return <Navigate to="/homepage" replace />;
  }

  if (requiredPermission && !user.permissions?.includes(requiredPermission)) {
    toast.error('You do not have permission to access this feature');
    return <Navigate to="/homepage" replace />;
  }

  return children;
};

export default ProtectedRoute; 