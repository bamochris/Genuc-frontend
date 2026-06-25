import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  StatCard,
  Modal,
  Badge,
} from '../components/common';
import { DashboardLayout } from '../components/layout';
import { usePayments } from '../hooks/usePayments';
import { useReports } from '../hooks/useReports';
import { CreditCardIcon, DocumentChartBarIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

/**
 * Dashboard Étudiant professionnel
 */

const StudentDashboard = () => {
  const { statistics, isLoading: paymentLoading } = usePayments();
  const { generateDailyReport } = useReports();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user] = useState({
    name: 'Jean Dupont',
    email: 'jean@university.edu',
    role: 'Étudiant',
  });

  const stats = [
    {
      title: 'Montant Payé',
      value: '500,000 FC',
      subtitle: 'Frais de scolarité',
      variant: 'success',
      trend: { positive: true, value: '+15%' },
    },
    {
      title: 'À Payer',
      value: '75,000 FC',
      subtitle: 'Frais administratifs',
      variant: 'warning',
      trend: { positive: false, value: '-5%' },
    },
    {
      title: 'Dernier Paiement',
      value: '25/06/2024',
      subtitle: 'Frais de bibliothèque',
      variant: 'default',
    },
  ];

  const handleMakePayment = () => {
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout user={user} userRole="STUDENT" onLogout={() => {}}>
      {/* Header */}
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Bienvenue, {user.name} 👋
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            icon={CreditCardIcon}
            onClick={handleMakePayment}
          >
            Effectuer un Paiement
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} icon={CreditCardIcon} />
        ))}
      </div>

      {/* Cartes de contenu */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transactions Récentes */}
        <Card hover>
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Transactions Récentes</h2>
          </CardHeader>
          <CardBody className="space-y-3">
            {[
              { code: 'TXN-001', amount: '500,000 FC', status: 'CONFIRMED', date: '25/06/2024' },
              { code: 'TXN-002', amount: '50,000 FC', status: 'PENDING', date: '24/06/2024' },
              { code: 'TXN-003', amount: '25,000 FC', status: 'CONFIRMED', date: '23/06/2024' },
            ].map((tx) => (
              <div key={tx.code} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{tx.code}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{tx.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 dark:text-white">{tx.amount}</p>
                  <Badge variant={tx.status === 'CONFIRMED' ? 'success' : 'warning'} size="sm">
                    {tx.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Informations Compte */}
        <Card hover>
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Mon Compte</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Nom Complet</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Statut</p>
              <Badge variant="success">Actif</Badge>
            </div>
            <Button variant="outline" fullWidth className="mt-4">
              Éditer le Profil
            </Button>
          </CardBody>
        </Card>
      </div>

      {/* Modal Paiement */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Effectuer un Paiement"
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Annuler
            </Button>
            <Button variant="primary">Continuer</Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">Formulaire de paiement</p>
          {/* Intégrer le formulaire de paiement ici */}
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default StudentDashboard;
