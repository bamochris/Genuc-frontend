import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { usePayments } from '../../hooks/usePayments';
import { useExchangeRate } from '../../hooks/useExchangeRate';
import usePaymentStore from '../../stores/paymentStore';

/**
 * Paiements des étudiants - Intégration Backend
 * Permet à un étudiant d'initier un paiement via les providers RDC
 */

const EtudiantPaiements = () => {
  const { initiatePayment, processPayment, isLoading, error } = usePayments();
  const { exchangeRate, getCurrentRate, convertFcToUsd } = useExchangeRate();
  const { currentTransaction, transactions } = usePaymentStore();

  const [formData, setFormData] = useState({
    amountFc: '',
    paymentMethod: 'VODACOM_MPESA',
    transactionType: 'TUITION',
    description: '',
  });
  const [amountUsd, setAmountUsd] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // Récupérer le taux de change au chargement
  useEffect(() => {
    getCurrentRate();
  }, [getCurrentRate]);

  // Convertir FC en USD en temps réel
  useEffect(() => {
    if (formData.amountFc && exchangeRate) {
      const usd = (parseFloat(formData.amountFc) / exchangeRate).toFixed(2);
      setAmountUsd(usd);
    }
  }, [formData.amountFc, exchangeRate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amountFc || parseFloat(formData.amountFc) <= 0) {
      toast.error('Veuillez entrer un montant valide');
      return;
    }

    setShowConfirm(true);
  };

  const handleConfirmPayment = async () => {
    try {
      const paymentData = {
        studentId: 1, // À récupérer du contexte auth
        universiteId: 1, // À récupérer du contexte
        amountFc: parseFloat(formData.amountFc),
        transactionType: formData.transactionType,
        paymentMethod: formData.paymentMethod,
        description: formData.description || `Paiement ${formData.transactionType}`,
      };

      const transaction = await initiatePayment(paymentData);

      // Traiter le paiement
      if (transaction?.transactionId) {
        await processPayment(transaction.transactionId);
      }

      // Réinitialiser le formulaire
      setFormData({
        amountFc: '',
        paymentMethod: 'VODACOM_MPESA',
        transactionType: 'TUITION',
        description: '',
      });
      setShowConfirm(false);
    } catch (err) {
      console.error('Erreur paiement:', err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Effectuer un Paiement</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Formulaire de paiement */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Informations de Paiement</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Type de frais */}
            <div>
              <label className="block text-sm font-medium mb-2">Type de Frais</label>
              <select
                name="transactionType"
                value={formData.transactionType}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="TUITION">Frais de Scolarité</option>
                <option value="ACCOMMODATION">Logement</option>
                <option value="LIBRARY">Bibliothèque</option>
                <option value="SPORTS">Sports</option>
                <option value="OTHER">Autre</option>
              </select>
            </div>

            {/* Montant en FC */}
            <div>
              <label className="block text-sm font-medium mb-2">Montant (FC)</label>
              <input
                type="number"
                name="amountFc"
                value={formData.amountFc}
                onChange={handleInputChange}
                placeholder="Entrez le montant en Franc Congolais"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                min="0"
                step="1000"
              />
              {amountUsd && (
                <p className="text-sm text-gray-600 mt-1">
                  ≈ ${amountUsd} USD (Taux: 1 USD = {exchangeRate?.toFixed(2)} FC)
                </p>
              )}
            </div>

            {/* Méthode de paiement */}
            <div>
              <label className="block text-sm font-medium mb-2">Méthode de Paiement</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="VODACOM_MPESA">Vodacom M-Pesa</option>
                <option value="AIRTEL_MONEY">Airtel Money</option>
                <option value="ORANGE_MONEY">Orange Money</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">Description (optionnelle)</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Détails supplémentaires..."
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>

            {/* Message d'erreur */}
            {error && <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>}

            {/* Bouton submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isLoading ? 'Traitement...' : 'Confirmer le Paiement'}
            </button>
          </form>
        </div>

        {/* Résumé et historique */}
        <div className="space-y-6">
          {/* Résumé du paiement actuel */}
          {currentTransaction && (
            <div className="bg-green-50 p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <h3 className="text-lg font-semibold mb-3 text-green-800">Paiement en Cours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Code Transaction:</span>
                  <span className="font-mono">{currentTransaction.transactionCode}</span>
                </div>
                <div className="flex justify-between">
                  <span>Montant:</span>
                  <span>{currentTransaction.amountFc?.toLocaleString()} FC</span>
                </div>
                <div className="flex justify-between">
                  <span>Statut:</span>
                  <span className="font-semibold text-green-600">{currentTransaction.paymentStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span>Méthode:</span>
                  <span>{currentTransaction.paymentMethod}</span>
                </div>
              </div>
            </div>
          )}

          {/* Historique des paiements */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Historique des Paiements</h3>
            {transactions && transactions.length > 0 ? (
              <div className="space-y-3">
                {transactions.slice(-5).reverse().map((transaction) => (
                  <div
                    key={transaction.transactionId}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded border-l-2 border-blue-500"
                  >
                    <div>
                      <p className="font-semibold text-sm">{transaction.transactionCode}</p>
                      <p className="text-xs text-gray-600">{transaction.transactionType}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{transaction.amountFc?.toLocaleString()} FC</p>
                      <p
                        className={`text-xs ${
                          transaction.paymentStatus === 'CONFIRMED'
                            ? 'text-green-600'
                            : 'text-yellow-600'
                        }`}
                      >
                        {transaction.paymentStatus}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Aucun paiement effectué</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal de confirmation */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm">
            <h3 className="text-xl font-semibold mb-4">Confirmer le Paiement</h3>
            <div className="bg-gray-50 p-4 rounded mb-4 space-y-2">
              <div className="flex justify-between">
                <span>Montant:</span>
                <span className="font-bold">{formData.amountFc} FC</span>
              </div>
              <div className="flex justify-between">
                <span>Équivalent:</span>
                <span className="font-bold">${amountUsd} USD</span>
              </div>
              <div className="flex justify-between">
                <span>Méthode:</span>
                <span className="font-bold">{formData.paymentMethod}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded font-semibold hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmPayment}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700 disabled:bg-gray-400"
              >
                {isLoading ? 'Traitement...' : 'Confirmer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EtudiantPaiements;
