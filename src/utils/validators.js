/**
 * Utilitaires de validation
 */

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  // Minimum 8 caractères, au moins 1 majuscule, 1 minuscule, 1 chiffre
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

export const validatePhoneNumber = (phone) => {
  const regex = /^\+?[1-9]\d{1,14}$/;
  return regex.test(phone.replace(/[\D]/g, ''));
};

export const validateAmount = (amount) => {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value !== '';
};

export const validateMinLength = (value, minLength) => {
  return value && value.length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
  return value && value.length <= maxLength;
};

export const validateFileSize = (file, maxSize) => {
  return file && file.size <= maxSize;
};

export const validateFileType = (file, allowedTypes) => {
  return file && allowedTypes.includes(file.type);
};

export default {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateAmount,
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validateFileSize,
  validateFileType,
};
