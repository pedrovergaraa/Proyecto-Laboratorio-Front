import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import WeatherApi from '../../components/weather/WeatherApi'; // Importa tu componente de clima
import { AuthenticationContext } from '../../services/authenticationContext/auth.context';

const Protected = () => {
  const { user } = useContext(AuthenticationContext); 
  const location = useLocation(); 

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Verificación para páginas de autenticación
  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  // Redirecciona a "/properties" si el usuario está autenticado y está en la ruta raíz "/"
  if (location.pathname === "/") {
    return <Navigate to="/properties" />;
  }

  return (
    <div className={isAuthPage ? 'no-background' : 'background'}>
      {!isAuthPage && <Navbar />}
      {/* El componente de clima solo aparece si no estás en login/register */}
      {!isAuthPage && <WeatherApi />} 
      <Outlet />
    </div>
  );
};

export default Protected;
