import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

/**
 * Layout principal pour les pages authentifiées
 */

const DashboardLayout = ({ children, user, onLogout, userRole = 'STUDENT' }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <Navbar user={user} onLogout={onLogout} />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden pt-16">
        {/* Sidebar */}
        <Sidebar onLogout={onLogout} userRole={userRole} />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto ml-64 lg:ml-20">
          <div className="p-6 space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
