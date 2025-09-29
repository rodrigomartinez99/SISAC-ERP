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
                    <li>
                        <Link to="/masters/legal-parameters">Maestros y Configuración</Link> 
                    </li>
                    <li>
                        {/* Puedes agrupar las opciones de nómina en un menú desplegable si quieres,
                          pero por ahora las ponemos como enlaces directos para simplificar */}
                        <Link to="/payroll/novelties">Ingreso de Novedades</Link>
                    </li>
                    <li>
                        <Link to="/payroll/review">Revisión de Pre-Nómina</Link>
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