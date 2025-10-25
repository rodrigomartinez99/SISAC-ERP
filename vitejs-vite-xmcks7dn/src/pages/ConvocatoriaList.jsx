// src/pages/ConvocatoriaList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const ConvocatoriaList = () => {
  const [convocatorias, setConvocatorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConvocatorias = async () => {
      try {
        const response = await api.get('/convocatorias');
        setConvocatorias(response.data);
      } catch (err) {
        setError('Error al cargar las convocatorias');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConvocatorias();
  }, []);

  if (loading) return <div className="container mt-4">Cargando convocatorias...</div>;
  if (error) return <div className="container mt-4 alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>Convocatorias Abiertas</h2>
      <div className="row">
        {convocatorias.map(conv => (
          <div key={conv.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{conv.titulo}</h5>
                <p className="card-text">{conv.descripcion?.substring(0, 100)}...</p>
                <p><small>Publicado: {new Date(conv.fechaPublicacion).toLocaleDateString()}</small></p>
                <span className={`badge ${conv.estado === 'Abierta' ? 'bg-success' : 'bg-secondary'}`}>
                  {conv.estado}
                </span>
                <Link to={`/convocatoria/${conv.id}`} className="btn btn-primary mt-2">
                  Ver detalles
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConvocatoriaList;