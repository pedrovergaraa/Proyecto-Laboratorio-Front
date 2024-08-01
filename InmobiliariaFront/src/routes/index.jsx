import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/login';
import Register from '../components/register/Register';
import Users from '../components/users/Users';
import Navbar from '../components/navbar/Navbar';
import React from 'react';

function HandleRoutes() {
  return (
    <>  
    <Router>
    <Navbar></Navbar>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    </>
  );
}

export default HandleRoutes;
