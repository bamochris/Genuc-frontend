import React from 'react';
import { Button, Alert } from '../components/common';
import { AuthLayout } from '../components/layout';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

/**
 * Page 404 - Non trouvé
 */

const NotFound = () => {
  return (
    <AuthLayout>
      <div className="text-center space-y-6">
        <div className="text-6xl font-bold text-gray-300 dark:text-gray-600">404</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Page non trouvée</h1>
        <p className="text-gray-600 dark:text-gray-400">Désolé, la page que vous recherchez n'existe pas.</p>
        <Button variant="primary" fullWidth>
          Retourner à l'accueil
        </Button>
      </div>
    </AuthLayout>
  );
};

export default NotFound;
