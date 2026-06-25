/**
 * Utilitaires de formatage
 */

export const formatCurrency = (value, currency = 'FC', locale = 'fr-FR') => {
  if (!value) return '0 ' + currency;
  const num = parseFloat(value);
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num) + ' ' + currency;
};

export const formatDate = (date, locale = 'fr-FR') => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString(locale);
};

export const formatDateTime = (date, locale = 'fr-FR') => {
  if (!date) return '-';
  return new Date(date).toLocaleString(locale);
};

export const formatTime = (date, locale = 'fr-FR') => {
  if (!date) return '-';
  return new Date(date).toLocaleTimeString(locale);
};

export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
};

export const formatEmail = (email) => {
  if (!email) return '';
  return email.toLowerCase();
};

export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

export const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default {
  formatCurrency,
  formatDate,
  formatDateTime,
  formatTime,
  formatPhoneNumber,
  formatEmail,
  truncateText,
  capitalizeFirstLetter,
};
