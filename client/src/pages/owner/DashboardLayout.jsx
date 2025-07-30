import React from "react";
import NavbarOwner from "../../components/owner/NavbarOwner";
import Sidebar from "../../components/owner/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar area */}
      <div className="w-64 h-full bg-white border-r border-gray-200">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <NavbarOwner />
        <main className="flex-grow overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
