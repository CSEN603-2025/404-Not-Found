import React from 'react';

export const BuildingIcon = ({ className, ...props }) => {
  return (
    <svg
      className={`w-4 h-4 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M3 21h18M6 18v-9a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v9M9 6v-3h6v3" />
      <path d="M9 21v-6h6v6M9 9h2v2H9zm4 0h2v2h-2zm-4 4h2v2H9zm4 0h2v2h-2z" />
    </svg>
  );
};