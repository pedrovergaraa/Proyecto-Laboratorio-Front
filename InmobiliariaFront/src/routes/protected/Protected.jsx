import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import WeatherApi from '../../components/weather/WeatherApi'; 
import { AuthenticationContext } from '../../context/authenticationContext/auth.context';

const Protected = () => {
  const { user } = useContext(AuthenticationContext); 
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const isAuthPage = ["/login", "/register"].includes(location.pathname);
  const themeClass = isAuthPage ? '' : (localStorage.getItem("theme") === "light" ? 'background-light' : 'background-dark');

  return (
    <div className={`${themeClass}`}>
      {!isAuthPage && <Navbar />}
      {!isAuthPage && <WeatherApi />}
      {!isAuthPage && <ToggleTheme isAuthPage={isAuthPage} />}
      <Outlet />
    </div>
  );
};

export default Protected;
