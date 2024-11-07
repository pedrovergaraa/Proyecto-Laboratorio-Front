import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css'; 
import { AuthenticationContext } from "../../context/authenticationContext/auth.context";
import { ThemeContext } from '../../context/themeContext/theme.context';
import finalLogo from '../../assets/images/final-logo.png';
import newLogo from '../../assets/images/logo-dark4.png';
import ModalForm from "../../shared-components/modal/modalForm";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleLogout } = useContext(AuthenticationContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    setIsOpen(false);
    handleLogout();
    navigate("/login");
  };

  const navbarThemeClass = theme === "light" ? "navbar-light" : "navbar-dark";
  const navLinkThemeClass = theme === "light" ? "navLink-light" : "navLink-dark";
  const darkLogo = theme === "light" ? finalLogo : newLogo;


  const isUserTenantRoute = location.pathname === '/user-tenant';
  const isUserLandLordRoute = location.pathname === '/user-landlord';

  return (
    <nav className={`navbar ${navbarThemeClass}`}>
      <div className="logo">
        <img src={darkLogo} alt="Inmobiliaria Logo" />
      </div>

      {!isUserTenantRoute && !isUserLandLordRoute ? (
        <ul className="navList">
           <li className="navItem">
          <Link to="./" className={`navLink ${navLinkThemeClass}`}>INMOBILIARIA</Link>
        </li>
          <li className="navItem">
            <Link to="/properties" className={`navLink ${navLinkThemeClass}`}>PROPIEDADES</Link>
          </li>
          <li className="navItem">
            <Link to="/tenants" className={`navLink ${navLinkThemeClass}`}>INQUILINOS</Link>
          </li>
          <li className="navItem">
            <Link to="/contracts" className={`navLink ${navLinkThemeClass}`}>CONTRATOS</Link>
          </li>
          <li className="navItem">
            <Link to="/landlord" className={`navLink ${navLinkThemeClass}`}>PROPIETARIOS</Link>
          </li>
          <li className="navItem">
            <Link to="/payments" className={`navLink ${navLinkThemeClass}`}>PAGOS</Link>
          </li>
        </ul>
        
      ) : isUserTenantRoute ? (
        <h2 className={`userTenantTitle ${navLinkThemeClass}`}>Bienvenido, Inquilino</h2>
      ) : isUserLandLordRoute ? (
        <h2 className={`userLandLordTitle ${navLinkThemeClass}`}>Bienvenido, Propietario</h2>
      ) : null}
      <ul className="navList">
        <li className="navItem" onClick={() => setIsOpen(true)}>
          <span className={`navLink ${navLinkThemeClass}`}>CERRAR SESIÓN</span>
        </li>
      </ul>
      <ModalForm isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
        <div>
          <p>¿Estás seguro de que deseas cerrar sesión?</p>
          <div className="button-container">
            <button className="cancel-btn" onClick={() => setIsOpen(false)}>
              Cancelar
            </button>
            <button className="confirm-btn" onClick={handleSignOut}>
              Aceptar
            </button>
          </div>
        </div>
      </ModalForm>
    </nav>
  );
};

export default Navbar;