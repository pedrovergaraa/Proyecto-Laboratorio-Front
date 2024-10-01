// App.js
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from '../components/login';
import Register from '../components/register/Register';
import Properties from '../components/properties/Properties';
import Tenants from '../components/tenants/Tenants';
import Contracts from '../components/contracts/Contracts';
import Landlord from '../components/landlord/Landlord';
import NotFound from './notFound/NotFound'; 
import Protected from './protected/Protected'; 
import { ThemeContextProvider } from '../context/themeContext/theme.context';
import "./App.css";
import ToggleTheme from '../components/ui/toggleTheme/ToggleTheme';
import { AuthenticationContextProvider } from '../context/authenticationContext/auth.context';
import UsersList from '../components/users/Users';



const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Protected />, 
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
      element: <NotFound />, 
    },
  ]);
  return (
    <div className="d-flex flex-column align-items-center">
      <AuthenticationContextProvider>
      <ThemeContextProvider>
        <div className="app-container">
          <ToggleTheme className="theme-toggle-button" /> 
          <RouterProvider router={router} />
        </div>
      </ThemeContextProvider>
      </AuthenticationContextProvider>
    </div>
  );
};

export default App;
