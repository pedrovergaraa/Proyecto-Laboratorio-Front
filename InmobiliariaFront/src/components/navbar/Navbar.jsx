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
      <Link to="/properties" className="navLink">Propiedades</Link>
    </li>
    <li className="navItem">
      <Link to="/tenants" className="navLink">Inquilinos</Link>
    </li>
    <li className="navItem">
      <Link to="/contracts" className="navLink">Contratos</Link>
    </li>
    <li className="navItem">
      <Link to="/owners" className="navLink">Propietarios</Link>
    </li>
  </ul>
</nav>


  );
};

export default Navbar;
