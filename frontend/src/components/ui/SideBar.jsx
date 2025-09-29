// src/ui/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    {/* Enlace para la nueva página de Parámetros Legales */}
                    <li>
                        <Link to="/masters/legal-parameters">Maestros y Configuración</Link> 
                    </li>
                    {/* Enlace para la nueva página de Detalles de Nómina */}
                    <li>
                        <Link to="/masters/employee-payroll">Pago de Planillas</Link> 
                    </li>
                    <li>
                        <Link to="/dashboard">Contratación de Personal</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;