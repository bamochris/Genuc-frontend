import React from 'react';

/**
 * Loading Skeleton pour les états de chargement
 */

const Skeleton = ({ className = '', count = 1 }) => {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={`bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-300 dark:to-gray-800 animate-pulse rounded ${className}`}
          />
        ))}
    </>
  );
};

export default Skeleton;
