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

  const { handleLogin, handleLogout ,authError } = useContext(AuthenticationContext); // Uso del contexto de autenticación
  const navigate = useNavigate();

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.id]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones del Formulario
    if (!email || !isValidEmail(email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: true }));
      return;
    }

    try {
      await handleLogin(email, password); // Llamar al login del contexto
      if (!authError) {
        navigate("/properties"); // Redirige solo si no hay errores de autenticación
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or password.");
    }
  };

  useEffect(()=>{
    if(localStorage.getItem("user")){
      handleLogout()
    }
  },[])

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
                <p className="pt-2 ps-2 text-danger">
                {email ? "El formato del email es incorrecto" : "El email es obligatorio"}
              </p>
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
