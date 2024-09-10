import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

import finalLogo from '../../assets/images/final-logo.png'


const Navbar = () => {
  return (
    <nav className="navbar">
  <div className='logo'>
  <img src={finalLogo} alt="Inmobiliaria Logo" />
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
      <Link to="/owners" className="navLink">INMOBILIARIA</Link>
    </li>
    <li className="navItem">
      <Link to="/landlord" className="navLink">PROPIETARIOS</Link>
    </li>
  </ul>
</nav>


  );
};

export default Navbar;

