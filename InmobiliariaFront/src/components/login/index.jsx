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
          <h2 className="card-title">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="name"
                id="name"
                className="form-control"
                value={username}
                onChange={(e) => handleInputChange(e, setUsername)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) =>handleInputChange(e, setPassword)}
              />
            </div>
            <p>Olvidaste tu contraseña? <Link to="/register" className="btn btn-secondary">Register</Link></p>
            <button type="submit" className="btn btn-primary btn-block">Iniciar sesion</button>
            <div className="image-container">
          <img src={loginImage} alt="background" />
        </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
