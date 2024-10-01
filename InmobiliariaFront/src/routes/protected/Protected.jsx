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

  if (location.pathname === "/") {
    return <Navigate to="/properties" />;
  }

  return (
    <div className={isAuthPage ? 'no-background' : 'background'}>
      {!isAuthPage && <Navbar />}
      {!isAuthPage && <WeatherApi />}
      <Outlet />
    </div>
  );
};

export default Protected;
