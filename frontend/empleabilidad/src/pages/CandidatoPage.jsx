// src/pages/CandidatoPage.jsx
import React, { useState, useEffect } from 'react';

const CandidatoPage = () => {
  const [candidatos, setCandidatos] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    nombresApellidos: '',
    email: '',
    telefono: '',
    cvAdjunto: '' // ← ahora es string, no file
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCandidatos();
  }, []);

  const fetchCandidatos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/api/candidatos');
      if (!response.ok) throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
      const data = await response.json();
      setCandidatos(data);
    } catch (err) {
      setError(`Error al cargar candidatos: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ✅ handleSubmit ahora envía JSON (no FormData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = formData.id 
        ? `http://localhost:8080/api/candidatos/${formData.id}` 
        : 'http://localhost:8080/api/candidatos';

      const method = formData.id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), // ✅ JSON, no FormData
      });

      if (!res.ok) throw new Error(`Operación fallida: ${res.status} ${res.statusText}`);

      setFormData({ id: '', nombresApellidos: '', email: '', telefono: '', cvAdjunto: '' });
      await fetchCandidatos();
      alert(formData.id ? '✅ Candidato actualizado' : '✅ Candidato creado');
    } catch (err) {
      setError(`❌ No se pudo guardar: ${err.message}`);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (candidato) => {
    setFormData({
      id: candidato.id,
      nombresApellidos: candidato.nombresApellidos,
      email: candidato.email,
      telefono: candidato.telefono,
      cvAdjunto: candidato.cvAdjunto || '' // ✅ soporte para null/undefined
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este candidato?')) return;
    try {
      await fetch(`http://localhost:8080/api/candidatos/${id}`, { method: 'DELETE' });
      await fetchCandidatos();
    } catch (err) {
      alert(`No se pudo eliminar: ${err.message}`);
    }
  };

  return (
    <div style={{ marginLeft: '220px', padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="container-fluid">
        <h1 className="mb-4">👤 Crear Candidato</h1>

        {error && (
          <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
            <i className="bi bi-exclamation-triangle-fill"></i>
            <span>{error}</span>
          </div>
        )}

        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">
              {formData.id ? '✏️ Editar Candidato' : '➕ Nuevo Candidato'}
            </h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="id" className="form-label fw-bold">ID Candidato</label>
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
                  <label htmlFor="nombresApellidos" className="form-label fw-bold">Nombres y Apellidos</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombresApellidos"
                    name="nombresApellidos"
                    value={formData.nombresApellidos}
                    onChange={handleChange}
                    placeholder="Ingrese nombres completos"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label fw-bold">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Ingrese email"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="telefono" className="form-label fw-bold">Teléfono</label>
                  <input
                    type="text"
                    className="form-control"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="Ingrese teléfono"
                    required
                  />
                </div>
                {/* ✅ CAMBIO PRINCIPAL: input de URL */}
                <div className="col-12">
                  <label htmlFor="cvAdjunto" className="form-label fw-bold">Enlace al CV (Google Docs, etc.)</label>
                  <input
                    type="url"
                    className="form-control"
                    id="cvAdjunto"
                    name="cvAdjunto"
                    value={formData.cvAdjunto}
                    onChange={handleChange}
                    placeholder="https://docs.google.com/document/d/..."
                  />
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
                      onClick={() => setFormData({ id: '', nombresApellidos: '', email: '', telefono: '', cvAdjunto: '' })}
                    >
                      Cancelar Edición
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4">👥 Lista de Candidatos</h2>
          {loading && <span className="text-muted">Cargando...</span>}
        </div>

        {candidatos.length === 0 ? (
          <div className="alert alert-info d-flex align-items-center gap-2" role="alert">
            <i className="bi bi-info-circle-fill"></i>
            <span>No hay candidatos registrados.</span>
          </div>
        ) : (
          <div className="row g-3">
            {candidatos.map((cand) => (
              <div className="col-12" key={cand.id}>
                <div className="card border-left-primary shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 className="card-title mb-1">{cand.nombresApellidos}</h5>
                        <p className="text-muted small mb-1">
                          <i className="bi bi-tag"></i> ID: {cand.id} | 
                          <i className="bi bi-envelope ms-2"></i> {cand.email}
                        </p>
                        <p className="text-muted small mb-0">
                          <i className="bi bi-telephone ms-2"></i> {cand.telefono}
                        </p>
                        {cand.cvAdjunto && (
                          <a
                            href={cand.cvAdjunto}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-info mt-2"
                          >
                            <i className="bi bi-file-earmark-text"></i> Ver CV
                          </a>
                        )}
                      </div>
                      <div>
                        <button
                          className="btn btn-warning btn-sm me-1"
                          onClick={() => handleEdit(cand)}
                          title="Editar"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(cand.id)}
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

export default CandidatoPage;