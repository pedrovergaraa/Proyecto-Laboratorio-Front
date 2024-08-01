import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <a href="#" style={styles.navLink}>Inicio</a>
        </li>
        <li style={styles.navItem}>
          {/* <p>Olvidaste tu contraseña? <Link to="/register" className="btn btn-secondary">Register</Link></p> */}
            <Link  to="/login" style={styles.navLink}>Login</Link>
        </li>
        <li style={styles.navItem}>
            <Link  to="/register" style={styles.navLink}>Register</Link>
        </li>
        <li style={styles.navItem}>
          <a href="#" style={styles.navLink}>Contacto</a>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#333',
    padding: '1rem',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  navList: {
    listStyleType: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 1rem',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
  },
};

export default Navbar;
