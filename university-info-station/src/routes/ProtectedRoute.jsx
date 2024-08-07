// src/routes/ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation,useParams } from 'react-router-dom';
import { useUser } from 'context/UserContext'; 

const ProtectedRoute = ({ children }) => {
  const { user } = useUser(); 
  const location = useLocation();
  const params = useParams();
  const { personalId } = params;
  
  if (!user || personalId !== user.personalId) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
