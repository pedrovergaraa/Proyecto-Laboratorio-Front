// src/components/Login.jsx
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; 
import loginImage from '../../assets/images/login-image.webp'; 

function Login() {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    dni: false,
    password: false,
  });
  const [error, setError] = useState('');
  
  const dniRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (dniRef.current.value.length <= 0) {
      dniRef.current.focus();
      setErrors({ dni: true, password: false });
      return;
    }

    if (password.length <= 0) {
      passwordRef.current.focus();
      setErrors({ dni: false, password: true });
      return;
    }

    try {
      await loginUser(dni, password);
      navigate("/");
    } catch (error) {
      setError('Invalid DNI or password.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="form-container">
          <h1>Gestión Inmobiliaria</h1>
          <h2 className="card-title">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label></label>
              <input
                className={errors.dni ? "border border-danger" : ""}
                placeholder='DNI'
                type="text"
                id="dni"
                ref={dniRef}
                value={dni}
                onChange={(e) => handleInputChange(e, setDni)}
              />
              {errors.dni && <p className="pt-2 ps-2 text-danger">El DNI es obligatorio</p>}
            </div>
            <div className="form-group">
              <label></label>
              <input
                className={errors.password ? "border border-danger" : ""}
                placeholder='Contraseña'
                type="password"
                id="password"
                ref={passwordRef}
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
              />
              {errors.password && <p className="pt-2 ps-2 text-danger">La contraseña es obligatoria</p>}
            </div>
            <p>No tenes cuenta? <Link to="/register">Registrate</Link></p>
            <button type="submit" className="btn btn-primary btn-block">Iniciar sesión</button>
          </form>
        </div>
        <div className="image-container">
          <img src={loginImage} alt="background" />
        </div>
      </div>
    </div>
  );
}

export default Login;
