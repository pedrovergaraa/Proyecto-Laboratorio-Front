import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/login';
import Register from '../components/register/Register';
import Navbar from '../components/navbar/Navbar';
import FrontPage from '../components/frontPage/FrontPage';

const containerStyle = {
  marginTop: '4rem', // Ajusta este valor según la altura de tu Navbar
};

function HandleRoutes() {
  return (
    <>
      <Router>
        <Navbar />
        <div style={containerStyle}>
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default HandleRoutes;
