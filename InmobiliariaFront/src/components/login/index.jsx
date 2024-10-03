import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import loginImage from "../../assets/images/login-image.webp";
import { AuthenticationContext } from "../../context/authenticationContext/auth.context"; // Importa el contexto de autenticación

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const [error, setError] = useState("");

  const { handleLogout, authError } = useContext(AuthenticationContext); 
  const navigate = useNavigate();

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
    setErrors({ ...errors, [e.target.id]: false }); 
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(await response.text()); 

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log("Login exitoso:", data);
      
      // Aquí podrías almacenar el token en localStorage u otra forma de estado
      localStorage.setItem('user', JSON.stringify(data));

      return data;
    } catch (error) {
      console.error('Error en el login:', error);
      setError('Correo o contraseña incorrectos.');
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrors({ ...errors, email: true });
      return;
    }

    if (!password) {
      setErrors({ ...errors, password: true });
      return;
    }

    try {
      console.log("Attempting to log in with:", email, password); 
      const user = await handleLogin(email, password); 
      if (user) {
        navigate("/"); // Redirige al usuario a la página principal
      }
    } catch (error) {
      console.error("Login error:", error); 
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      handleLogout();
    }
  }, []);

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="form-container">
          <h1>Gestión Inmobiliaria</h1>
          <h2 className="card-title">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label></label>
              <input
                className={errors.email ? "border border-danger" : ""}
                placeholder="Email"
                type="text"
                id="email"
                value={email}
                onChange={(e) => handleInputChange(e, setEmail)} 
              />
              {errors.email && (
                <p className="pt-2 ps-2 text-danger">El email es obligatorio</p>
              )}
            </div>
            <div className="form-group">
              <label></label>
              <input
                className={errors.password ? "border border-danger" : ""}
                placeholder="Contraseña"
                type="password"
                id="password"
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
              />
              {errors.password && (
                <p className="pt-2 ps-2 text-danger">
                  La contraseña es obligatoria
                </p>
              )}
            </div>
            <p>
              No tienes cuenta? <Link to="/register">Registrate</Link>
            </p>
            <button type="submit" className="btn btn-primary btn-block">
              Iniciar sesión
            </button>
          </form>
          {error && <p className="pt-2 ps-2 text-danger">{error}</p>} 
          {authError && <p className="pt-2 ps-2 text-danger">{authError}</p>} 
        </div>
        <div className="image-container">
          <img src={loginImage} alt="background" />
        </div>
      </div>
    </div>
  );
}

export default Login;
