import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Importa el archivo CSS

import logoImage from '../../assets/images/Logo-Inmobiliaria.png';


const Navbar = () => {
  return (
    <nav className="navbar">
  <div className='logo'>
  <img src={logoImage} alt="Inmobiliaria Logo" />
  </div>
  <ul className="navList">
    <li className="navItem">
      <Link to="/properties" className="navLink">PROPIEDADES</Link>
    </li>
    <li className="navItem">
      <Link to="/tenants" className="navLink">INQUILINOS</Link>
    </li>
    <li className="navItem">
      <Link to="/contracts" className="navLink">CONTRATOS</Link>
    </li>
    <li className="navItem">
      <Link to="/owners" className="navLink">PROPIETARIOS</Link>
    </li>
  </ul>
</nav>


  );
};

export default Navbar;
