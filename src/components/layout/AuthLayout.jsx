import React from 'react';

/**
 * Layout pour pages d'authentification
 */

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">GENUC</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Plateforme de Gestion Universitaire</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
