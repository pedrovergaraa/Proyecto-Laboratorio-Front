// Protected.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';

const Protected = () => {
  const isAuthenticated = true; // Aquí puedes agregar la lógica de autenticación real

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className={isAuthPage ? 'no-background' : 'background'}>
      {!isAuthPage && <Navbar />}
      {/* Renderiza las rutas hijas definidas en `createBrowserRouter` */}
      <Outlet />
    </div>
  );
};

export default Protected;
