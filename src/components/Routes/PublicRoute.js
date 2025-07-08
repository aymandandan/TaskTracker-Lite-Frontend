import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // If user is already authenticated and not on reset-password page, redirect them to the dashboard
  if (isAuthenticated && !location.pathname.startsWith('/reset-password')) {
    return <Navigate to={from} replace />;
  }

  return children;
};

export default PublicRoute;
