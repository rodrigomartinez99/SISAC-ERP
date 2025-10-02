// src/features/tax/pages/TaxConfigPage.jsx
import React, { useState } from 'react';
import Sidebar from '@ui/Sidebar.jsx';
import Navbar from '@ui/Navbar.jsx';
import { User, Settings, Upload, CheckCircle } from 'lucide-react';

const TaxConfigPage = ({ user, onLogout }) => {
  const [taxpayerData, setTaxpayerData] = useState({
    ruc: '',
    businessName: '',
    taxRegime: '',
    fiscalAddress: '',
    bankAccount: '',
    legalRepresentative: ''
  });
  const [taxParameters, setTaxParameters] = useState({
    igvPercentage: '',
    invoiceSeries: '',
    ticketSeries: '',
    igvAccount: ''
  });
  const [fileSelected, setFileSelected] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleTaxpayerChange = (field, value) => {
    setTaxpayerData(prev => ({ ...prev, [field]: value }));
  };

  const handleParametersChange = (field, value) => {
    setTaxParameters(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveTaxpayer = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSaveParameters = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleFileUpload = (e) => {
    setFileSelected(e.target.files.length > 0);
  };

  const handleActivateProfile = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar user={user} onLogout={onLogout} />
        <div className="dashboard-content p-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Configuración Tributaria – Perfil del Contribuyente</h1>
          
          <div className="space-y-6">
            {/* Alta de Contribuyente */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <User className="w-5 h-5 mr-3 text-blue-600" /> 
                Alta de Contribuyente
              </h3>
              
              <form onSubmit={handleSaveTaxpayer} className="grid grid-cols-2 gap-4 mb-4">
                <input 
                  type="text" 
                  placeholder="RUC"
                  value={taxpayerData.ruc}
                  onChange={(e) => handleTaxpayerChange('ruc', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <input 
                  type="text" 
                  placeholder="Razón Social"
                  value={taxpayerData.businessName}
                  onChange={(e) => handleTaxpayerChange('businessName', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <input 
                  type="text" 
                  placeholder="Régimen Tributario"
                  value={taxpayerData.taxRegime}
                  onChange={(e) => handleTaxpayerChange('taxRegime', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <input 
                  type="text" 
                  placeholder="Domicilio Fiscal"
                  value={taxpayerData.fiscalAddress}
                  onChange={(e) => handleTaxpayerChange('fiscalAddress', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <input 
                  type="text" 
                  placeholder="Cuenta Bancaria"
                  value={taxpayerData.bankAccount}
                  onChange={(e) => handleTaxpayerChange('bankAccount', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <input 
                  type="text" 
                  placeholder="Representante Legal"
                  value={taxpayerData.legalRepresentative}
                  onChange={(e) => handleTaxpayerChange('legalRepresentative', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                
                <div className="col-span-2">
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 font-medium"
                  >
                    Guardar y continuar
                  </button>
                </div>
              </form>
              
              {saved && (
                <p className="text-green-600 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Datos guardados exitosamente
                </p>
              )}
            </div>

            {/* Parámetros Tributarios Mínimos */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <Settings className="w-5 h-5 mr-3 text-green-600" /> 
                Parámetros Tributarios Mínimos
              </h3>
              
              <form onSubmit={handleSaveParameters} className="grid grid-cols-2 gap-4 mb-4">
                <input 
                  type="text" 
                  placeholder="Porcentaje IGV"
                  value={taxParameters.igvPercentage}
                  onChange={(e) => handleParametersChange('igvPercentage', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                />
                <input 
                  type="text" 
                  placeholder="Serie Facturas"
                  value={taxParameters.invoiceSeries}
                  onChange={(e) => handleParametersChange('invoiceSeries', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                />
                <input 
                  type="text" 
                  placeholder="Serie Boletas"
                  value={taxParameters.ticketSeries}
                  onChange={(e) => handleParametersChange('ticketSeries', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                />
                <input 
                  type="text" 
                  placeholder="Cuenta Contable IGV"
                  value={taxParameters.igvAccount}
                  onChange={(e) => handleParametersChange('igvAccount', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                />
                
                <div className="col-span-2">
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 font-medium"
                  >
                    Confirmar y continuar
                  </button>
                </div>
              </form>
              
              {saved && (
                <p className="text-green-600 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Parámetros guardados exitosamente
                </p>
              )}
            </div>

            {/* Carga de Catálogo de Productos/Servicios */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <Upload className="w-5 h-5 mr-3 text-purple-600" /> 
                Carga de Catálogo de Productos/Servicios
              </h3>
              
              <form onSubmit={handleActivateProfile} className="space-y-4">
                <input 
                  type="file" 
                  onChange={handleFileUpload}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                  accept=".csv,.xlsx,.xls"
                />
                
                <p className="text-gray-600 text-sm">
                  Puedes cargar un archivo <code className="bg-gray-100 px-2 py-1 rounded">CatalogoCarga.csv</code> o registrar ítems manualmente.
                </p>
                
                <button 
                  type="submit"
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 font-medium"
                  disabled={!fileSelected}
                >
                  Validar y Activar Perfil
                </button>
              </form>
              
              {saved && (
                <p className="mt-3 text-green-600 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Perfil activado exitosamente
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxConfigPage;