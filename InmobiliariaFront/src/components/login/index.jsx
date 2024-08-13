// src/components/Login.jsx
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; 
import loginImage from '../../assets/images/login-image.webp'; 


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });  
  
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const handleInputChange = (e, setState) => {
    console.log("event", e)
    setState(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usernameRef.current.value.length <= 0) {
      usernameRef.current.focus();
      setErrors({ username: true, password: false });
      return;
  }

  if (password.length <= 0) {
      passwordRef.current.focus();
      setErrors({ username: false, password: true });
      return;
  }

  handleInputChange(username);

  navigate("/")

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
          className={errors.email ?
            "border border-danger" :
            ""}
            placeholder='Usuario'
            type="text"
            id="username"
            ref={usernameRef}
            value={username}
            onChange={(e) => handleInputChange(e, setUsername)}
          />
          {errors.username && <p className="pt-2 ps-2 text-danger">El usuario es obligatorio</p>}
        </div>
        <div className="form-group">
          <label ></label>
          <input
          className={errors.password ?
            "border border-danger" :
            ""}
            placeholder='Contraseña'
            type="password"
            id="password"
            ref={passwordRef}
            value={password}
            onChange={(e) => handleInputChange(e, setPassword)}
          />
          {errors.password && <p className="pt-2 ps-2 text-danger">La contraseña es obligatoria</p>}
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
