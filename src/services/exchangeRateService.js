import apiClient from '../api/axios';
import ENDPOINTS from '../api/apiEndpoints';

/**
 * Service pour la gestion des taux de change FC/USD
 */

// Obtenir le taux de change actuel
export const getCurrentExchangeRate = async () => {
  try {
    const response = await apiClient.get(ENDPOINTS.GET_CURRENT_EXCHANGE_RATE);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Convertir une devise
export const convertCurrency = async (amount, from = 'FC', to = 'USD') => {
  try {
    const response = await apiClient.get(ENDPOINTS.CONVERT_CURRENCY, {
      params: { amount, from, to },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Mettre à jour le taux de change
export const updateExchangeRate = async (newRate, source = 'MANUAL') => {
  try {
    const response = await apiClient.post(ENDPOINTS.UPDATE_EXCHANGE_RATE, {
      newRate,
      source,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Convertir FC vers USD
export const convertFcToUsd = async (amountFc) => {
  return convertCurrency(amountFc, 'FC', 'USD');
};

// Convertir USD vers FC
export const convertUsdToFc = async (amountUsd) => {
  return convertCurrency(amountUsd, 'USD', 'FC');
};

export default {
  getCurrentExchangeRate,
  convertCurrency,
  updateExchangeRate,
  convertFcToUsd,
  convertUsdToFc,
};
