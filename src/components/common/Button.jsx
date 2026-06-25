import React, { useState } from 'react';

/**
 * Système de Design - Boutons Professionnels
 * Variants: primary, secondary, danger, success, outline
 * Sizes: sm, md, lg, xl
 */

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  loading = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const baseStyles =
    'font-semibold rounded-lg transition duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  const darkModeVariants = {
    primary: 'dark:bg-blue-700 dark:hover:bg-blue-800',
    secondary: 'dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
    danger: 'dark:bg-red-700 dark:hover:bg-red-800',
    success: 'dark:bg-green-700 dark:hover:bg-green-800',
    outline: 'dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900',
    ghost: 'dark:text-gray-300 dark:hover:bg-gray-700',
  };

  const classes = `
    ${baseStyles}
    ${variants[variant]}
    ${darkModeVariants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {Icon && iconPosition === 'left' && !loading && <Icon className="h-5 w-5" />}
      {children}
      {Icon && iconPosition === 'right' && !loading && <Icon className="h-5 w-5" />}
    </button>
  );
};

export default Button;
