// src/components/Login.jsx
import React, { useState } from 'react';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
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
      <div className="card login-card">
        <div className="card-body">
          <h2 className="card-title">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="username"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => handleInputChange(e, setUsername)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Repeat Username:</label>
              <input
                type="name"
                id="name"
                className="form-control"
                value={username}
                onChange={(e) => handleInputChange(e, setUsername)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => handleInputChange(e, setEmail)}
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
            <button type="submit" className="btn btn-primary btn-block">Iniciar sesion</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
