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

  // Redirecciona a "/properties" si el usuario está autenticado y está en la ruta raíz "/"
  if (location.pathname === "/") {
    return <Navigate to="/properties" />;
  }

  return (
    <div className={isAuthPage ? 'no-background' : 'background'}>
      {!isAuthPage && <Navbar />}
      <Outlet />
    </div>
  );
};

export default Protected;
