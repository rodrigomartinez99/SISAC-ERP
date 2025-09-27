import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const navigate = useNavigate();

    // ** COMENTARIO: Lógica de manejo de notificaciones **
    const notifications = [
        { id: 1, message: 'Nueva solicitud de acceso pendiente.' },
        { id: 2, message: 'Actualización en el sistema de planillas.' }
    ];
    // ** FIN COMENTARIO **

    const handleLogout = () => {
        if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
            onLogout();
            navigate('/login');
        }
    };

    return (
        <header className="navbar">
            <div className="navbar-logo">
                <h2>SISAC</h2>
            </div>
            <div className="navbar-user">
                <span className="user-name">
                    {user?.firstName} {user?.lastName}
                </span>
                
                {/* Contenedor del avatar y menú */}
                <div
                    className="profile-container"
                    onMouseEnter={() => setShowProfileMenu(true)}
                    onMouseLeave={() => setShowProfileMenu(false)}
                >
                    <img
                        src="/src/assets/images/avatar.jpg"
                        alt="Perfil"
                        className="profile-mini"
                    />
                    
                    {showProfileMenu && (
                        <div className="profile-menu">
                            <button onClick={() => navigate('/dashboard/edit-profile')}>
                                Editar Perfil
                            </button>
                            <button onClick={handleLogout}>Cerrar Sesión</button>
                        </div>
                    )}
                </div>
                
                {/* Contenedor de notificaciones */}
                <div
                    className="notification-container"
                    onClick={() => setShowNotifications(!showNotifications)}
                >
                    <span className="notification-bell">🔔</span>
                    {notifications.length > 0 && (
                        <span className="notification-badge">{notifications.length}</span>
                    )}
                    {showNotifications && (
                        <div className="notifications-dropdown">
                            {notifications.length > 0 ? (
                                <ul>
                                    {notifications.map((notif) => (
                                        <li key={notif.id}>{notif.message}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No hay notificaciones nuevas.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;