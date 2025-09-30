import React, { useState } from "react";

export default function TaxConfigPage() {
  const [step, setStep] = useState("perfil");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6">
        Configuración Tributaria – Perfil del Contribuyente
      </h1>

      {step === "perfil" && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="font-semibold text-lg mb-4">Alta de Contribuyente</h2>
          <form className="grid grid-cols-2 gap-4">
            <input className="border p-2 rounded" placeholder="RUC" />
            <input className="border p-2 rounded" placeholder="Razón Social" />
            <input
              className="border p-2 rounded"
              placeholder="Régimen Tributario"
            />
            <input
              className="border p-2 rounded"
              placeholder="Domicilio Fiscal"
            />
            <input
              className="border p-2 rounded"
              placeholder="Cuenta Bancaria"
            />
            <input
              className="border p-2 rounded"
              placeholder="Representante Legal"
            />
          </form>
          <button
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
            onClick={() => setStep("parametros")}
          >
            Guardar y continuar
          </button>
        </div>
      )}

      {step === "parametros" && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="font-semibold text-lg mb-4">
            Parámetros Tributarios Mínimos
          </h2>
          <form className="grid grid-cols-2 gap-4">
            <input className="border p-2 rounded" placeholder="Porcentaje IGV" />
            <input className="border p-2 rounded" placeholder="Serie Facturas" />
            <input className="border p-2 rounded" placeholder="Serie Boletas" />
            <input
              className="border p-2 rounded"
              placeholder="Cuenta Contable IGV"
            />
          </form>
          <button
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
            onClick={() => setStep("catalogo")}
          >
            Confirmar y continuar
          </button>
        </div>
      )}

      {step === "catalogo" && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="font-semibold text-lg mb-4">
            Carga de Catálogo de Productos/Servicios
          </h2>
          <input type="file" className="mb-4" />
          <p className="text-sm text-gray-600 mb-4">
            Puedes cargar un archivo <code>CatalogoCarga.csv</code> o registrar
            ítems manualmente.
          </p>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={() => alert("Validación OK – Perfil Fiscal activo")}
          >
            Validar y Activar Perfil
          </button>
        </div>
      )}
    </div>
  );
}
