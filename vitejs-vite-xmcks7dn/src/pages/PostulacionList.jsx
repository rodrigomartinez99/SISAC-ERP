// src/pages/PostulacionList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const PostulacionList = () => {
  const [postulaciones, setPostulaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostulaciones = async () => {
      try {
        const response = await api.get('/postulaciones');
        setPostulaciones(response.data);
      } catch (err) {
        console.error('Error al cargar postulaciones:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPostulaciones();
  }, []);

  if (loading) return <div className="container mt-4">Cargando postulaciones...</div>;

  return (
    <div className="container mt-4">
      <h2>Postulaciones Recibidas</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Candidato</th>
            <th>Convocatoria</th>
            <th>Estado CV</th>
            <th>Entrevista</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {postulaciones.map(p => (
            <tr key={p.id}>
              <td>{p.nombre} {p.apellido}</td>
              <td>{p.convocatoria?.titulo || 'N/A'}</td>
              <td>
                <span className={`badge ${p.estadoCv === 'Aceptado' ? 'bg-success' : p.estadoCv === 'Rechazado' ? 'bg-danger' : 'bg-warning'}`}>
                  {p.estadoCv || 'Pendiente'}
                </span>
              </td>
              <td>
                {p.entrevista ?
                  <span className={`badge ${p.entrevista.resultado === 'Aprobado' ? 'bg-success' : 'bg-danger'}`}>
                    {p.entrevista.resultado}
                  </span>
                  : <span className="badge bg-secondary">No programada</span>
                }
              </td>
              <td>
                {!p.entrevista && (
                  <Link to={`/entrevista/${p.id}`} className="btn btn-sm btn-outline-primary">
                    Programar
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostulacionList;