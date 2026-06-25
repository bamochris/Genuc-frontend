import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { usePayments } from '../../hooks/usePayments';
import usePaymentStore from '../../stores/paymentStore';

/**
 * Historique des Paiements Étudiants
 * Affiche la liste des transactions de l'étudiant
 */

const HistoriquePaiements = () => {
  const { getStatistics, isLoading } = usePayments();
  const { transactions } = usePaymentStore();
  const [filter, setFilter] = useState('ALL');
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    // Charger les statistiques au démarrage
    const loadStats = async () => {
      try {
        await getStatistics(1); // universiteId = 1
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
      }
    };
    loadStats();
  }, [getStatistics]);

  // Filtrer les transactions
  useEffect(() => {
    if (!transactions) return;

    let filtered = transactions;
    if (filter !== 'ALL') {
      filtered = transactions.filter((t) => t.paymentStatus === filter);
    }
    setFilteredTransactions(filtered);
  }, [transactions, filter]);

  const getStatusBadgeColor = (status) => {
    const colors = {
      CONFIRMED: 'bg-green-100 text-green-800',
      PENDING: 'bg-yellow-100 text-yellow-800',
      PROCESSING: 'bg-blue-100 text-blue-800',
      FAILED: 'bg-red-100 text-red-800',
      REFUNDED: 'bg-purple-100 text-purple-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const totalPaid = transactions
    ?.filter((t) => t.paymentStatus === 'CONFIRMED')
    .reduce((sum, t) => sum + (t.amountFc || 0), 0) || 0;

  const totalPending = transactions
    ?.filter((t) => t.paymentStatus === 'PENDING')
    .reduce((sum, t) => sum + (t.amountFc || 0), 0) || 0;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Historique des Paiements</h1>

      {/* Cartes de résumé */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm mb-1">Total Payé</p>
          <p className="text-2xl font-bold text-green-600">{totalPaid.toLocaleString()} FC</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm mb-1">En Attente</p>
          <p className="text-2xl font-bold text-yellow-600">{totalPending.toLocaleString()} FC</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm mb-1">Total Transactions</p>
          <p className="text-2xl font-bold text-blue-600">{transactions?.length || 0}</p>
        </div>
      </div>

      {/* Filtres */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {['ALL', 'CONFIRMED', 'PENDING', 'PROCESSING', 'FAILED'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded font-semibold transition ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {status === 'ALL' ? 'Tous' : status}
          </button>
        ))}
      </div>

      {/* Tableau des transactions */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Chargement...</div>
        ) : filteredTransactions && filteredTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Code</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Montant</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Méthode</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Statut</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.transactionId} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-mono">{transaction.transactionCode}</td>
                    <td className="px-6 py-4 text-sm">{transaction.transactionType}</td>
                    <td className="px-6 py-4 text-sm font-semibold">
                      {transaction.amountFc?.toLocaleString()} FC
                    </td>
                    <td className="px-6 py-4 text-sm">{transaction.paymentMethod}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(transaction.paymentStatus)}`}>
                        {transaction.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {transaction.createdAt
                        ? new Date(transaction.createdAt).toLocaleDateString('fr-FR')
                        : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">Aucune transaction trouvée</div>
        )}
      </div>
    </div>
  );
};

export default HistoriquePaiements;
