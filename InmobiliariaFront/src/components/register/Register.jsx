// src/components/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../../services/UserServiceTest';
import loginImage from '../../assets/images/login-image.webp';

function Register() {
    const [fullName, setFullName] = useState('');
    const [dni, setDni] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ fullName: false, dni: false, mail: false, password: false });
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleInputChange = (e, setState) => {
        setState(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones básicas
        if (fullName.trim() === '' || dni.trim() === '' || mail.trim() === '' || password.trim() === '') {
            setErrors({
                fullName: fullName.trim() === '',
                dni: dni.trim() === '',
                mail: mail.trim() === '',
                password: password.trim() === '',
            });
            return;
        }

        try {
            await createUser({ 
                firstName: fullName.split(' ')[0], 
                lastName: fullName.split(' ').slice(1).join(' '), 
                dni, 
                mail, 
                password 
            });
            setSuccess('¡Usuario registrado con éxito! Redirigiendo al login...');
            setErrors({ fullName: false, dni: false, mail: false, password: false });

            // Redirigir al login después de 2 segundos
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setError(error.message || 'Error registrando al usuario.'); 
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="form-container">
                    <h1>Gestión Inmobiliaria</h1>
                    <h2 className="card-title">Registrate</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                id="fullName"
                                className={`form-control ${errors.fullName ? 'border border-danger' : ''}`}
                                placeholder="Nombre Completo"
                                value={fullName}
                                onChange={(e) => handleInputChange(e, setFullName)}
                            />
                            {errors.fullName && <p className="text-danger">El nombre completo es obligatorio</p>}
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                id="dni"
                                className={`form-control ${errors.dni ? 'border border-danger' : ''}`}
                                placeholder="DNI"
                                value={dni}
                                onChange={(e) => handleInputChange(e, setDni)}
                            />
                            {errors.dni && <p className="text-danger">El DNI es obligatorio</p>}
                        </div>
                        <div className="form-group">
                            <input
                                type="email" // Cambié de "mail" a "email"
                                id="mail"
                                className={`form-control ${errors.mail ? 'border border-danger' : ''}`}
                                placeholder="Email"
                                value={mail}
                                onChange={(e) => handleInputChange(e, setMail)} // Cambié de "setmail" a "setMail"
                            />
                            {errors.mail && <p className="text-danger">El mail es obligatorio</p>}
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                id="password"
                                className={`form-control ${errors.password ? 'border border-danger' : ''}`}
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => handleInputChange(e, setPassword)}
                            />
                            {errors.password && <p className="text-danger">La contraseña es obligatoria</p>}
                        </div>
                        {success && <p className="text-success">{success}</p>}
                        {error && <p className="text-danger">{error}</p>}
                        <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
                        <button type="submit" className="btn btn-primary btn-block">Registrarse</button>
                    </form>
                </div>
                <div className="image-container">
                    <img src={loginImage} alt="background" />
                </div>
            </div>
        </div>
    );
}

export default Register;
