import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('auth') === 'true'; // Verifica se o usuário está autenticado

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
