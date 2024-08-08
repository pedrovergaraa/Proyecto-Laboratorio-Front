// src/components/Login.jsx
import React, { useState } from 'react';
import loginImage from '../../assets/images/login-image.webp'
import { Link } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [lastname, setLastName] = useState('');
  const [password, setPassword] = useState('');

  
  const handleInputChange = (e, setState) => {
    console.log("event", e)
    setState(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Username: ${username}, Email: ${email}, Password: ${password}`);
  };
console.log("username", username)
console.log("email", email)
console.log("password", password)

  return (
    <div className="login-container">
  <div className="login-box">
    <div className="form-container">
      <h1>Gestión Inmobiliaria</h1>
      <h2 className="card-title">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label ></label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder='Usuario'
            value={username}
            onChange={(e) => handleInputChange(e, setUsername)}
          />
        </div>
        <div className="form-group">
          <label ></label>
          <input
            type="text"
            id="lastname"
            className="form-control"
            placeholder='Apellido'
            value={lastname}
            onChange={(e) => handleInputChange(e, setLastName)}
          />
        </div>
        <div className="form-group">
          <label ></label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder='Email'
            value={email}
            onChange={(e) => handleInputChange(e, setEmail)}
          />
        </div>
        <div className="form-group">
          <label ></label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder='Contraseña'
            value={password}
            onChange={(e) => handleInputChange(e, setPassword)}
          />
        </div>
        <p>Ya tienes cuenta? <Link to="/login">Login</Link> </p>
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

export default Register;
