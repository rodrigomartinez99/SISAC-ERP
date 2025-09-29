// src/AppRoutes.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@pages_e/LoginPage.jsx';
import SignupPage from '@pages_e/SignupPage.jsx';
import DashboardPage from '@pages_e/DashboardPage.jsx';
import EditProfilePage from '@pages_e/EditProfilePage.jsx';
import PayrollSelfServicePage from '@pages_e/PayrollSelfServicePage.jsx';
import EmployeePayrollDetails from '@masters/EmployeePayrollDetails.jsx';
import LegalParametersTable from '@masters/LegalParametersTable.jsx';

const PrivateRoute = ({ children, isAuthenticated }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default function AppRoutes() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const handleLogin = () => {
        setIsLoggedIn(true);
        setUser({
            firstName: 'Usuario',
            lastName: 'Prueba',
            email: 'usuario.prueba@fontec.com',
            phone: '999-999-999',
            jobTitle: 'Administrador'
        });
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                <Route path="/signup" element={<SignupPage />} />
                
                <Route 
                    path="/dashboard" 
                    element={
                        <PrivateRoute isAuthenticated={isLoggedIn}>
                            <DashboardPage user={user} onLogout={handleLogout} />
                        </PrivateRoute>
                    }
                />
                
                <Route 
                    path="/dashboard/edit-profile" 
                    element={
                        <PrivateRoute isAuthenticated={isLoggedIn}>
                            <EditProfilePage user={user} setUser={setUser} />
                        </PrivateRoute>
                    }
                />

                <Route 
                    path="/dashboard/payroll-selfservice" 
                    element={
                        <PrivateRoute isAuthenticated={isLoggedIn}>
                            <PayrollSelfServicePage user={user} onLogout={handleLogout} />
                        </PrivateRoute>
                    }
                />
                
                {/* Nuevas rutas para los componentes maestros */}
                <Route 
                    path="/masters/legal-parameters" 
                    element={
                        <PrivateRoute isAuthenticated={isLoggedIn}>
                            <LegalParametersTable user={user} onLogout={handleLogout} />
                        </PrivateRoute>
                    }
                />
                
                <Route 
                    path="/masters/employee-payroll" 
                    element={
                        <PrivateRoute isAuthenticated={isLoggedIn}>
                            <EmployeePayrollDetails user={user} onLogout={handleLogout} />
                        </PrivateRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}