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
                        <Link to="/employees/tributaria">Admin. Tributaria</Link>
                    </li>
                    <li>
                        <Link to="/employees/planillas">Pago de Planillas</Link>
                    </li>
                    <li>
                        <Link to="/employees/contratacion">Contratación de Personal</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;