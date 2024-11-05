import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthenticationContext } from "../../context/authenticationContext/auth.context";
import { ThemeContext } from "../../context/themeContext/theme.context";
import Navbar from "../../components/navbar/Navbar";
import WeatherApi from "../../components/weather/WeatherApi";
import ToggleTheme from "../../components/ui/toggleTheme/ToggleTheme";

const Protected = () => {
  const { user } = useContext(AuthenticationContext);
  const { theme } = useContext(ThemeContext);
  const location = useLocation();

  // Redireccionar si el usuario no está autenticado
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  // Rutas específicas para los roles
  const tenantRoutes = ['/user-tenant'];
  const landlordRoutes = ['/user-landlord'];

  const currentPath = location.pathname;

  // Redirigir a / si el rol no tiene acceso a la ruta actual
  if (user.role === 'tenant' && !tenantRoutes.includes(currentPath)) {
    return <Navigate to="/user-tenant" />;
  }
  if (user.role === 'landlord' && !landlordRoutes.includes(currentPath)) {
    return <Navigate to="/user-landlord" />;
  }

  // Estilo dinámico basado en el tema (claro/oscuro)
  const backgroundClass = theme === 'light' ? 'background-light' : 'background-dark';

  return (
    <>
      {!isAuthPage && (
        <div className={backgroundClass}>
          <Navbar />
          <WeatherApi />
          <ToggleTheme />
          <Outlet /> 
        </div>
      )}
      {isAuthPage && <Outlet />} 
    </>
  );
};

export default Protected;
