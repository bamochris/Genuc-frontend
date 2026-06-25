import { useCallback } from 'react';
import * as exchangeRateService from '../services/exchangeRateService';
import usePaymentStore from '../stores/paymentStore';
import toast from 'react-hot-toast';

/**
 * Hook personnalisé pour la gestion des taux de change
 */

export const useExchangeRate = () => {
  const store = usePaymentStore();

  const getCurrentRate = useCallback(async () => {
    store.setIsLoading(true);
    store.setError(null);
    try {
      const response = await exchangeRateService.getCurrentExchangeRate();
      store.setExchangeRate(response.rate);
      return response;
    } catch (error) {
      const errorMessage = error.message || 'Erreur lors de la récupération du taux';
      store.setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      store.setIsLoading(false);
    }
  }, [store]);

  const convert = useCallback(
    async (amount, from = 'FC', to = 'USD') => {
      try {
        const response = await exchangeRateService.convertCurrency(amount, from, to);
        return response;
      } catch (error) {
        const errorMessage = error.message || 'Erreur lors de la conversion';
        toast.error(errorMessage);
        throw error;
      }
    },
    []
  );

  return {
    exchangeRate: store.exchangeRate,
    isLoading: store.isLoading,
    error: store.error,
    getCurrentRate,
    convert,
    convertFcToUsd: (amount) => convert(amount, 'FC', 'USD'),
    convertUsdToFc: (amount) => convert(amount, 'USD', 'FC'),
  };
};

export default useExchangeRate;
