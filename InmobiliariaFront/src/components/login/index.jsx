import React, { useState, useContext, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
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

  const { handleLogin, authError, user } = useContext(AuthenticationContext); 
  const navigate = useNavigate();

  const isValidMail = (mail) => /\S+@\S+\.\S+/.test(mail);

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.id]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones del Formulario
    if (!mail || !isValidMail(mail)) {
      setErrors((prevErrors) => ({ ...prevErrors, mail: true }));
      return;
    }

    if (!password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: true }));
      return;
    }

    try {
      // Llamar al login del contexto, que a su vez usará loginUser del servicio
      await handleLogin(mail, password);
      if(user){
        switch(user.role){
          case "admin": navigate('/')
          break;
          case "owner": navigate('/')
          break;
          case "tenant": navigate('/user-tenant')
          break;
          case "landlord": navigate('/user-landlord')
          break;
          default: navigate('/')
          break;
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Correo o contraseña incorrectos.");
    }
  };

 
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
                className={errors.mail ? "border border-danger" : ""}
                placeholder="Email"
                type="text"
                id="mail"
                value={mail}
                onChange={(e) => handleInputChange(e, setMail)}
              />
              {errors.mail && (
                <p className="pt-2 ps-2 text-danger">
                  {mail ? "El formato del mail es incorrecto" : "El mail es obligatorio"}
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
                <p className="pt-2 ps-2 text-danger">La contraseña es obligatoria</p>
              )}
            </div>
            <p>
              ¿No tienes cuenta? 
            </p>
            <button type="submit" className="btn btn-primary btn-block">
              Iniciar sesión
            </button>
          </form>
          {/* Muestra el mensaje de error de autenticación */}
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
