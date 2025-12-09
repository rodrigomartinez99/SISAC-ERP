// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ConvocatoriaPage from './pages/ConvocatoriaPage';
import CandidatoPage from './pages/CandidatoPage';
import PostulacionPage from './pages/PostulacionPage';
import EntrevistaPage from './pages/EntrevistaPage'; // 👈 Importa la nueva página

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Routes>
          <Route path="/convocatoria" element={<ConvocatoriaPage />} />
          <Route path="/postulaciones" element={<PostulacionPage />} />
          <Route path="/candidatos" element={<CandidatoPage />} />
          <Route path="/entrevistas" element={<EntrevistaPage />} /> {/* 👈 Nueva ruta */}
          <Route path="/" element={<EntrevistaPage />} /> {/* Página por defecto */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;