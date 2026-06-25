import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { usePayments } from '../../hooks/usePayments';
import { useReports } from '../../hooks/useReports';
import usePaymentStore from '../../stores/paymentStore';
import useReportStore from '../../stores/reportStore';

/**
 * Dashboard Admin Université
 * Vue d'ensemble complète des opérations universitaires avec intégration paiements
 */

const AdminUniversiteDashboard = () => {
  const { getStatistics: getPaymentStats, isLoading: paymentLoading } = usePayments();
  const { generateDailyReport, isLoading: reportLoading } = useReports();
  const { statistics: paymentStats } = usePaymentStore();
  const { currentReport } = useReportStore();

  const [dashboardStats, setDashboardStats] = useState({
    totalStudents: 5432,
    totalDepartments: 12,
    totalPrograms: 45,
    activeUsers: 1250,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      await getPaymentStats(1); // universiteId = 1
      // Simuler chargement du rapport du jour
      await generateDailyReport(1, new Date().toISOString().split('T')[0], 1);
    } catch (error) {
      console.error('Erreur chargement dashboard:', error);
      toast.error('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard Admin Université</h1>

      {/* Cartes principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg shadow border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm mb-1">Étudiants</p>
          <p className="text-3xl font-bold text-blue-600">{dashboardStats.totalStudents.toLocaleString()}</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow border-l-4 border-green-500">
          <p className="text-gray-600 text-sm mb-1">Départements</p>
          <p className="text-3xl font-bold text-green-600">{dashboardStats.totalDepartments}</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg shadow border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm mb-1">Programmes</p>
          <p className="text-3xl font-bold text-purple-600">{dashboardStats.totalPrograms}</p>
        </div>
        <div className="bg-orange-50 p-6 rounded-lg shadow border-l-4 border-orange-500">
          <p className="text-gray-600 text-sm mb-1">Utilisateurs Actifs</p>
          <p className="text-3xl font-bold text-orange-600">{dashboardStats.activeUsers.toLocaleString()}</p>
        </div>
      </div>

      {/* Section Paiements */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">📊 Statistiques Paiements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paymentStats ? (
            <>
              <div className="bg-white p-6 rounded-lg shadow border-t-4 border-green-500">
                <p className="text-gray-600 text-sm mb-2">Total Collecté</p>
                <p className="text-3xl font-bold text-green-600">
                  {paymentStats.total_collected_fc?.toLocaleString()} FC
                </p>
                <p className="text-xs text-gray-500 mt-2">Taux: {paymentStats.collection_rate?.toFixed(1)}%</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow border-t-4 border-blue-500">
                <p className="text-gray-600 text-sm mb-2">Étudiants Payés</p>
                <p className="text-3xl font-bold text-blue-600">
                  {paymentStats.students_paid?.toLocaleString()}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow border-t-4 border-purple-500">
                <p className="text-gray-600 text-sm mb-2">Équivalent USD</p>
                <p className="text-3xl font-bold text-purple-600">
                  ${(paymentStats.total_collected_fc / 2500)?.toFixed(0)}
                </p>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Chargement des statistiques...</p>
          )}
        </div>
      </div>

      {/* Rapport du jour */}
      {currentReport && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">📈 Rapport du Jour</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 text-sm mb-2">Transactions</p>
              <p className="text-2xl font-bold">{currentReport.numberOfTransactions}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 text-sm mb-2">Collecté</p>
              <p className="text-2xl font-bold text-green-600">
                {currentReport.totalCollectedFc?.toLocaleString()} FC
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 text-sm mb-2">En Attente</p>
              <p className="text-2xl font-bold text-yellow-600">
                {currentReport.totalPendingFc?.toLocaleString()} FC
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 text-sm mb-2">Taux Collecte</p>
              <p className="text-2xl font-bold text-purple-600">
                {currentReport.collectionRate?.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Actions rapides */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">⚡ Actions Rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold">
            💳 Gérer les Paiements
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold">
            📊 Générer Rapports
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold">
            🔄 Réconciliation
          </button>
          <button className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-semibold">
            👥 Gérer Utilisateurs
          </button>
        </div>
      </div>

      {/* Alertes et notifications */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">🔔 Alertes</h2>
        <div className="space-y-3">
          <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
            <p className="font-semibold">⚠️ Frais Non Payés</p>
            <p className="text-sm">2,345 étudiants n'ont pas encore payé leur frais de scolarité</p>
          </div>
          <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded">
            <p className="font-semibold">⏰ Échéances Approchantes</p>
            <p className="text-sm">Les frais de bibliothèque sont dus dans 3 jours</p>
          </div>
          <div className="p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 rounded">
            <p className="font-semibold">ℹ️ Rapport Généré</p>
            <p className="text-sm">Le rapport de recouvrement du mois dernier est prêt à l'export</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUniversiteDashboard;
