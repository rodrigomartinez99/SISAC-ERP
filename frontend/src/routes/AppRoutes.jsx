import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../features/employees/pages/LoginPage.jsx';
import DashboardPage from '../features/employees/pages/DashboardPage.jsx';

// Este componente simple simula un estado de autenticación
// En un proyecto real, se usaría un contexto o un custom hook
const isAuthenticated = () => {
    // Aquí iría la lógica para verificar si el usuario está logueado
    // Por ahora, solo devuelve un valor de prueba
    return true; // Cambia a true para probar el Dashboard
};

const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                {/* Puedes añadir una ruta para /signup aquí */}
                
                {/* Esta ruta está protegida y solo es accesible si el usuario está logueado */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <DashboardPage />
                        </PrivateRoute>
                    }
                />
                
                {/* Redirecciona al login si la ruta no existe */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}