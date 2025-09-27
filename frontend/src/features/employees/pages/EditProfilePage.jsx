import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DashboardPage.css';
import '../styles/EditProfile.css';

const EditProfilePage = ({ user, setUser }) => {
    const [profileData, setProfileData] = useState(user || {});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // ** COMENTARIO: Lógica para manejar la subida de foto **
            // Esto solo muestra una previsualización. La lógica real de subida iría aquí.
            // Es importante validar el tamaño y formato del archivo antes de subirlo.
            if (file.size > 2 * 1024 * 1024) { // 2MB
                alert('La foto es demasiado grande. Por favor, elige una más pequeña.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileData({ ...profileData, profilePic: reader.result });
            };
            reader.readAsDataURL(file);
            // ** FIN COMENTARIO **
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        setUser(profileData); // Actualiza el estado global del usuario
        alert('Perfil actualizado con éxito.');
        navigate('/dashboard'); // Redirige de vuelta al dashboard
    };

    return (
        <div className="edit-profile-container">
            <h1>Editar Perfil</h1>
            <form onSubmit={handleSave}>
                <div className="profile-photo-section">
                    <label htmlFor="profile-upload" className="profile-photo-label">
                        <img
                            src={profileData.profilePic || "/src/assets/images/default-avatar.png"}
                            alt="Foto de Perfil"
                            className="profile-photo"
                        />
                        <span className="edit-icon">✏️</span>
                    </label>
                    <input
                        id="profile-upload"
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </div>

                <div className="input-row">
                    <div className="input-group">
                        <label>Nombre:</label>
                        <input type="text" name="firstName" value={profileData.firstName || ''} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Apellido:</label>
                        <input type="text" name="lastName" value={profileData.lastName || ''} onChange={handleChange} required />
                    </div>
                </div>

                <div className="input-row">
                    <div className="input-group">
                        <label>Teléfono:</label>
                        <input type="tel" name="phone" value={profileData.phone || ''} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label>Correo:</label>
                        <input type="email" name="email" value={profileData.email || ''} onChange={handleChange} required />
                    </div>
                </div>

                <div className="input-row">
                    <div className="input-group">
                        <label>Puesto de trabajo:</label>
                        <input type="text" name="jobTitle" value={profileData.jobTitle || ''} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label>Contraseña:</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value="********" // No se puede modificar
                            disabled
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? 'Ocultar' : 'Mostrar'}
                        </button>
                    </div>
                </div>

                <button type="submit" className="save-button">Guardar cambios</button>
            </form>
        </div>
    );
};

export default EditProfilePage;