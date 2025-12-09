// src/pages/PostulacionPage.jsx
import React, { useState, useEffect } from 'react';

const PostulacionPage = () => {
  const [postulaciones, setPostulaciones] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    convocatoriaId: '',
    candidatoId: '',
    fechaEvaluacion: '',
    estado: 'En Proceso',
    observaciones: ''
  });
  const [convocatorias, setConvocatorias] = useState([]);
  const [candidatos, setCandidatos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar datos al montar
  useEffect(() => {
    fetchPostulaciones();
    fetchConvocatorias();
    fetchCandidatos();
  }, []);

  const fetchPostulaciones = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/api/postulaciones');
      if (!response.ok) throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
      const data = await response.json();
      setPostulaciones(data);
    } catch (err) {
      setError(`Error al cargar postulaciones: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchConvocatorias = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/convocatorias');
      if (!response.ok) throw new Error('Error al cargar convocatorias');
      const data = await response.json();
      setConvocatorias(data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const fetchCandidatos = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/candidatos');
      if (!response.ok) throw new Error('Error al cargar candidatos');
      const data = await response.json();
      setCandidatos(data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = formData.id 
        ? `http://localhost:8080/api/postulaciones/${formData.id}` 
        : 'http://localhost:8080/api/postulaciones';

      const method = formData.id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(`Operación fallida: ${res.status} ${res.statusText}`);

      setFormData({
        id: '',
        convocatoriaId: '',
        candidatoId: '',
        fechaEvaluacion: '',
        estado: 'En Proceso',
        observaciones: ''
      });
      await fetchPostulaciones();
      alert(formData.id ? '✅ Postulación actualizada' : '✅ Postulación creada');
    } catch (err) {
      setError(`❌ No se pudo guardar: ${err.message}`);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (postulacion) => {
    setFormData({
      id: postulacion.id,
      convocatoriaId: postulacion.convocatoriaId || '',
      candidatoId: postulacion.candidatoId || '',
      fechaEvaluacion: postulacion.fechaEvaluacion || '',
      estado: postulacion.estado || 'En Proceso',
      observaciones: postulacion.observaciones || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar esta postulación?')) return;
    try {
      await fetch(`http://localhost:8080/api/postulaciones/${id}`, { method: 'DELETE' });
      await fetchPostulaciones();
    } catch (err) {
      alert(`No se pudo eliminar: ${err.message}`);
    }
  };

  return (
    <div style={{ marginLeft: '220px', padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="container-fluid">
        <h1 className="mb-4">📝 Crear Postulación</h1>

        {/* Mensaje de error */}
        {error && (
          <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
            <i className="bi bi-exclamation-triangle-fill"></i>
            <span>{error}</span>
          </div>
        )}

        {/* Formulario */}
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">
              {formData.id ? '✏️ Editar Postulación' : '➕ Nueva Postulación'}
            </h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="id" className="form-label fw-bold">ID Postulación</label>
                  <input
                    type="text"
                    className="form-control"
                    id="id"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="Ingrese ID"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="convocatoriaId" className="form-label fw-bold">Convocatoria</label>
                  <select
                    className="form-select"
                    id="convocatoriaId"
                    name="convocatoriaId"
                    value={formData.convocatoriaId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione una convocatoria</option>
                    {convocatorias.map(conv => (
                      <option key={conv.id} value={conv.id}>
                        {conv.titulo}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="candidatoId" className="form-label fw-bold">Candidato</label>
                  <select
                    className="form-select"
                    id="candidatoId"
                    name="candidatoId"
                    value={formData.candidatoId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione un candidato</option>
                    {candidatos.map(cand => (
                      <option key={cand.id} value={cand.id}>
                        {cand.nombresApellidos}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="fechaEvaluacion" className="form-label fw-bold">Fecha de Evaluación</label>
                  <input
                    type="date"
                    className="form-control"
                    id="fechaEvaluacion"
                    name="fechaEvaluacion"
                    value={formData.fechaEvaluacion}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="estado" className="form-label fw-bold">Estado de Postulación</label>
                  <select
                    className="form-select"
                    id="estado"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    required
                  >
                    <option value="En Proceso">En Proceso</option>
                    <option value="Aceptado">Aceptado</option>
                    <option value="Rechazado">Rechazado</option>
                  </select>
                </div>
                <div className="col-12">
                  <label htmlFor="observaciones" className="form-label fw-bold">Observaciones</label>
                  <textarea
                    className="form-control"
                    id="observaciones"
                    name="observaciones"
                    rows="3"
                    value={formData.observaciones}
                    onChange={handleChange}
                    placeholder="Ingrese observaciones"
                  ></textarea>
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-success me-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        {' Guardando...'}
                      </>
                    ) : formData.id ? 'Actualizar' : 'Guardar'}
                  </button>

                  {formData.id && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setFormData({
                        id: '',
                        convocatoriaId: '',
                        candidatoId: '',
                        fechaEvaluacion: '',
                        estado: 'En Proceso',
                        observaciones: ''
                      })}
                    >
                      Cancelar Edición
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Lista de postulaciones */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4">📋 Lista de Postulaciones</h2>
          {loading && <span className="text-muted">Cargando...</span>}
        </div>

        {postulaciones.length === 0 ? (
          <div className="alert alert-info d-flex align-items-center gap-2" role="alert">
            <i className="bi bi-info-circle-fill"></i>
            <span>No hay postulaciones registradas.</span>
          </div>
        ) : (
          <div className="row g-3">
            {postulaciones.map((post) => (
              <div className="col-12" key={post.id}>
                <div className="card border-left-primary shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 className="card-title mb-1">{post.nombreCandidato || 'Sin nombre'}</h5>
                        <p className="text-muted small mb-1">
                          <i className="bi bi-tag"></i> ID: {post.id} | 
                          <i className="bi bi-calendar ms-2"></i> {new Date(post.fechaEvaluacion).toLocaleDateString()}
                        </p>
                        <p className="text-muted small mb-0">
                          <i className="bi bi-flag ms-2"></i> Estado: {post.estado}
                        </p>
                      </div>
                      <div>
                        <button
                          className="btn btn-warning btn-sm me-1"
                          onClick={() => handleEdit(post)}
                          title="Editar"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(post.id)}
                          title="Eliminar"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostulacionPage;