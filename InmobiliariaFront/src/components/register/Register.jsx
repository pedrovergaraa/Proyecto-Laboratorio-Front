// src/components/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../../services/UserServiceTest';
import loginImage from '../../assets/images/login-image.webp';

function Register() {
  const [fullName, setFullName] = useState('');
  const [dni, setDni] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    fullName: false,
    dni: false,
    mail: false,
    password: false,
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación completa al enviar
    const newErrors = {
      fullName: !fullName.trim(),
      dni: !dni.trim() || !/^\d+$/.test(dni),  // Solo números para DNI
      mail: !mail.trim() || !/\S+@\S+\.\S+/.test(mail),
      password: !password.trim(),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((hasError) => hasError)) return;

    try {
      await createUser({
        firstName: fullName.split(' ')[0],
        lastName: fullName.split(' ').slice(1).join(' '),
        dni,
        mail,
        password,
      });
      setSuccess('User registered successfully!');
      setFullName('');
      setDni('');
      setMail('');
      setPassword('');
      navigate('/login');
    } catch (error) {
      setError('Error registering user.');
    }
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
              {errors.fullName && <p className="error-message">El nombre completo es obligatorio</p>}
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
              {errors.dni && <p className="error-message">El DNI es obligatorio y solo debe contener números</p>}
            </div>
            <div className="form-group">
              <input
                type="email"
                id="mail"
                className={`form-control ${errors.mail ? 'border border-danger' : ''}`}
                placeholder="Email"
                value={mail}
                onChange={(e) => handleInputChange(e, setMail)}
              />
              {errors.mail && <p className="error-message">El email es obligatorio y debe tener un formato válido</p>}
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
              {errors.password && <p className="error-message">La contraseña es obligatoria</p>}
            </div>
            {success && <p className="text-success">{success}</p>}
            {error && <p className="error-message">{error}</p>}
            <p>¿Ya tienes cuenta? <Link to="/login">Logueate</Link></p>
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
