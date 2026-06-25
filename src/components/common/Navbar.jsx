import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import ThemeToggle from './ThemeToggle';
import { Dropdown, DropdownItem } from './Dropdown';
import Button from './Button';

/**
 * Navbar professionnelle avec logout et dark mode
 */

const Navbar = ({ user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">GENUC</div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Platform</span>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
              Accueil
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
              Services
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
              À propos
            </a>
          </div>

          {/* Droite - Theme + User */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {user ? (
              <Dropdown
                trigger={
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white hidden sm:inline">
                      {user.name}
                    </span>
                  </div>
                }
              >
                <DropdownItem onClick={() => {}}>
                  👤 Mon Profil
                </DropdownItem>
                <DropdownItem onClick={() => {}}>
                  ⚙️ Paramètres
                </DropdownItem>
                <DropdownItem onClick={() => {}}>
                  💬 Aide
                </DropdownItem>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <DropdownItem onClick={onLogout} className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900">
                  🚪 Déconnexion
                </DropdownItem>
              </Dropdown>
            ) : (
              <Button variant="primary" size="sm">
                Se Connecter
              </Button>
            )}

            {/* Menu Mobile */}
            <button
              className="md:hidden p-2 text-gray-600 dark:text-gray-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <a href="#" className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              Accueil
            </a>
            <a href="#" className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              Services
            </a>
            <a href="#" className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              À propos
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
