import React from 'react';
import Sidebar from '../../components/owner/Sidebar';
import NavbarOwner from '../../components/owner/NavbarOwner';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar (Fixed width) */}
      <div className="w-64 h-full bg-white border-r border-gray-200">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <NavbarOwner />
        <main className="flex-grow overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
