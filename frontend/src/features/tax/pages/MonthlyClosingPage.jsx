import React, { useState } from "react";
import { useApiClient } from "../../../api/tax";

export default function MonthlyClosingPage() {
  const [periodo, setPeriodo] = useState(new Date().toISOString().slice(0, 7).replace("-","")); // "YYYYMM"
  const [declaracion, setDeclaracion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const api = useApiClient();
  const API_BASE_URL = "http://localhost:8081/api/tax/closing/descargar"; // Para enlaces

  const handleIniciarCierre = () => {
    setLoading(true);
    setMessage({ type: "", text: "" });
    setDeclaracion(null);
    
    api.iniciarCierre(periodo)
      .then(data => {
        setDeclaracion(data);
        setMessage({ type: "success", text: `Cálculo para ${periodo} completado. Listo para revisión.` });
        setLoading(false);
      })
      .catch(err => {
        setMessage({ type: "error", text: err.message });
        setLoading(false);
      });
  };

  const handleAprobar = (aprobado) => {
    if (!declaracion) return;
    
    setLoading(true);
    setMessage({ type: "", text: "" });
    
    api.aprobarDeclaracion(declaracion.id, aprobado)
      .then(data => {
        setDeclaracion(data);
        const msg = aprobado ? "Declaración APROBADA." : "Declaración RECHAZADA para ajustes.";
        setMessage({ type: "success", text: msg });
        setLoading(false);
      })
      .catch(err => {
        setMessage({ type: "error", text: err.message });
        setLoading(false);
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6">
        Cierre Mensual – Declaraciones Tributarias
      </h1>

      {message.text && (
        <div className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      {/* --- Paso 1: Iniciar Cierre --- */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">
          Consolidación y Cálculo de IGV
        </h2>
        <div className="flex gap-4">
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Periodo (YYYYMM)"
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-gray-400"
            onClick={handleIniciarCierre}
            disabled={loading}
          >
            {loading ? "Calculando..." : "Ejecutar Cálculo"}
          </button>
        </div>
      </div>

      {/* --- Paso 2 y 3: Revisión y Descarga --- */}
      {declaracion && (
        <div className="animate-fadeIn">
          {/* Resumen */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="font-semibold text-lg mb-2">Resumen del Cálculo (ID: {declaracion.id})</h2>
            <p className="mb-4">Estado: <strong className={`font-medium ${
                declaracion.estado === 'APROBADO_LISTO_PRESENTAR' ? 'text-green-600' : 
                declaracion.estado === 'RECHAZADO_AJUSTES' ? 'text-red-600' : 'text-yellow-600'
            }`}>{declaracion.estado}</strong></p>
            <div className="grid grid-cols-2 gap-4">
                <p>IGV Débito: <span className="font-mono">S/ {declaracion.igvDebito.toFixed(2)}</span></p>
                <p>IGV Crédito: <span className="font-mono">S/ {declaracion.igvCredito.toFixed(2)}</span></p>
                <p className="font-bold">IGV Neto: <span className="font-mono">S/ {declaracion.igvNeto.toFixed(2)}</span></p>
                <p className="font-bold">Renta: <span className="font-mono">S/ {declaracion.rentaPagoCuenta.toFixed(2)}</span></p>
            </div>
          </div>
        
          {/* Formularios y Reportes */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="font-semibold text-lg mb-4">
              Formularios y Reportes Exportables
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <a href={`${API_BASE_URL}/${declaracion.id}/borrador`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                  BorradorCalculo_{declaracion.periodo}.xlsx
                </a>
              </li>
              <li>
                <a href={`${API_BASE_URL}/${declaracion.id}/form621`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                  {declaracion.form621Pdf} (Form 621)
                </a>
              </li>
               <li>
                <a href={`${API_BASE_URL}/${declaracion.id}/resumen`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                  {declaracion.resumenIgvPdf} (Resumen IGV)
                </a>
              </li>
            </ul>
          </div>

          {/* Aprobación */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="font-semibold text-lg mb-4">
              Revisión y Aprobación Final
            </h2>
            
            {declaracion.estado === 'PENDIENTE_APROBACION' ? (
              <div className="flex gap-4">
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded"
                  onClick={() => handleAprobar(true)}
                  disabled={loading}
                >
                  Aprobar
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded"
                  onClick={() => handleAprobar(false)}
                  disabled={loading}
                >
                  Solicitar Ajustes
                </button>
              </div>
            ) : (
                <a href={`${API_BASE_URL}/${declaracion.id}/paquete`} 
                   className="px-6 py-3 bg-blue-600 text-white rounded font-medium inline-block hover:bg-blue-700"
                   target="_blank" rel="noopener noreferrer">
                    Descargar PaqueteDeclaracion.zip
                </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}