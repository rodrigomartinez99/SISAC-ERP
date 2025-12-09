// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className="bg-dark text-white" style={{ width: '220px', minHeight: '100vh', position: 'fixed', left: 0, top: 0, zIndex: 100 }}>
      <div className="p-3">
        <h2 className="h5 fw-bold mb-4">Menú Principal</h2>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/convocatoria" className="nav-link text-white d-flex align-items-center gap-2 px-3 py-2 rounded">
              <i className="bi bi-clipboard-data"></i>
              Convocatoria
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/postulaciones" className="nav-link text-white d-flex align-items-center gap-2 px-3 py-2 rounded">
              <i className="bi bi-file-earmark-text"></i>
              Postulaciones
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/candidatos" className="nav-link text-white d-flex align-items-center gap-2 px-3 py-2 rounded">
              <i className="bi bi-person-badge"></i>
              Candidatos
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/entrevistas" className="nav-link text-white d-flex align-items-center gap-2 px-3 py-2 rounded active">
              <i className="bi bi-mic"></i>
              Entrevista
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;