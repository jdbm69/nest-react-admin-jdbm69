/**
 * Actualización de rutas protegidas y autenticación para React Router v6
 *
 * - Se reemplaza el uso de <Route> con render props y <Redirect> por componentes funcionales que usan <Navigate> y <Outlet>.
 * - PrivateRoute ahora verifica el usuario autenticado y roles, redirigiendo con <Navigate> si no cumple condiciones.
 * - AuthRoute redirige al home si ya hay usuario autenticado.
 * - Uso de <Outlet> para renderizar las rutas hijas anidadas dentro de cada guard.
 * - Mejora la compatibilidad con React Router v6 y simplifica la gestión de rutas protegidas.
 */

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
