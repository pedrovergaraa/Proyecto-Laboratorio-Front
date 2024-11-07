import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from '../components/login';
import Properties from '../components/properties/Properties';
import Tenants from '../components/tenants/Tenants';
import Contracts from '../components/contracts/Contracts';
import Landlord from '../components/landlord/Landlord';
import UserTenant from '../authComponents/userTenant/userTenant';
import UserLandLord from '../authComponents/userLandLord/userLandLord';
import NotFound from './notFound/NotFound'; 
import Protected from './protected/Protected'; 
import { ThemeContextProvider } from '../context/themeContext/theme.context';
import { AuthenticationContextProvider } from '../context/authenticationContext/auth.context';

import "./App.css";
import Owner from '../components/owner/Owner';
import Payments from '../components/payment/Payments';

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Protected />, 
      children: [
        {
          path: "/",
          element: <Owner />,
        },
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
          path: "/payments",
          element: <Payments />,
        },
        {
          path: "/user-tenant",
          element: <UserTenant />,
        },
        {
          path: "/user-landlord",
          element: <UserLandLord />,
        }
      ],
    },
    {
      path: "/login",
      element: <Login />,
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
            <RouterProvider router={router} />
          </div>
        </ThemeContextProvider>
      </AuthenticationContextProvider>
    </div>
  );
};

export default App;
