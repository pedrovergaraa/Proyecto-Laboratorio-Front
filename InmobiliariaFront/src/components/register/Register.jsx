// src/components/Register.jsx
import React, { useState } from 'react';
import loginImage from '../../assets/images/login-image.webp';
import { Link } from 'react-router-dom';

function Register() {
  const [fullName, setFullName] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    fullName: false,
    dni: false,
    email: false,
    password: false,
  });

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (fullName.trim() === '') {
      setErrors({ fullName: true, dni: false, email: false, password: false });
      return;
    }

    if (dni.trim() === '') {
      setErrors({ fullName: false, dni: true, email: false, password: false });
      return;
    }

    if (email.trim() === '') {
      setErrors({ fullName: false, dni: false, email: true, password: false });
      return;
    }

    if (password.trim() === '') {
      setErrors({ fullName: false, dni: false, email: false, password: true });
      return;
    }

    // Aquí podrías agregar la lógica para registrar el usuario (llamada a la API, etc.)
    console.log(`Nombre Completo: ${fullName}, DNI: ${dni}, Email: ${email}, Contraseña: ${password}`);

    // Redirigir a la página de login después de un registro exitoso
    // navigate('/login');
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="form-container">
          <h1>Gestión Inmobiliaria</h1>
          <h2 className="card-title">Registrate</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
            <input
                type="text"
                id="fullName"
                className={`form-control ${errors.fullName ? 'border border-danger' : ''}`}
                placeholder="Nombre Completo"
                value={fullName}
                onChange={(e) => handleInputChange(e, setFullName)}
              />
              {errors.fullName && <p className="text-danger">El nombre completo es obligatorio</p>}
            </div>
            <div className="form-group">
              <input
                type="text"
                id="dni"
                className={`form-control ${errors.dni ? 'border border-danger' : ''}`}
                placeholder="DNI"
                value={dni}
                onChange={(e) => handleInputChange(e, setDni)}
              />
              {errors.dni && <p className="text-danger">El DNI es obligatorio</p>}
            </div>
            <div className="form-group">
            <input
                type="email"
                id="email"
                className={`form-control ${errors.email ? 'border border-danger' : ''}`}
                placeholder="Email"
                value={email}
                onChange={(e) => handleInputChange(e, setEmail)}
              />
              {errors.email && <p className="text-danger">El email es obligatorio</p>}
            </div>
            <div className="form-group">
            <input
                type="password"
                id="password"
                className={`form-control ${errors.password ? 'border border-danger' : ''}`}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
              />
              {errors.password && <p className="text-danger">La contraseña es obligatoria</p>}
            </div>
            <p>Ya tienes cuenta? <Link to="/login">Logueate</Link></p>
            <button type="submit" className="btn btn-primary btn-block">Registrarse</button>
          </form>
        </div>
        <div className="image-container">
          <img src={loginImage} alt="background" />
        </div>
      </div>
    </div>
  );
}

export default Register;
