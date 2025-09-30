import React, { useState } from "react";

export default function MonthlyClosingPage() {
  const [status, setStatus] = useState("pendiente");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6">
        Cierre Mensual – Declaraciones Tributarias
      </h1>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">
          Consolidación y Cálculo de IGV
        </h2>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded"
          onClick={() => setStatus("calculado")}
        >
          Ejecutar Cálculo
        </button>
        {status === "calculado" && (
          <p className="mt-4 text-green-700">
            Cálculo realizado. Borrador de declaración generado:{" "}
            <code>BorradorCalculo_202509.xlsx</code>
          </p>
        )}
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">
          Formularios y Reportes Exportables
        </h2>
        <ul className="list-disc list-inside">
          <li>Form 621 (PDF/Excel)</li>
          <li>Resumen IGV</li>
          <li>Libro de Ventas y Compras</li>
          <li>Paquete ZIP para SUNAT</li>
        </ul>
        <button
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
          onClick={() => alert("Archivos generados correctamente")}
        >
          Generar Paquete
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="font-semibold text-lg mb-4">
          Revisión y Aprobación Final
        </h2>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded mr-2"
          onClick={() => setStatus("aprobado")}
        >
          Aprobar
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded"
          onClick={() => setStatus("ajustes")}
        >
          Solicitar Ajustes
        </button>

        {status === "aprobado" && (
          <p className="mt-4 text-green-700">
            Declaración aprobada. Paquete disponible para descarga.
          </p>
        )}
        {status === "ajustes" && (
          <p className="mt-4 text-yellow-700">
            Ajustes requeridos. Regrese al módulo de cálculo.
          </p>
        )}
      </div>
    </div>
  );
}
