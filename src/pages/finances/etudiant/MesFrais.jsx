import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useExchangeRate } from '../../hooks/useExchangeRate';
import usePaymentStore from '../../stores/paymentStore';

/**
 * Mes Frais - Affiche les frais académiques de l'étudiant
 * Intégration avec le taux de change backend
 */

const MesFrais = () => {
  const { exchangeRate, getCurrentRate, convertFcToUsd } = useExchangeRate();
  const { statistics } = usePaymentStore();
  const [frais, setFrais] = useState([
    {
      id: 1,
      type: 'Frais de Scolarité',
      montantFc: 500000,
      statut: 'PAID',
      dateEchéance: '2024-01-30',
      datePayment: '2024-01-25',
    },
    {
      id: 2,
      type: 'Frais Administratifs',
      montantFc: 50000,
      statut: 'PENDING',
      dateEchéance: '2024-02-15',
      datePayment: null,
    },
    {
      id: 3,
      type: 'Frais de Bibliothèque',
      montantFc: 25000,
      statut: 'PENDING',
      dateEchéance: '2024-02-28',
      datePayment: null,
    },
  ]);

  const [convertedFrais, setConvertedFrais] = useState([]);

  useEffect(() => {
    getCurrentRate();
  }, [getCurrentRate]);

  // Convertir tous les frais en USD
  useEffect(() => {
    if (exchangeRate) {
      const converted = frais.map((f) => ({
        ...f,
        montantUsd: (f.montantFc / exchangeRate).toFixed(2),
      }));
      setConvertedFrais(converted);
    }
  }, [frais, exchangeRate]);

  const totalFc = frais.reduce((sum, f) => sum + f.montantFc, 0);
  const totalPaid = frais
    .filter((f) => f.statut === 'PAID')
    .reduce((sum, f) => sum + f.montantFc, 0);
  const totalDue = frais
    .filter((f) => f.statut === 'PENDING')
    .reduce((sum, f) => sum + f.montantFc, 0);
  const totalUsd = exchangeRate ? (totalFc / exchangeRate).toFixed(2) : null;

  const getStatutColor = (statut) => {
    return statut === 'PAID'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mes Frais Académiques</h1>

      {/* Résumé financier */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-6 rounded-lg shadow border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm mb-1">Total Frais</p>
          <p className="text-2xl font-bold text-blue-600">{totalFc.toLocaleString()} FC</p>
          {totalUsd && <p className="text-xs text-gray-500 mt-1">${totalUsd} USD</p>}
        </div>

        <div className="bg-green-50 p-6 rounded-lg shadow border-l-4 border-green-500">
          <p className="text-gray-600 text-sm mb-1">Payé</p>
          <p className="text-2xl font-bold text-green-600">{totalPaid.toLocaleString()} FC</p>
          {exchangeRate && (
            <p className="text-xs text-gray-500 mt-1">${(totalPaid / exchangeRate).toFixed(2)} USD</p>
          )}
        </div>

        <div className="bg-red-50 p-6 rounded-lg shadow border-l-4 border-red-500">
          <p className="text-gray-600 text-sm mb-1">À Payer</p>
          <p className="text-2xl font-bold text-red-600">{totalDue.toLocaleString()} FC</p>
          {exchangeRate && (
            <p className="text-xs text-gray-500 mt-1">${(totalDue / exchangeRate).toFixed(2)} USD</p>
          )}
        </div>

        <div className="bg-purple-50 p-6 rounded-lg shadow border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm mb-1">Taux Actuel</p>
          <p className="text-2xl font-bold text-purple-600">
            {exchangeRate ? exchangeRate.toFixed(2) : '-'} FC/USD
          </p>
          <p className="text-xs text-gray-500 mt-1">1 USD</p>
        </div>
      </div>

      {/* Tableau des frais */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Type de Frais</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Montant (FC)</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Montant (USD)</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Statut</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Échéance</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date Paiement</th>
              </tr>
            </thead>
            <tbody>
              {convertedFrais.map((frais) => (
                <tr key={frais.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold">{frais.type}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">
                    {frais.montantFc.toLocaleString()} FC
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">${frais.montantUsd}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatutColor(frais.statut)}`}>
                      {frais.statut === 'PAID' ? 'Payé' : 'En Attente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(frais.dateEchéance).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {frais.datePayment
                      ? new Date(frais.datePayment).toLocaleDateString('fr-FR')
                      : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Avertissement frais en retard */}
      {totalDue > 0 && (
        <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
          <p className="font-semibold">⚠️ Frais en Attente</p>
          <p className="text-sm mt-1">
            Vous avez {totalDue.toLocaleString()} FC ({exchangeRate ? `$${(totalDue / exchangeRate).toFixed(2)}` : '?'}) à payer. Veuillez régulariser votre situation.
          </p>
        </div>
      )}
    </div>
  );
};

export default MesFrais;
