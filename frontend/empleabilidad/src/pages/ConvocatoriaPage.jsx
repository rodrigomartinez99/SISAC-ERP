// ui/ConvocatoriaPage.jsx
import React, { useState, useEffect } from 'react';

const ConvocatoriaPage = () => {
  const [convocatorias, setConvocatorias] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    titulo: '',
    fechaPublicacion: '',
    descripcion: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar convocatorias al montar
  useEffect(() => {
    fetchConvocatorias();
  }, []);

  const fetchConvocatorias = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/api/convocatorias');
      if (!response.ok) throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
      const data = await response.json();
      setConvocatorias(data);
    } catch (err) {
      setError(`Error al cargar convocatorias: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e) => {
    setFormData(prev => ({ ...prev, fechaPublicacion: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = formData.id 
        ? `http://localhost:8080/api/convocatorias/${formData.id}` 
        : 'http://localhost:8080/api/convocatorias';

      const method = formData.id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(`Operación fallida: ${res.status} ${res.statusText}`);

      setFormData({ id: '', titulo: '', fechaPublicacion: '', descripcion: '' });
      await fetchConvocatorias();
      alert(formData.id ? '✅ Convocatoria actualizada' : '✅ Convocatoria creada');
    } catch (err) {
      setError(`❌ No se pudo guardar: ${err.message}`);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (conv) => {
    setFormData({ ...conv });
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar esta convocatoria?')) return;
    try {
      await fetch(`http://localhost:8080/api/convocatorias/${id}`, { method: 'DELETE' });
      await fetchConvocatorias();
    } catch (err) {
      alert(`No se pudo eliminar: ${err.message}`);
    }
  };

  return (
    <div style={{ marginLeft: '220px', padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="container-fluid">
        <h1 className="mb-4">📋 Crear Convocatoria</h1>

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
              {formData.id ? '✏️ Editar Convocatoria' : '➕ Nueva Convocatoria'}
            </h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="id" className="form-label fw-bold">ID Convocatoria</label>
                  <input
                    type="text"
                    className="form-control"
                    id="id"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="Ej: CONV-2025-001"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="fecha" className="form-label fw-bold">Fecha de Publicación</label>
                  <input
                    type="date"
                    className="form-control"
                    id="fecha"
                    name="fechaPublicacion"
                    value={formData.fechaPublicacion}
                    onChange={handleDateChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="titulo" className="form-label fw-bold">Título</label>
                  <input
                    type="text"
                    className="form-control"
                    id="titulo"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    placeholder="Ej: Convocatoria para Desarrollador Backend"
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="descripcion" className="form-label fw-bold">Descripción</label>
                  <textarea
                    className="form-control"
                    id="descripcion"
                    name="descripcion"
                    rows="3"
                    value={formData.descripcion}
                    onChange={handleChange}
                    placeholder="Detalles de la convocatoria..."
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
                      onClick={() => setFormData({ id: '', titulo: '', fechaPublicacion: '', descripcion: '' })}
                    >
                      Cancelar Edición
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Lista de convocatorias */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4">📋 Lista de Convocatorias</h2>
          {loading && <span className="text-muted">Cargando...</span>}
        </div>

        {convocatorias.length === 0 ? (
          <div className="alert alert-info d-flex align-items-center gap-2" role="alert">
            <i className="bi bi-info-circle-fill"></i>
            <span>No hay convocatorias registradas.</span>
          </div>
        ) : (
          <div className="row g-3">
            {convocatorias.map((conv) => (
              <div className="col-12" key={conv.id}>
                <div className="card border-left-primary shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 className="card-title mb-1">{conv.titulo}</h5>
                        <p className="text-muted small mb-1">
                          <i className="bi bi-tag"></i> ID: {conv.id} | 
                          <i className="bi bi-calendar ms-2"></i> {new Date(conv.fechaPublicacion).toLocaleDateString()}
                        </p>
                        <p className="card-text">{conv.descripcion.substring(0, 150)}{conv.descripcion.length > 150 ? '...' : ''}</p>
                      </div>
                      <div>
                        <button
                          className="btn btn-warning btn-sm me-1"
                          onClick={() => handleEdit(conv)}
                          title="Editar"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(conv.id)}
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

export default ConvocatoriaPage;