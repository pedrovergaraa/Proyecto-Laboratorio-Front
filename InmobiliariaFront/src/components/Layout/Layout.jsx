import React, { useContext } from 'react';
import { ThemeContext } from '../../context/themeContext/theme.context';
import Navbar from '../navbar/Navbar'; 
import ToggleTheme from '../ui/toggleTheme/ToggleTheme';
import WeatherApi from '../weather/WeatherApi'; 

const Layout = ({ children }) => {
  const { theme } = useContext(ThemeContext); 
  const backgroundClass = theme === "light" ? "background-light" : "background-dark"; 

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
