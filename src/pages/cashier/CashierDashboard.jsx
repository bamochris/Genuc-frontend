import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  StatCard,
  Badge,
} from '../../components/common';
import {
  CreditCardIcon,
  DocumentChartBarIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

/**
 * Dashboard Caissier - Gestion des paiements
 */

const CashierDashboard = () => {
  const navigate = useNavigate();
  const [user] = useState({
    name: 'Caissier User',
    email: 'cashier@university.edu',
    role: 'CASHIER',
  });

  const handleLogout = () => {
    toast.success('Déconnexion réussie');
    navigate('/login');
  };

  const stats = [
    {
      title: 'Encaissements Jour',
      value: '2,500,000 FC',
      subtitle: 'Aujourd\'hui',
      variant: 'success',
      icon: BanknotesIcon,
      trend: { positive: true, value: '+8%' },
    },
    {
      title: 'Nombre Transactions',
      value: '127',
      subtitle: 'Traitées',
      variant: 'primary',
      icon: CreditCardIcon,
    },
    {
      title: 'Montant Pending',
      value: '850,000 FC',
      subtitle: 'À confirmer',
      variant: 'warning',
      icon: DocumentChartBarIcon,
    },
  ];

  return (
    <DashboardLayout user={user} onLogout={handleLogout} userRole="CASHIER">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Dashboard Caissier</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Gestion des encaissements - {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Boutons d'action */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            icon={CreditCardIcon}
            onClick={() => navigate('/finances/cashier/collection')}
          >
            Gérer Encaissements
          </Button>
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            icon={DocumentChartBarIcon}
            onClick={() => navigate('/finances/reports')}
          >
            Voir Rapports
          </Button>
        </div>

        {/* Cartes d'information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card hover>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Encaissements par Méthode</h2>
            </CardHeader>
            <CardBody className="space-y-3">
              {[
                { method: 'Vodacom M-Pesa', amount: '1,200,000 FC', percent: '48%' },
                { method: 'Airtel Money', amount: '800,000 FC', percent: '32%' },
                { method: 'Orange Money', amount: '500,000 FC', percent: '20%' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.method}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{item.amount}</p>
                  </div>
                  <Badge variant="success">{item.percent}</Badge>
                </div>
              ))}
            </CardBody>
          </Card>

          <Card hover>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Statut Caisse</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Solde Ouverture</p>
                  <p className="font-semibold text-gray-900 dark:text-white">500,000 FC</p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Encaissements</p>
                  <p className="font-semibold text-green-600 dark:text-green-400">+2,500,000 FC</p>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-600">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Solde Actuel</p>
                  <p className="font-bold text-lg text-gray-900 dark:text-white">3,000,000 FC</p>
                </div>
              </div>
              <Button variant="primary" fullWidth>
                Clôturer Caisse
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CashierDashboard;
