import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthenticationContext } from './context/AuthenticationContext';

export function PrivateRoute({ roles }: { roles?: string[] }) {
  const { authenticatedUser } = useContext(AuthenticationContext);

  if (!authenticatedUser) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(authenticatedUser.role))
    return <Navigate to="/" replace />;
  return <Outlet />;
}

export function AuthRoute() {
  const { authenticatedUser } = useContext(AuthenticationContext);
  return authenticatedUser ? <Navigate to="/" replace /> : <Outlet />;
}
