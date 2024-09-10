
import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { AuthenticationContext } from '../../services/authenticationContext/auth.context';

const Protected = () => {
  const { user } = useContext(AuthenticationContext); // Asumimos que 'user' contiene el estado del usuario autenticado.
  const location = useLocation(); // Usamos useLocation para obtener la ruta actual.

  // Redirige a la página de login si el usuario no está autenticado
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Determina si la ruta actual es la página de login o register
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className={isAuthPage ? 'no-background' : 'background'}>
      {/* Muestra el navbar solo si no estamos en las páginas de login o register */}
      {!isAuthPage && <Navbar />}
      {/* Renderiza las rutas hijas definidas en `createBrowserRouter` */}
      <Outlet />
    </div>
  );
};

export default Protected;
