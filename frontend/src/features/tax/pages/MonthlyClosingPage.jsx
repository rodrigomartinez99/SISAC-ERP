// src/features/tax/pages/MonthlyClosingPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '@ui/Sidebar.jsx';
import Navbar from '@ui/Navbar.jsx';
import { Calculator, FileText, Package, CheckCircle, AlertTriangle } from 'lucide-react';

const MonthlyClosingPage = ({ user, onLogout }) => {
  const [calculationStatus, setCalculationStatus] = useState('pending');
  const [packageGenerated, setPackageGenerated] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState('pending');

  const handleCalculate = () => {
    setCalculationStatus('completed');
  };

  const handleGeneratePackage = () => {
    setPackageGenerated(true);
  };

  const handleApprove = () => {
    setApprovalStatus('approved');
  };

  const handleRequestAdjustments = () => {
    setApprovalStatus('adjustments');
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar user={user} onLogout={onLogout} />
        <div className="dashboard-content p-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Cierre Mensual – Declaraciones Tributarias</h1>
          
          <div className="space-y-6">
            {/* Consolidación y Cálculo de IGV */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <Calculator className="w-5 h-5 mr-3 text-blue-600" /> 
                Consolidación y Cálculo de IGV
              </h3>
              <button 
                onClick={handleCalculate}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 font-medium"
              >
                Ejecutar Cálculo
              </button>
              
              {calculationStatus === 'completed' && (
                <p className="mt-3 text-green-600 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Cálculo realizado. Borrador de declaración generado:
                  <code className="ml-2 bg-gray-100 px-2 py-1 rounded text-sm">BorradorCalculo_202509.xlsx</code>
                </p>
              )}
            </div>

            {/* Formularios y Reportes Exportables */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <FileText className="w-5 h-5 mr-3 text-green-600" /> 
                Formularios y Reportes Exportables
              </h3>
              
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>Form 621 (PDF/Excel)</li>
                <li>Resumen IGV</li>
                <li>Libro de Ventas y Compras</li>
                <li>Paquete ZIP para SUNAT</li>
              </ul>
              
              <button 
                onClick={handleGeneratePackage}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 font-medium"
              >
                Generar Paquete
              </button>
              
              {packageGenerated && (
                <p className="mt-3 text-green-600 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Paquete generado exitosamente
                </p>
              )}
            </div>

            {/* Revisión y Aprobación Final */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <Package className="w-5 h-5 mr-3 text-purple-600" /> 
                Revisión y Aprobación Final
              </h3>
              
              <div className="flex space-x-3">
                <button 
                  onClick={handleApprove}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 font-medium"
                >
                  Aprobar
                </button>
                <button 
                  onClick={handleRequestAdjustments}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 font-medium"
                >
                  Solicitar Ajustes
                </button>
              </div>
              
              {approvalStatus === 'approved' && (
                <p className="mt-3 text-green-600 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Declaración aprobada. Paquete disponible para descarga.
                </p>
              )}
              
              {approvalStatus === 'adjustments' && (
                <p className="mt-3 text-orange-600 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Se han solicitado ajustes en la declaración.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyClosingPage;