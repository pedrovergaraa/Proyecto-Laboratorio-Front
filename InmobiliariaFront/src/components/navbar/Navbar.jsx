import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Importa el archivo CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navList">
        <li className="navItem">
          <a href="#" className="navLink">Inicio</a>
        </li>
        <li className="navItem">
          <Link to="/login" className="navLink">Login</Link>
        </li>
        <li className="navItem">
          <Link to="/register" className="navLink">Register</Link>
        </li>
        <li className="navItem">
          <a href="#" className="navLink">Contacto</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
