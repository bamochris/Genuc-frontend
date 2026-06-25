import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Alert } from '../components/common';
import { AuthLayout } from '../components/layout';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

/**
 * Page d'accueil avant connexion
 */

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 dark:from-gray-900 dark:to-gray-800">
      {/* Navbar simple */}
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">GENUC</h1>
          <Button variant="primary" onClick={() => navigate('/login')}>
            Se Connecter
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-white">
        <h2 className="text-5xl font-bold mb-4">Bienvenue sur GENUC</h2>
        <p className="text-xl text-blue-100 mb-8">Plateforme de Gestion Universitaire Nationale</p>
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate('/login')}
          className="bg-white text-blue-600 hover:bg-blue-50"
        >
          Accéder à la Plateforme
        </Button>
      </div>
    </div>
  );
};

export default Home;
