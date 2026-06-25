/**
 * Configuration des routes de l'application
 */

export const ROUTES = {
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',

  // Student
  STUDENT_DASHBOARD: '/student/dashboard',
  STUDENT_PAYMENTS: '/finances/student/payments',
  STUDENT_FEES: '/finances/student/fees',
  PAYMENT_HISTORY: '/finances/student/history',

  // Admin
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_PAYMENTS: '/admin/payments',
  ADMIN_REPORTS: '/admin/reports',

  // Cashier
  CASHIER_DASHBOARD: '/cashier/dashboard',
  CASHIER_COLLECTION: '/finances/cashier/collection',
  CASHIER_REPORTS: '/finances/reports',

  // Finance
  FINANCE_DASHBOARD: '/finances/dashboard',
  FINANCE_REPORTS: '/finances/reports',

  // Other
  PROFILE: '/profile',
  SETTINGS: '/settings',
  NOT_FOUND: '/404',
};

export default ROUTES;
