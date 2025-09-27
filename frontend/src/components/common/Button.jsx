import React from 'react';
import '@styles/Button.css'; // Crea este archivo CSS

const Button = ({ children, onClick, type = 'button', className = '' }) => {
    return (
        <button type={type} onClick={onClick} className={`btn ${className}`}>
            {children}
        </button>
    );
};

export default Button;