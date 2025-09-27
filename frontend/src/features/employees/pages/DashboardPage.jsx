import React from 'react';
import Sidebar from '@/components/ui/SideBar.jsx';
import Navbar from '@/components/ui/Navbar.jsx';
import DashboardWidget from '@/features/employees/components/DashboardWidget.jsx'; // Importamos el widget
import '@/features/employees/styles/DashboardPage.css';

const DashboardPage = ({ user, onLogout }) => {
    // ** Simulación de datos para los widgets **
    const totalEmployees = 50;
    const newApplicants = 3;
    const pendingTasks = 'Revisar planillas de Diciembre';

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="main-content">
                <Navbar user={user} onLogout={onLogout} />
                <div className="dashboard-content">
                    <h1>Bienvenido al Dashboard de SISAC</h1>
                    <p>Aquí se visualizarán las métricas y herramientas para los empleados de FONTEC.</p>
                    
                    <div className="widgets-grid">
                        <DashboardWidget
                            title="Total Empleados"
                            content={<h2>{totalEmployees}</h2>}
                            icon="👥"
                        />
                        <DashboardWidget
                            title="Nuevos Candidatos"
                            content={<h2>{newApplicants}</h2>}
                            icon="📬"
                        />
                        <DashboardWidget
                            title="Tareas Pendientes"
                            content={<p>{pendingTasks}</p>}
                            icon="📝"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;