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
    <div class="login-container">
  <div class="login-box">
    <div class="form-container">
      <h1>Gestión Inmobiliaria</h1>
      <h2 class="card-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="username">Username:</label>
          <input
            type="text"
            id="username"
            class="form-control"
            value={username}
            onChange={(e) => handleInputChange(e, setUsername)}
          />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            class="form-control"
            value={password}
            onChange={(e) => handleInputChange(e, setPassword)}
          />
        </div>
        <p>Olvidaste tu contraseña? <a href="/register" class="btn btn-secondary">Register</a></p>
        <button type="submit" class="btn btn-primary btn-block">Iniciar sesión</button>
      </form>
    </div>
    <div class="image-container">
      <img src={loginImage} alt="background" />
    </div>
  </div>
</div>

  );
}

export default Login;
