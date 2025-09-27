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
                        <Link to="/dashboard">Admin. Tributaria</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Pago de Planillas</Link>
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