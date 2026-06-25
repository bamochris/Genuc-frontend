import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  StatCard,
  Badge,
  Alert,
} from '../../components/common';
import {
  CreditCardIcon,
  DocumentChartBarIcon,
  UserGroupIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

/**
 * Dashboard Admin - Vue d'ensemble complète
 */

const AdminDashboard = () => {
  const [user] = useState({
    name: 'Admin User',
    email: 'admin@university.edu',
    role: 'ADMIN',
  });

  const handleLogout = () => {
    toast.success('Déconnexion réussie');
    // Rediriger vers login
  };

  const stats = [
    {
      title: 'Revenus Totaux',
      value: '15,000,000 FC',
      subtitle: 'Ce mois',
      variant: 'success',
      trend: { positive: true, value: '+12%' },
    },
    {
      title: 'Étudiants',
      value: '5,432',
      subtitle: 'Inscrits',
      variant: 'primary',
      trend: { positive: true, value: '+3%' },
    },
    {
      title: 'Paiements Pending',
      value: '2,345',
      subtitle: 'À traiter',
      variant: 'warning',
      trend: { positive: false, value: '-5%' },
    },
    {
      title: 'Taux Collecte',
      value: '87.5%',
      subtitle: 'Cet année',
      variant: 'success',
      trend: { positive: true, value: '+2.3%' },
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'Paiement reçu',
      description: 'Jean Dupont - 500,000 FC',
      time: '2 minutes',
      type: 'payment',
    },
    {
      id: 2,
      title: 'Rapport généré',
      description: 'Rapport journalier exporté',
      time: '1 heure',
      type: 'report',
    },
    {
      id: 3,
      title: 'Utilisateur créé',
      description: 'Nouveau caissier ajouté',
      time: '3 heures',
      type: 'user',
    },
  ];

  return (
    <DashboardLayout user={user} onLogout={handleLogout} userRole="ADMIN">
      {/* Header */}
      <div className="space-y-4 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Dashboard Admin</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Bienvenue, {user.name}! Voici votre vue d'ensemble.
        </p>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Alertes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Alert type="warning" showIcon>
          <strong>Attention:</strong> 2,345 frais non payés nécessitent suivi
        </Alert>
        <Alert type="info" showIcon>
          <strong>Info:</strong> Rapport mensuel prêt à l'export
        </Alert>
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activités récentes */}
        <div className="lg:col-span-2">
          <Card hover>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Activités Récentes</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border-l-4 border-blue-500"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-lg">
                      {activity.type === 'payment' && '💳'}
                      {activity.type === 'report' && '📊'}
                      {activity.type === 'user' && '👤'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{activity.description}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Il y a {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Actions rapides */}
        <Card hover>
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Actions Rapides</h2>
          </CardHeader>
          <CardBody className="space-y-3">
            <Button variant="primary" fullWidth icon={CreditCardIcon}>
              Gérer Paiements
            </Button>
            <Button variant="secondary" fullWidth icon={DocumentChartBarIcon}>
              Générer Rapports
            </Button>
            <Button variant="outline" fullWidth icon={UserGroupIcon}>
              Gérer Utilisateurs
            </Button>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
