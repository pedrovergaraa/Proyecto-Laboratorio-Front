import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/login';
import Register from '../components/register/Register';
import Users from '../components/users/Users';
import Navbar from '../components/navbar/Navbar';
import React from 'react';
import Properties from '../components/properties/Properties';
import Tenants from '../components/tenants/Tenants';
import Contracts from '../components/contracts/Contracts';
import Owners from '../components/owners/Owners';

function HandleRoutes() {
  return (
    <>
      <Router>
        {/* Mostrar Navbar solo si no estás en /login o /register */}
        {location.pathname !== "/login" && location.pathname !== "/register" && <Navbar />}
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/owners" element={<Owners />} />
        </Routes>
      </Router>
    </>
  );
}

export default HandleRoutes;
