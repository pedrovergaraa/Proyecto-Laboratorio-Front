import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/login';
import Register from '../components/register/Register';
import Users from '../components/users/Users';
import Navbar from '../components/navbar/Navbar';
<<<<<<< HEAD
// import React from 'react';
=======
import React from 'react';
>>>>>>> main
import Properties from '../components/properties/Properties';
import Tenants from '../components/tenants/Tenants';
import Contracts from '../components/contracts/Contracts';
import Owners from '../components/owners/Owners';
<<<<<<< HEAD
=======
import "./index.css"
>>>>>>> main

function HandleRoutes() {

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
<<<<<<< HEAD
    <>  
    <Router>
    <Navbar></Navbar>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/tenants" element={<Tenants />} />
        <Route path="/contracts" element={<Contracts/>} />
        <Route path="/owners" element={<Owners />} />
      </Routes>
    </Router>
=======
    <>
   <div className={isAuthPage ? 'no-background' : 'background'}>
      <Router>
        {location.pathname !== "/login" && location.pathname !== "/register" && <Navbar />}
        <div >
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/owners" element={<Owners />} />
        </Routes>
        </div>
      </Router>
     </div>
>>>>>>> main
    </>
  );
}

export default HandleRoutes;
