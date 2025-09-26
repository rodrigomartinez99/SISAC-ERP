import React from 'react';

const Navbar = () => {
    return (
        <header className="navbar">
            <div className="navbar-logo">
                <h2>SISAC</h2>
            </div>
            <div className="navbar-user">
                <span className="user-name">Usuario Logueado</span>
                <img src="/src/assets/images/profile-icon.png" alt="Perfil" className="profile-mini" />
                <span className="notification-bell">🔔</span>
            </div>
        </header>
    );
};

export default Navbar;