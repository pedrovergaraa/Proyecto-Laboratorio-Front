// src/components/Login.jsx
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import loginImage from "../../assets/images/login-image.webp";
import { AuthenticationContext } from "../../context/authenticationContext/auth.context";

function Login() {
<<<<<<< HEAD
  const [mail, setmail] = useState("");
=======
  const [mail, setMail] = useState("");
>>>>>>> 1e0f25b6561c77427d7968965a068f1676b94ba6
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    mail: false,
    password: false,
  });
  const [error, setError] = useState("");

  const { handleLogin, authError } = useContext(AuthenticationContext);
  const navigate = useNavigate();

<<<<<<< HEAD
  const isValidmail = (mail) => /\S+@\S+\.\S+/.test(mail);
=======
  const isValidMail = (mail) => /\S+@\S+\.\S+/.test(mail);
>>>>>>> 1e0f25b6561c77427d7968965a068f1676b94ba6

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

<<<<<<< HEAD
    // Validaciones del Formulario
    if (!mail || !isValidmail(mail)) {
      setErrors((prevErrors) => ({ ...prevErrors, mail: true }));
      return;
    }
=======
    // Validaciones del formulario al enviar
    const newErrors = {
      mail: !mail.trim() || !isValidMail(mail),
      password: !password.trim(),
    };
    setErrors(newErrors);
>>>>>>> 1e0f25b6561c77427d7968965a068f1676b94ba6

    if (Object.values(newErrors).some((hasError) => hasError)) return;

    try {
<<<<<<< HEAD
      // Llamar al login del contexto, que a su vez usará loginUser del servicio
=======
>>>>>>> 1e0f25b6561c77427d7968965a068f1676b94ba6
      await handleLogin(mail, password);
      if (!authError) {
        navigate("/properties");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("mail o contraseña incorrectos.");
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
<<<<<<< HEAD
                className={errors.mail ? "border border-danger" : ""}
=======
                className={`form-control ${errors.mail ? "border border-danger" : ""}`}
>>>>>>> 1e0f25b6561c77427d7968965a068f1676b94ba6
                placeholder="Email"
                type="text"
                id="mail"
                value={mail}
<<<<<<< HEAD
                onChange={(e) => handleInputChange(e, setmail)}
              />
              {errors.mail && (
                <p className="pt-2 ps-2 text-danger">
                  {mail ? "El formato del mail es incorrecto" : "El mail es obligatorio"}
=======
                onChange={(e) => handleInputChange(e, setMail)}
              />
              {errors.mail && (
                <p className="error-message">
                  {mail ? "El formato del email es incorrecto" : "El email es obligatorio"}
>>>>>>> 1e0f25b6561c77427d7968965a068f1676b94ba6
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
