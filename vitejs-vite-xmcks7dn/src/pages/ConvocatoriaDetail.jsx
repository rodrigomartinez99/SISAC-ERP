// src/pages/ConvocatoriaDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const ConvocatoriaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [convocatoria, setConvocatoria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    cvAdjunto: null
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConvocatoria = async () => {
      try {
        const response = await api.get(`/convocatorias/${id}`);
        setConvocatoria(response.data);
      } catch (err) {
        setError('No se pudo cargar la convocatoria');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchConvocatoria();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, cvAdjunto: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const postulacionData = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      email: formData.email,
      telefono: formData.telefono,
      convocatoriaId: parseInt(id)
    };

    try {
      // Primero enviamos los datos básicos
      const response = await api.post('/postulaciones', postulacionData);

      // Si tienes subida de CV como archivo, necesitarás un endpoint separado o usar multipart
      // Por ahora, asumimos que el CV se sube después o por otro medio
      alert('✅ Postulación enviada con éxito');
      navigate('/');
    } catch (err) {
      alert('❌ Error al enviar la postulación: ' + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="container mt-4">Cargando...</div>;
  if (error) return <div className="container mt-4 alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>{convocatoria.titulo}</h2>
      <p>{convocatoria.descripcion}</p>
      <p><strong>Estado:</strong> <span className={`badge ${convocatoria.estado === 'Abierta' ? 'bg-success' : 'bg-secondary'}`}>{convocatoria.estado}</span></p>

      <hr />

      <h4>Postula ahora</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input type="text" name="nombre" className="form-control" required onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label>Apellido</label>
          <input type="text" name="apellido" className="form-control" required onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" required onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label>Teléfono</label>
          <input type="tel" name="telefono" className="form-control" onChange={handleInputChange} />
        </div>
        {/* Opcional: subida de CV como archivo (requiere multipart en Spring Boot) */}
        {/* <div className="mb-3">
          <label>CV (PDF)</label>
          <input type="file" className="form-control" accept=".pdf" onChange={handleFileChange} />
        </div> */}
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Enviando...' : 'Enviar postulación'}
        </button>
      </form>
    </div>
  );
};

export default ConvocatoriaDetail;