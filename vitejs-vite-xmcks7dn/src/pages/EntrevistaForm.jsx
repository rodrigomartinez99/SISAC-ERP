// src/pages/EntrevistaForm.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const EntrevistaForm = () => {
  const { id } = useParams(); // ID de la postulación
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fechaHora: '',
    lugar: '',
    evaluador: '',
    observaciones: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const entrevistaData = {
      postulacionId: parseInt(id),
      fechaHora: new Date(formData.fechaHora).toISOString(),
      lugar: formData.lugar,
      evaluador: formData.evaluador,
      observaciones: formData.observaciones,
      resultado: 'Pendiente' // Se define al crear
    };

    try {
      await api.post('/entrevistas', entrevistaData);
      alert('✅ Entrevista programada con éxito');
      navigate('/postulaciones');
    } catch (err) {
      alert('❌ Error: ' + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Programar Entrevista - Postulación #{id}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Fecha y Hora</label>
          <input
            type="datetime-local"
            name="fechaHora"
            className="form-control"
            required
            onChange={handleChange}
            value={formData.fechaHora}
          />
        </div>
        <div className="mb-3">
          <label>Lugar</label>
          <input
            type="text"
            name="lugar"
            className="form-control"
            required
            onChange={handleChange}
            value={formData.lugar}
          />
        </div>
        <div className="mb-3">
          <label>Evaluador</label>
          <input
            type="text"
            name="evaluador"
            className="form-control"
            required
            onChange={handleChange}
            value={formData.evaluador}
          />
        </div>
        <div className="mb-3">
          <label>Observaciones</label>
          <textarea
            name="observaciones"
            className="form-control"
            rows="3"
            onChange={handleChange}
            value={formData.observaciones}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success" disabled={submitting}>
          {submitting ? 'Guardando...' : 'Guardar Entrevista'}
        </button>
      </form>
    </div>
  );
};

export default EntrevistaForm;