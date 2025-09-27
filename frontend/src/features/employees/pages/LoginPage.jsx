import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError(''); // Limpia el error anterior

        // Lógica de validación con el backend (por ahora, solo simulación)
        // ** COMENTARIO: Lógica de prueba para avanzar al dashboard con "admin" **
        if (username === 'admin' && password === 'admin') {
            onLogin();
            navigate('/dashboard');
        } else {
            setError('Usuario o contraseña incorrectos.');
        }
        // ** FIN COMENTARIO **
        
        // ** COMENTARIO: Lógica de autenticación real con el backend **
        // if (response.status === 200) {
        //     onLogin();
        //     navigate('/dashboard');
        // } else {
        //     setError('Error: credenciales no válidas');
        // }
        // ** FIN COMENTARIO **
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Ingresar al sistema SISAC</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="username">Usuario:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
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