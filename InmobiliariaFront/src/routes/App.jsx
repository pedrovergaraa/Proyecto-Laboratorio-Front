// App.js
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from '../components/login';
import Register from '../components/register/Register';
import Properties from '../components/properties/Properties';
import Tenants from '../components/tenants/Tenants';
import Contracts from '../components/contracts/Contracts';
import Owners from '../components/owners/Owners';
import Landlord from '../components/landlord/Landlord';
import NotFound from './notFound/NotFound'; // Componente para la página 404
import Protected from './protected/Protected'; // Componente para proteger rutas
import { ThemeContextProvider } from '../services/themeContext/theme.context';
// import { AuthenticationContextProvider } from '../services/authContext/auth.context'; // Proveedor de contexto de autenticación
import "./App.css";
import ToggleTheme from '../components/ui/toggleTheme/ToggleTheme';
import WeatherApi from '../components/weather/WeatherApi';
import { AuthenticationContextProvider } from '../services/authenticationContext/auth.context';
import UsersList from '../components/users/Users';



const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Protected />, // Rutas protegidas que requieren autenticación
      children: [
        {
          path: "/properties",
          element: <Properties />,
        },
        {
          path: "/tenants",
          element: <Tenants />,
        },
        {
          path: "/contracts",
          element: <Contracts />,
        },
        {
          path: "/owners",
          element: <Owners />,
        },
        {
          path: "/landlord",
          element: <Landlord />,
        },
        {
          path: "/users",
          element: <UsersList />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "*",
      element: <NotFound />, // Ruta para manejar 404
    },
  ]);
  return (
    <div className="d-flex flex-column align-items-center">
      <AuthenticationContextProvider>
      <ThemeContextProvider>
        <div className="app-container">
          <ToggleTheme className="theme-toggle-button" /> {/* Botón en contenedor superior */}
          <RouterProvider router={router} />
          <WeatherApi /> {/* Componente de clima siempre visible */}
        </div>
      </ThemeContextProvider>
      </AuthenticationContextProvider>
    </div>
  );
};

export default App;
