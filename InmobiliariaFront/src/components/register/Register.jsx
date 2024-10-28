// src/components/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../../services/UserServiceTest';
import loginImage from '../../assets/images/login-image.webp';

function Register() {
  const [fullName, setFullName] = useState('');
  const [dni, setDni] = useState('');
<<<<<<< HEAD
  const [mail, setmail] = useState('');
=======
  const [mail, setMail] = useState('');
>>>>>>> 1e0f25b6561c77427d7968965a068f1676b94ba6
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

<<<<<<< HEAD
    // Validaciones básicas
    if (fullName.trim() === '') {
      setErrors({ fullName: true, dni: false, mail: false, password: false });
      return;
    }
    if (dni.trim() === '') {
      setErrors({ fullName: false, dni: true, mail: false, password: false });
      return;
    }
    if (mail.trim() === '') {
      setErrors({ fullName: false, dni: false, mail: true, password: false });
      return;
    }
    if (password.trim() === '') {
      setErrors({ fullName: false, dni: false, mail: false, password: true });
      return;
    }

    const createUser = async (user) => {
      try {
        const response = await fetch(`${API_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
      } catch (error) {
        console.error('Error creating user:', error);
        throw error;
      }
=======
    // Validación completa al enviar
    const newErrors = {
      fullName: !fullName.trim(),
      dni: !dni.trim() || !/^\d+$/.test(dni),  // Solo números para DNI
      mail: !mail.trim() || !/\S+@\S+\.\S+/.test(mail),
      password: !password.trim(),
>>>>>>> 1e0f25b6561c77427d7968965a068f1676b94ba6
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((hasError) => hasError)) return;

    try {
<<<<<<< HEAD
      await createUser({ firstName: fullName.split(' ')[0], lastName: fullName.split(' ').slice(1).join(' '), dni, mail, password });
      setSuccess('User registered successfully!');
      setForm({ fullName: '', dni: '', mail: '', password: '' });
=======
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
>>>>>>> 1e0f25b6561c77427d7968965a068f1676b94ba6
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
<<<<<<< HEAD
                type="mail"
                id="mail"
                className={`form-control ${errors.mail ? 'border border-danger' : ''}`}
                placeholder="mail"
                value={mail}
                onChange={(e) => handleInputChange(e, setmail)}
              />
              {errors.mail && <p className="text-danger">El mail es obligatorio</p>}
=======
                type="email"
                id="mail"
                className={`form-control ${errors.mail ? 'border border-danger' : ''}`}
                placeholder="Email"
                value={mail}
                onChange={(e) => handleInputChange(e, setMail)}
              />
              {errors.mail && <p className="error-message">El email es obligatorio y debe tener un formato válido</p>}
>>>>>>> 1e0f25b6561c77427d7968965a068f1676b94ba6
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
