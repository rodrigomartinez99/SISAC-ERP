import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

const LoginPage = () => {
    const handleLogin = (e) => {
        e.preventDefault();
        // Lógica de autenticación aquí
        alert('Intentando iniciar sesión...');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Ingresar al sistema SISAC</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="username">Usuario:</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit">Ingresar</button>
                </form>
                <p>
                    ¿No tienes una cuenta? <Link to="/signup">Solicitar acceso</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;