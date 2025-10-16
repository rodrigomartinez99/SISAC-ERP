// src/features/tax/pages/DailyOpsPage.jsx
import React, { useState } from 'react';
import Sidebar from '@ui/Sidebar.jsx';
import Navbar from '@ui/Navbar.jsx';
import { Receipt, ShoppingCart } from 'lucide-react';

const DailyOpsPage = ({ user, onLogout }) => {
  const [sales, setSales] = useState([
    { id: 1, client: 'Cliente demo', total: 118.00 }
  ]);
  const [purchases, setPurchases] = useState([
    { id: 1, supplier: 'Proveedor demo', amount: 59.00 }
  ]);
  const [newSale, setNewSale] = useState({ client: '', items: '' });
  const [newPurchase, setNewPurchase] = useState({ supplier: '', amount: '' });

  const handleAddSale = (e) => {
    e.preventDefault();
    if (newSale.client && newSale.items) {
      const sale = {
        id: sales.length + 1,
        client: newSale.client,
        total: Math.random() * 200 + 50
      };
      setSales([...sales, sale]);
      setNewSale({ client: '', items: '' });
    }
  };

  const handleAddPurchase = (e) => {
    e.preventDefault();
    if (newPurchase.supplier && newPurchase.amount) {
      const purchase = {
        id: purchases.length + 1,
        supplier: newPurchase.supplier,
        amount: parseFloat(newPurchase.amount)
      };
      setPurchases([...purchases, purchase]);
      setNewPurchase({ supplier: '', amount: '' });
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar user={user} onLogout={onLogout} />
        <div className="dashboard-content p-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Operación Diaria – Ventas y Compras</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Emisión de CPE */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <Receipt className="w-5 h-5 mr-3 text-blue-600" /> 
                Emisión de CPE
              </h3>
              
              <form onSubmit={handleAddSale} className="grid grid-cols-2 gap-3 mb-6">
                <input 
                  type="text" 
                  placeholder="Cliente (RUC/DNI)"
                  value={newSale.client}
                  onChange={(e) => setNewSale({...newSale, client: e.target.value})}
                  className="col-span-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <input 
                  type="text" 
                  placeholder="Ítems"
                  value={newSale.items}
                  onChange={(e) => setNewSale({...newSale, items: e.target.value})}
                  className="col-span-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <button 
                  type="submit"
                  className="col-span-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 font-medium"
                >
                  Generar CPE
                </button>
              </form>

              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">Cliente</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale) => (
                    <tr key={sale.id}>
                      <td className="border border-gray-300 px-4 py-2 text-gray-600">{sale.client}</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-600">S/ {sale.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Registro de Compras */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <ShoppingCart className="w-5 h-5 mr-3 text-green-600" /> 
                Registro de Compras
              </h3>
              
              <form onSubmit={handleAddPurchase} className="grid grid-cols-2 gap-3 mb-6">
                <input 
                  type="text" 
                  placeholder="Proveedor (RUC)"
                  value={newPurchase.supplier}
                  onChange={(e) => setNewPurchase({...newPurchase, supplier: e.target.value})}
                  className="col-span-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                />
                <input 
                  type="number" 
                  placeholder="Monto"
                  value={newPurchase.amount}
                  onChange={(e) => setNewPurchase({...newPurchase, amount: e.target.value})}
                  className="col-span-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                />
                <button 
                  type="submit"
                  className="col-span-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 font-medium"
                >
                  Registrar Compra
                </button>
              </form>

              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">Proveedor</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.map((purchase) => (
                    <tr key={purchase.id}>
                      <td className="border border-gray-300 px-4 py-2 text-gray-600">{purchase.supplier}</td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-600">S/ {purchase.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyOpsPage;