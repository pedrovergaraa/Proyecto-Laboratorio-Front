
import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { AuthenticationContext } from '../../services/authenticationContext/auth.context';

const Protected = () => {
  const { user } = useContext(AuthenticationContext); 
  const location = useLocation(); 

  if (!user) {
    return <Navigate to="/login" />;
  }

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
