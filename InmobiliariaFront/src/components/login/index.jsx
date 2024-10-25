// src/components/Login.jsx
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import loginImage from "../../assets/images/login-image.webp";
import { AuthenticationContext } from "../../context/authenticationContext/auth.context";

function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    mail: false,
    password: false,
  });
  const [error, setError] = useState("");

  const { handleLogin, authError } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const isValidMail = (mail) => /\S+@\S+\.\S+/.test(mail);

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones del formulario al enviar
    const newErrors = {
      mail: !mail.trim() || !isValidMail(mail),
      password: !password.trim(),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((hasError) => hasError)) return;

    try {
      await handleLogin(mail, password);
      if (!authError) {
        navigate("/properties");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Email o contraseña incorrectos.");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/properties"); // Redirige si ya está logueado
    }
  }, [navigate]);

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="form-container">
          <h1>Gestión Inmobiliaria</h1>
          <h2 className="card-title">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className={`form-control ${errors.mail ? "border border-danger" : ""}`}
                placeholder="Email"
                type="text"
                id="mail"
                value={mail}
                onChange={(e) => handleInputChange(e, setMail)}
              />
              {errors.mail && (
                <p className="error-message">
                  {mail ? "El formato del email es incorrecto" : "El email es obligatorio"}
                </p>
              )}
            </div>
            <div className="form-group">
              <input
                className={`form-control ${errors.password ? "border border-danger" : ""}`}
                placeholder="Contraseña"
                type="password"
                id="password"
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
              />
              {errors.password && (
                <p className="error-message">La contraseña es obligatoria</p>
              )}
            </div>
            <p>
              ¿No tienes cuenta? <Link to="/register">Registrate</Link>
            </p>
            <button type="submit" className="btn btn-primary btn-block">
              Iniciar sesión
            </button>
          </form>
          {/* Muestra el mensaje de error de autenticación */}
          {error && <p className="error-message">{error}</p>}
          {authError && <p className="error-message">{authError}</p>}
        </div>
        <div className="image-container">
          <img src={loginImage} alt="background" />
        </div>
      </div>
    </div>
  );
}

export default Login;
