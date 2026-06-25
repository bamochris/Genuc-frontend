import React from 'react';
import { CheckCircleIcon, ExclamationIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

/**
 * Boîte de statistiques professionnelle
 */

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
  className = '',
}) => {
  const variants = {
    default: 'bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500',
    success: 'bg-green-50 dark:bg-green-900 border-l-4 border-green-500',
    warning: 'bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-500',
    danger: 'bg-red-50 dark:bg-red-900 border-l-4 border-red-500',
  };

  const textVariants = {
    default: 'text-blue-600 dark:text-blue-400',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    danger: 'text-red-600 dark:text-red-400',
  };

  return (
    <div className={`p-6 rounded-lg ${variants[variant]} ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className={`text-3xl font-bold ${textVariants[variant]} mt-2`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{subtitle}</p>}
          {trend && (
            <p className={`text-sm mt-2 font-semibold ${trend.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {trend.positive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        {Icon && <Icon className={`h-8 w-8 ${textVariants[variant]}`} />}
      </div>
    </div>
  );
};

export default StatCard;
