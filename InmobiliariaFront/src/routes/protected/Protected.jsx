import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import WeatherApi from '../../components/weather/WeatherApi'; 
import { AuthenticationContext } from '../../services/authenticationContext/auth.context';

const Protected = () => {
  const { user } = useContext(AuthenticationContext); 
  const location = useLocation();

  // Si el usuario no está autenticado, redirige a /login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Verifica si la página actual es login o register
  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  // Si el usuario está autenticado y está en la ruta raíz "/", redirige a "/properties"
  if (location.pathname === "/") {
    return <Navigate to="/properties" />;
  }

  return (
    <div className={isAuthPage ? 'no-background' : 'background'}>
      {/* Solo renderiza el Navbar si no estás en login/register */}
      {!isAuthPage && <Navbar />}
      {/* El componente de clima solo aparece si no estás en login/register */}
      {!isAuthPage && <WeatherApi />}
      <Outlet />
    </div>
  );
};

export default Protected;
