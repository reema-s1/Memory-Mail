

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, getToken } = useAuth();

  if (!user || !getToken()) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
