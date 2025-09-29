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
                    {/* Sección Maestros y Configuración */}
                    <li>
                        <Link to="/masters/legal-parameters">Maestros y Configuración</Link> 
                    </li>
                    {/* Sección Proceso de Nómina */}
                    <li>
                        <Link to="/payroll/novelties">Ingreso de Novedades</Link>
                    </li>
                    <li>
                        <Link to="/payroll/review">Revisión de Pre-Nómina</Link>
                    </li>
                    {/* Sección Reportes */}
                    <li>
                        <Link to="/reports/summary">Resumen de Planilla</Link>
                    </li>
                    <li>
                        <Link to="/reports/output-files">Generar Archivos de Salida</Link>
                    </li>
                    {/* Otros enlaces existentes */}
                    <li>
                        <Link to="/dashboard">Contratación de Personal</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;