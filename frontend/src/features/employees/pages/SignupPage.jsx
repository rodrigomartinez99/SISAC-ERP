import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Usamos los mismos estilos del login

const SignupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        companyCode: '',
        phone: '',
        email: '',
        jobTitle: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        // ** COMENTARIO: Aquí iría la lógica para enviar los datos al backend **
        console.log('Datos a enviar:', formData);
        
        alert('Solicitud de acceso enviada. Serás redirigido a la página de login.');
        navigate('/login');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Solicitar acceso a SISAC</h2>
                <form onSubmit={handleSignup}>
                    <div className="input-group">
                        <label>Nombre:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Apellido:</label>
                        <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Código de empresa:</label>
                        <input type="text" name="companyCode" value={formData.companyCode} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Teléfono:</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Correo:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Puesto de trabajo:</label>
                        <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
                    </div>
                    <button type="submit">Solicitar</button>
                </form>
                <p>
                    ¿Ya tienes una cuenta? <Link to="/login">Volver a login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;