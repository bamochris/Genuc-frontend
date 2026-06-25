import apiClient from './axios';
import ENDPOINTS from './apiEndpoints';

/**
 * Service pour la gestion des paiements
 * Intégration avec le backend Spring Boot
 */

// Initier un paiement
export const initiatePayment = async (paymentData) => {
  try {
    const response = await apiClient.post(ENDPOINTS.INITIATE_PAYMENT, paymentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Traiter un paiement
export const processPayment = async (transactionId) => {
  try {
    const response = await apiClient.post(ENDPOINTS.PROCESS_PAYMENT(transactionId));
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Confirmer un paiement (webhook)
export const confirmPayment = async (providerTransactionId, confirmedAmount) => {
  try {
    const response = await apiClient.post(ENDPOINTS.CONFIRM_PAYMENT, null, {
      params: {
        providerTransactionId,
        confirmedAmount,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Obtenir les statistiques de paiement
export const getPaymentStatistics = async (universiteId) => {
  try {
    const response = await apiClient.get(ENDPOINTS.GET_PAYMENT_STATISTICS(universiteId));
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Traiter un remboursement
export const processRefund = async (transactionId, refundData) => {
  try {
    const response = await apiClient.post(
      ENDPOINTS.PROCESS_REFUND(transactionId),
      refundData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default {
  initiatePayment,
  processPayment,
  confirmPayment,
  getPaymentStatistics,
  processRefund,
};
