import React from 'react';
import Navbar from '../navbar/Navbar'; // Asegúrate de que esté bien configurado
import ToggleTheme from '../ui/toggleTheme/ToggleTheme';
import WeatherApi from '../weather/WeatherApi'; // Asumiendo que también lo tienes

const Layout = ({ children }) => {
  const { theme } = useTheme(); // Obtenemos el tema actual del contexto
  const backgroundClass = theme === "light" ? "background-light" : "background-dark"; // Clase CSS dinámica

  return (
    <div className={backgroundClass}>
      <Navbar />
      <WeatherApi />
      <ToggleTheme />
      {children}
    </div>
  );
};

export default Layout;
