import React from 'react';

/**
 * Alerte professionnelle avec dark mode
 */

const Alert = ({ children, type = 'info', className = '', onClose, showIcon = true }) => {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  const types = {
    info: 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-100',
    success:
      'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700 text-green-800 dark:text-green-100',
    warning:
      'bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-100',
    error: 'bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700 text-red-800 dark:text-red-100',
  };

  const icons = {
    info: '👁️',
    success: '✅',
    warning: '⚠️',
    error: '❌',
  };

  const handleClose = () => {
    setIsVisible(false);
    onClose && onClose();
  };

  return (
    <div className={`border-l-4 p-4 rounded ${types[type]} ${className}`}>
      <div className="flex items-start">
        {showIcon && <span className="text-xl mr-3">{icons[type]}</span>}
        <div className="flex-1">{children}</div>
        <button
          onClick={handleClose}
          className="ml-4 text-xl font-bold hover:opacity-70 transition"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Alert;
