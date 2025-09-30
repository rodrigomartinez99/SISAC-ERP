import React, { useState } from "react";

export default function DailyOpsPage() {
  const [ventas, setVentas] = useState([]);
  const [compras, setCompras] = useState([]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6">
        Operación Diaria – Ventas y Compras
      </h1>

      {/* Registro de ventas */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">Emisión de CPE</h2>
        <form
          className="grid grid-cols-2 gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setVentas([
              ...ventas,
              { cliente: "Cliente demo", total: "S/ 118.00" },
            ]);
          }}
        >
          <input
            className="border p-2 rounded"
            placeholder="Cliente (RUC/DNI)"
          />
          <input className="border p-2 rounded" placeholder="Ítems" />
          <button className="col-span-2 px-4 py-2 bg-indigo-600 text-white rounded">
            Generar CPE
          </button>
        </form>

        <table className="mt-4 w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Cliente</th>
              <th className="p-2 border">Total</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((v, i) => (
              <tr key={i}>
                <td className="p-2 border">{v.cliente}</td>
                <td className="p-2 border">{v.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Registro de compras */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="font-semibold text-lg mb-4">Registro de Compras</h2>
        <form
          className="grid grid-cols-2 gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setCompras([
              ...compras,
              { proveedor: "Proveedor demo", monto: "S/ 59.00" },
            ]);
          }}
        >
          <input className="border p-2 rounded" placeholder="Proveedor (RUC)" />
          <input className="border p-2 rounded" placeholder="Monto" />
          <button className="col-span-2 px-4 py-2 bg-green-600 text-white rounded">
            Registrar Compra
          </button>
        </form>

        <table className="mt-4 w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Proveedor</th>
              <th className="p-2 border">Monto</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((c, i) => (
              <tr key={i}>
                <td className="p-2 border">{c.proveedor}</td>
                <td className="p-2 border">{c.monto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
