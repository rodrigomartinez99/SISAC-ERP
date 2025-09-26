import React from 'react';
import Sidebar from '../../../components/ui/SideBar.jsx';
import Navbar from '../../../components/ui/Navbar.jsx';
import '../styles/DashboardPage.css';

const DashboardPage = () => {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <div className="dashboard-content">
                    <h1>Bienvenido al Dashboard de SISAC</h1>
                    <p>Aquí se visualizarán las métricas y herramientas para los empleados de FONTEC.</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;