import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Importa el archivo CSS

const Navbar = () => {
  return (
    <nav className="navbar">
  <div className="logo">
    <a href="#">LOGO</a>
  </div>
  <ul className="navList">
    <li className="navItem">
      <Link to="/propiedades" className="navLink">Propiedades</Link>
    </li>
    <li className="navItem">
      <Link to="/inquilinos" className="navLink">Inquilinos</Link>
    </li>
    <li className="navItem">
      <Link to="/contratos" className="navLink">Contratos</Link>
    </li>
    <li className="navItem">
      <Link to="/propietarios" className="navLink">Propietarios</Link>
    </li>
  </ul>
</nav>

  );
};

export default Navbar;
