import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import * as reconciliationService from '../../services/reconciliationService';
import { usePayments } from '../../hooks/usePayments';

/**
 * Encaissement Caissier - Gestion des encaissements
 * Intégration avec les paiements backend
 */

const Encaissement = () => {
  const { getStatistics, isLoading: paymentLoading } = usePayments();
  const [encaissements, setEncaissements] = useState([
    {
      id: 1,
      reference: 'TXN-2024-001',
      montant: 500000,
      methode: 'VODACOM_MPESA',
      statut: 'CONFIRMED',
      date: '2024-06-20',
      agent: 'Agent 1',
    },
    {
      id: 2,
      reference: 'TXN-2024-002',
      montant: 250000,
      methode: 'AIRTEL_MONEY',
      statut: 'CONFIRMED',
      date: '2024-06-21',
      agent: 'Agent 2',
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    reference: '',
    montant: '',
    methode: 'VODACOM_MPESA',
  });
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      const stats = await getStatistics(1); // universiteId = 1
      setStatistics(stats);
    } catch (error) {
      console.error('Erreur chargement stats:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.reference || !formData.montant) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    // Ajouter à la liste
    const newEncaissement = {
      id: encaissements.length + 1,
      reference: formData.reference,
      montant: parseFloat(formData.montant),
      methode: formData.methode,
      statut: 'CONFIRMED',
      date: new Date().toISOString().split('T')[0],
      agent: 'Current User',
    };

    setEncaissements([...encaissements, newEncaissement]);
    setFormData({
      reference: '',
      montant: '',
      methode: 'VODACOM_MPESA',
    });
    setShowForm(false);
    toast.success('Encaissement enregistré');
    loadStatistics();
  };

  const totalEncaisse = encaissements.reduce((sum, e) => sum + e.montant, 0);
  const totalVodacom = encaissements
    .filter((e) => e.methode === 'VODACOM_MPESA')
    .reduce((sum, e) => sum + e.montant, 0);
  const totalAirtel = encaissements
    .filter((e) => e.methode === 'AIRTEL_MONEY')
    .reduce((sum, e) => sum + e.montant, 0);
  const totalOrange = encaissements
    .filter((e) => e.methode === 'ORANGE_MONEY')
    .reduce((sum, e) => sum + e.montant, 0);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gestion des Encaissements</h1>

      {/* Cartes de résumé */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-6 rounded-lg shadow border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm mb-1">Total Encaissé</p>
          <p className="text-2xl font-bold text-blue-600">{totalEncaisse.toLocaleString()} FC</p>
          <p className="text-xs text-gray-500 mt-1">{encaissements.length} transactions</p>
        </div>

        <div className="bg-red-50 p-6 rounded-lg shadow border-l-4 border-red-500">
          <p className="text-gray-600 text-sm mb-1">Vodacom M-Pesa</p>
          <p className="text-2xl font-bold text-red-600">{totalVodacom.toLocaleString()} FC</p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg shadow border-l-4 border-green-500">
          <p className="text-gray-600 text-sm mb-1">Airtel Money</p>
          <p className="text-2xl font-bold text-green-600">{totalAirtel.toLocaleString()} FC</p>
        </div>

        <div className="bg-orange-50 p-6 rounded-lg shadow border-l-4 border-orange-500">
          <p className="text-gray-600 text-sm mb-1">Orange Money</p>
          <p className="text-2xl font-bold text-orange-600">{totalOrange.toLocaleString()} FC</p>
        </div>
      </div>

      {/* Bouton ajouter encaissement */}
      <div className="mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700"
        >
          {showForm ? '✕ Annuler' : '+ Ajouter Encaissement'}
        </button>
      </div>

      {/* Formulaire */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Nouvel Encaissement</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Référence Transaction</label>
              <input
                type="text"
                name="reference"
                value={formData.reference}
                onChange={handleInputChange}
                placeholder="TXN-2024-xxx"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Montant (FC)</label>
              <input
                type="number"
                name="montant"
                value={formData.montant}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Méthode</label>
              <select
                name="methode"
                value={formData.methode}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="VODACOM_MPESA">Vodacom M-Pesa</option>
                <option value="AIRTEL_MONEY">Airtel Money</option>
                <option value="ORANGE_MONEY">Orange Money</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full px-6 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tableau encaissements */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Référence</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Montant</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Méthode</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Statut</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Agent</th>
              </tr>
            </thead>
            <tbody>
              {encaissements.map((enc) => (
                <tr key={enc.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-mono">{enc.reference}</td>
                  <td className="px-6 py-4 text-sm font-bold">{enc.montant.toLocaleString()} FC</td>
                  <td className="px-6 py-4 text-sm">{enc.methode}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      {enc.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(enc.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 text-sm">{enc.agent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Encaissement;
