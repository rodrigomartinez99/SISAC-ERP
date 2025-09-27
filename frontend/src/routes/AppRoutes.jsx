import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../features/employees/pages/LoginPage.jsx';
import SignupPage from '../features/employees/pages/SignupPage.jsx'; // Importa el nuevo componente
import DashboardPage from '../features/employees/pages/DashboardPage.jsx';

const PrivateRoute = ({ children, isAuthenticated }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default function AppRoutes() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                <Route path="/signup" element={<SignupPage />} /> {/* Nueva ruta para registro */}
                
                {/* Ruta protegida para el dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute isAuthenticated={isLoggedIn}>
                            <DashboardPage />
                        </PrivateRoute>
                    }
                />
                
                {/* Redirecciona a /login si la ruta no existe */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}