/**
 * Actualización principal del componente App para React Router v6
 *
 * - Se reemplaza <Switch> por <Routes> y se ajusta la sintaxis de rutas.
 * - Uso de rutas anidadas con <Route element={...}> para proteger rutas con guards.
 * - Separación de rutas protegidas normales y rutas con roles (admin).
 * - Importación y uso actualizado de PrivateRoute y AuthRoute desde 'Guards'.
 * - Mantiene lógica de autenticación y refresco de token con useAuth.
 * - Mejora la legibilidad y compatibilidad con la nueva API de React Router.
 */

import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthRoute, PrivateRoute } from './Guards';
import useAuth from './hooks/useAuth';
import Contents from './pages/Contents';
import Courses from './pages/Courses';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Users from './pages/Users';
import authService from './services/AuthService';

export default function App() {
  const { authenticatedUser, setAuthenticatedUser } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  const authenticate = async () => {
    try {
      const authResponse = await authService.refresh();
      setAuthenticatedUser(authResponse.user);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    if (!authenticatedUser) {
      authenticate();
    } else {
      setIsLoaded(true);
    }
  }, []);

  return isLoaded ? (
    <Router>
      <Routes>
        {/* Rutas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<Contents />} />
        </Route>

        {/* Rutas protegidas solo para admin */}
        <Route element={<PrivateRoute roles={['admin']} />}>
          <Route path="/users" element={<Users />} />
        </Route>

        {/* Rutas públicas */}
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  ) : null;
}
