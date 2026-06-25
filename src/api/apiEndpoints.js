// Endpoints de l'API GENUC Backend
const API_BASE = 'http://localhost:8080/api/v1';

export const ENDPOINTS = {
  // Authentification
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  CHECK_PERMISSION: '/authorization/check-permission',
  GET_USER_PERMISSIONS: (userId) => `/authorization/user/${userId}/permissions`,
  GET_USER_ROLES: (userId, universiteId) => `/authorization/user/${userId}/roles/${universiteId}`,
  ASSIGN_ROLE: '/authorization/assign-role',
  REVOKE_ROLE: '/authorization/revoke-role',

  // Paiements
  INITIATE_PAYMENT: '/payments/initiate',
  PROCESS_PAYMENT: (transactionId) => `/payments/${transactionId}/process`,
  CONFIRM_PAYMENT: '/payments/confirm',
  GET_PAYMENT_STATISTICS: (universiteId) => `/payments/statistics/${universiteId}`,
  PROCESS_REFUND: (transactionId) => `/payments/${transactionId}/refund`,

  // Taux de change
  GET_CURRENT_EXCHANGE_RATE: '/exchange-rates/current',
  CONVERT_CURRENCY: '/exchange-rates/convert',
  UPDATE_EXCHANGE_RATE: '/exchange-rates/update',

  // Réconciliation
  CREATE_RECONCILIATION: '/reconciliation/create',
  MATCH_TRANSACTIONS: (reconciliationId) => `/reconciliation/${reconciliationId}/match`,
  GET_RECONCILIATION_REPORT: (reconciliationId) => `/reconciliation/${reconciliationId}/report`,

  // Rapports
  GENERATE_DAILY_REPORT: '/reports/daily',
  GENERATE_MONTHLY_REPORT: '/reports/monthly',
  GET_PAYMENT_SUMMARY: '/reports/summary-by-method',
};

export default ENDPOINTS;
