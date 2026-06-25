import { useCallback } from 'react';
import * as paymentService from '../services/paymentService';
import usePaymentStore from '../stores/paymentStore';
import toast from 'react-hot-toast';

/**
 * Hook personnalisé pour la gestion des paiements
 */

export const usePayments = () => {
  const store = usePaymentStore();

  const initiatePayment = useCallback(
    async (paymentData) => {
      store.setIsLoading(true);
      store.setError(null);
      try {
        const response = await paymentService.initiatePayment(paymentData);
        store.setCurrentTransaction(response);
        store.addTransaction(response);
        toast.success('Paiement initié avec succès');
        return response;
      } catch (error) {
        const errorMessage = error.message || 'Erreur lors de l\'initiation du paiement';
        store.setError(errorMessage);
        toast.error(errorMessage);
        throw error;
      } finally {
        store.setIsLoading(false);
      }
    },
    [store]
  );

  const processPayment = useCallback(
    async (transactionId) => {
      store.setIsLoading(true);
      store.setError(null);
      try {
        const response = await paymentService.processPayment(transactionId);
        store.updateTransaction(transactionId, response);
        toast.success('Paiement traité avec succès');
        return response;
      } catch (error) {
        const errorMessage = error.message || 'Erreur lors du traitement du paiement';
        store.setError(errorMessage);
        toast.error(errorMessage);
        throw error;
      } finally {
        store.setIsLoading(false);
      }
    },
    [store]
  );

  const getStatistics = useCallback(
    async (universiteId) => {
      store.setIsLoading(true);
      store.setError(null);
      try {
        const response = await paymentService.getPaymentStatistics(universiteId);
        store.setStatistics(response);
        return response;
      } catch (error) {
        const errorMessage = error.message || 'Erreur lors de la récupération des statistiques';
        store.setError(errorMessage);
        toast.error(errorMessage);
        throw error;
      } finally {
        store.setIsLoading(false);
      }
    },
    [store]
  );

  return {
    transactions: store.transactions,
    currentTransaction: store.currentTransaction,
    isLoading: store.isLoading,
    error: store.error,
    statistics: store.statistics,
    initiatePayment,
    processPayment,
    getStatistics,
    clearError: store.clearError,
  };
};

export default usePayments;
