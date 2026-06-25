import React, { useState } from 'react';
import {
  ChevronLeftIcon,
  HomeIcon,
  CreditCardIcon,
  DocumentChartBarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

/**
 * Sidebar professionnel avec dark mode et collapsible
 */

const Sidebar = ({ onLogout, userRole = 'STUDENT' }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = {
    STUDENT: [
      { icon: HomeIcon, label: 'Dashboard', href: '/student/dashboard' },
      { icon: CreditCardIcon, label: 'Paiements', href: '/finances/student/payments' },
      { icon: DocumentChartBarIcon, label: 'Mes Frais', href: '/finances/student/fees' },
      { icon: Cog6ToothIcon, label: 'Paramètres', href: '/settings' },
    ],
    ADMIN: [
      { icon: HomeIcon, label: 'Dashboard', href: '/admin/dashboard' },
      { icon: CreditCardIcon, label: 'Paiements', href: '/admin/payments' },
      { icon: DocumentChartBarIcon, label: 'Rapports', href: '/admin/reports' },
      { icon: Cog6ToothIcon, label: 'Paramètres', href: '/admin/settings' },
    ],
    CASHIER: [
      { icon: HomeIcon, label: 'Dashboard', href: '/cashier/dashboard' },
      { icon: CreditCardIcon, label: 'Encaissement', href: '/finances/cashier/collection' },
      { icon: DocumentChartBarIcon, label: 'Rapports', href: '/finances/reports' },
    ],
  };

  const currentMenu = menuItems[userRole] || menuItems.STUDENT;

  return (
    <aside
      className={`
        bg-gray-900 dark:bg-gray-950 text-white
        transition-all duration-300 fixed left-0 top-16 h-[calc(100vh-64px)]
        ${isCollapsed ? 'w-20' : 'w-64'}
        border-r border-gray-800
        flex flex-col
      `}
    >
      {/* Header avec collapse button */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        {!isCollapsed && <h2 className="font-bold text-lg">Menu</h2>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-gray-800 rounded transition"
        >
          <ChevronLeftIcon className={`h-5 w-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 p-4">
          {currentMenu.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-800 transition text-gray-300 hover:text-white group"
                  title={item.label}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition text-white font-medium text-sm"
          title="Déconnexion"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
