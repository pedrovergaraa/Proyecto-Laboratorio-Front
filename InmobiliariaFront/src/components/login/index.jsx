// src/components/Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; 
import loginImage from '../../assets/images/login-image.webp'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  
  const handleInputChange = (e, setState) => {
    console.log("event", e)
    setState(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
  };
console.log("username", username)
console.log("password", password)
  return (
    <div className="login-container">
  <div className="login-box">
    <div className="form-container">
      <h1>Gestión Inmobiliaria</h1>
      <h2 className="card-title">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label ></label>
          <input
            placeholder='Usuario'
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => handleInputChange(e, setUsername)}
          />
        </div>
        <div className="form-group">
          <label ></label>
          <input
            placeholder='Contraseña'
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => handleInputChange(e, setPassword)}
          />
        </div>
        <p>Olvidaste tu contraseña? <Link to="/register">Registrate</Link></p>
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
