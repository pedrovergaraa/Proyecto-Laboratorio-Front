// src/components/Login.jsx
import React, { useState } from 'react';
import loginImage from '../../assets/images/login-image.webp'


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
    <div class="login-container">
  <div class="login-box">
    <div class="form-container">
      <h1>Gestión Inmobiliaria</h1>
      <h2 class="card-title">Register</h2>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="username"></label>
          <input
            type="text"
            id="username"
            class="form-control"
            placeholder='Username'
            value={username}
            onChange={(e) => handleInputChange(e, setUsername)}
          />
        </div>
        <div class="form-group">
          <label for="lastname"></label>
          <input
            type="text"
            id="lastname"
            class="form-control"
            placeholder='LastName'
            value={lastname}
            onChange={(e) => handleInputChange(e, setLastName)}
          />
        </div>
        <div class="form-group">
          <label for="email"></label>
          <input
            type="email"
            id="email"
            class="form-control"
            placeholder='Email'
            value={email}
            onChange={(e) => handleInputChange(e, setEmail)}
          />
        </div>
        <div class="form-group">
          <label for="password"></label>
          <input
            type="password"
            id="password"
            class="form-control"
            placeholder='Password'
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

export default Register;
