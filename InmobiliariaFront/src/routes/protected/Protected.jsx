import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthenticationContext } from "../../context/authenticationContext/auth.context";
import { ThemeContext } from "../../context/themeContext/theme.context";
<<<<<<< HEAD
=======
import Navbar from '../../components/navbar/Navbar'
import WeatherApi from '../../components/weather/WeatherApi'
import ToggleTheme from '../../components/ui/toggleTheme/ToggleTheme'
>>>>>>> origin/main

const ProtectedRoute = () => {
  const { user } = useContext(AuthenticationContext);
  const { theme } = useContext(ThemeContext);
  const location = useLocation();

  if (!user) {
<<<<<<< HEAD
    return <Navigate to="/login" state={{ from: location }} />;
=======
    return <Navigate to="/login" state={{ from: location, message: "Debes iniciar sesión para acceder a esta página." }} />;
>>>>>>> origin/main
  }

  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  // Estilo dinámico basado en el tema (claro/oscuro)
  const backgroundClass = theme === 'light' ? 'background-light' : 'background-dark';

    return (
      <>
<<<<<<< HEAD
          {!isAuthPage && (
=======
          { (
>>>>>>> origin/main
              <div className={backgroundClass}>
                  <Navbar /> 
                  <WeatherApi /> {/* Si es necesario */}
                  <ToggleTheme /> {/* El botón de cambio de tema */}
                  <Outlet /> {/* Rutas hijas */}
              </div>
          )}
<<<<<<< HEAD
          {isAuthPage && <Outlet />} {/* Si es login/register, solo se renderiza el Outlet */}
=======
          {/* { <Outlet />} Si es login/register, solo se renderiza el Outlet */}
>>>>>>> origin/main
      </>
  );
};

export default ProtectedRoute;
