import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

/**
 * Dropdown menu professionnel avec dark mode
 */

const Dropdown = ({ trigger, children, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
      >
        {trigger}
        <ChevronDownIcon className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <div className="py-2" onClick={() => setIsOpen(false)}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

const DropdownItem = ({ children, icon: Icon, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 flex items-center gap-2 transition ${className}`}
  >
    {Icon && <Icon className="h-4 w-4" />}
    {children}
  </button>
);

export { Dropdown, DropdownItem };
