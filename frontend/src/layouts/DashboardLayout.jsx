import React, { useState } from 'react';
import { LayoutDashboard, Settings, Calculator, BarChart3, User, LogOut, ReceiptText, Briefcase } from 'lucide-react';

const ROLES = {
  ADMIN: 'Administrador',
  EMPLOYEE: 'Empleado',
};

const MOCK_USER_INFO = {
  name: 'Alex Johnson',
  initials: 'AJ',
};

const SideBar = ({ role, currentPage, setPage }) => {
  const adminNav = [
    { name: 'Dashboard', icon: LayoutDashboard, page: 'dashboard' },
    { name: 'Maestros y Config', icon: Settings, page: 'masters' },
    { name: 'Liquidación', icon: Calculator, page: 'liquidation' },
    { name: 'Reportes y Salidas', icon: BarChart3, page: 'reports' },
  ];

  if (role !== ROLES.ADMIN) {
    return (
      <div className="w-0 bg-gray-800 text-white flex flex-col h-full fixed shadow-xl overflow-hidden" />
    );
  }

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col h-full fixed shadow-xl">
      <div className="p-6 text-2xl font-bold text-indigo-400 border-b border-gray-700">SISAC 💸</div>
      <nav className="flex-1 p-4 space-y-2">
        {adminNav.map((item) => (
          <button
            key={item.page}
            onClick={() => setPage(item.page)}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition duration-200 font-medium ${
              currentPage === item.page ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-gray-700 text-gray-300'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </button>
        ))}
      </nav>
      <div className="p-4 text-sm text-gray-400 border-t border-gray-700">
        Rol: <span className="capitalize font-medium text-indigo-300">{role}</span>
      </div>
    </div>
  );
};

const UserMenu = ({ role, setRole, setPage, isMenuOpen, setIsMenuOpen }) => {
  const navigateToSpecialPage = (pageName) => {
    console.log(`Navigating to special page: ${pageName}`);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-medium hover:ring-2 hover:ring-indigo-300 transition shadow-md"
      >
        {MOCK_USER_INFO.initials}
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 transform origin-top-right animate-scaleIn">
          <div className="p-4 border-b">
            <p className="font-bold text-gray-800">{MOCK_USER_INFO.name}</p>
            <p className="text-sm text-gray-500 capitalize">Rol: {role}</p>
          </div>
          
          <nav className="p-2 space-y-1">
            <button
              onClick={() => navigateToSpecialPage('edit-profile')}
              className="w-full flex items-center p-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium"
            >
              <User className="w-5 h-5 mr-3 text-indigo-500" />
              Editar Perfil
            </button>

            <button
              onClick={() => navigateToSpecialPage('self-service')}
              className="w-full flex items-center p-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium"
            >
              <ReceiptText className="w-5 h-5 mr-3 text-green-500" />
              Mi Nómina (Autoservicio)
            </button>

            <hr className="my-1 border-gray-100" />

            <div className="pt-2">
              <span className="px-3 text-xs font-semibold uppercase text-gray-400">Cambiar Rol</span>
              <button
                onClick={() => { setRole(ROLES.ADMIN); setPage('dashboard'); setIsMenuOpen(false); }}
                className={`w-full flex items-center p-3 text-sm rounded-lg transition font-medium ${role === ROLES.ADMIN ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <Briefcase className="w-5 h-5 mr-3" />
                Administrador
              </button>
              <button
                onClick={() => { setRole(ROLES.EMPLOYEE); setPage('self-service'); setIsMenuOpen(false); }}
                className={`w-full flex items-center p-3 text-sm rounded-lg transition font-medium ${role === ROLES.EMPLOYEE ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <User className="w-5 h-5 mr-3" />
                Empleado
              </button>
            </div>

            <hr className="my-1 border-gray-100" />
            
            <button
              onClick={() => { console.log('Cerrando sesión...'); setIsMenuOpen(false); }}
              className="w-full flex items-center p-3 text-sm text-red-600 rounded-lg hover:bg-red-50 transition font-medium"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Cerrar Sesión
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

const Navbar = ({ role, currentPage, setPage, setRole }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const formatPageName = (page) => {
    if (page === 'self-service') return 'Mi Nómina';
    return page.charAt(0).toUpperCase() + page.slice(1);
  };

  return (
    <header className="h-16 bg-white shadow-md flex items-center justify-between px-6 sticky top-0 z-40">
      <h1 className="text-xl font-semibold text-gray-800">
        {formatPageName(currentPage)}
      </h1>

      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-500 hidden sm:inline">
          Rol activo: <span className="font-bold text-indigo-600 capitalize">{role}</span>
        </span>
        <UserMenu
          role={role}
          setRole={setRole}
          setPage={setPage}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      </div>
    </header>
  );
};

const DashboardLayout = ({ role, currentPage, setPage, children }) => {
  const [currentRole, setCurrentRole] = useState(role);

  const handleRoleChange = (newRole) => {
    setCurrentRole(newRole);
    setPage(newRole === ROLES.ADMIN ? 'dashboard' : 'self-service');
  };

  const isEmployee = currentRole === ROLES.EMPLOYEE;
  const sidebarMarginClass = isEmployee ? 'lg:ml-0' : 'lg:ml-64';

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      <style>{`
        .animate-scaleIn {
          animation: scaleIn 0.15s ease-out forwards;
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <script src="https://cdn.tailwindcss.com"></script>

      <SideBar
        role={currentRole}
        currentPage={currentPage}
        setPage={setPage}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 w-full ${sidebarMarginClass}`}>
        <Navbar
          role={currentRole}
          currentPage={currentPage}
          setPage={setPage}
          setRole={handleRoleChange}
        />
        
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
