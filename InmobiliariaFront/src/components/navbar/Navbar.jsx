import React, {useState, useContext} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import './Navbar.css'; 
import { AuthenticationContext } from "../../services/authenticationContext/auth.context";
import logoImage from '../../assets/images/Logo-Inmobiliaria.png';
import ModalForm from "../../shared-components/modal/modalForm"

const Navbar = () => {
  const [isOpen,setIsOpen] = useState(false)
  const {handleLogout} = useContext(AuthenticationContext)
  const navigate = useNavigate()

  const handleSignOut = () =>{
    setIsOpen(false)
    handleLogout()
    navigate("/login")
  }
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
      <Link to="/owners" className="navLink">INMOBILIARIA</Link>
    </li>
    <li className="navItem">
      <Link to="/landlord" className="navLink">PROPIETARIOS</Link>
    </li>
    <li className="navItem" onClick={()=>setIsOpen(true)}>
      <span className="navLink logout-btn" >CERRAR SESIÓN</span>
    </li>
    <ModalForm isOpen={isOpen} onClose={()=>setIsOpen(!isOpen)}>
      <div>
        <p>
          ¿Estas seguro de que deseas cerrar sesión?
        </p>
        <div className='button-container'>
          <button className='cancel-btn' onClick={()=>setIsOpen(false)}>
            Cancelar
          </button>
          <button className='confirm-btn' onClick={handleSignOut}>
            Aceptar
          </button>
        </div>
      </div>
    </ModalForm>
  </ul>
</nav>


  );
};

export default Navbar;
