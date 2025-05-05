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
      <path d="M3 21h18M6 18v-9a3 3 0 013-3h6a3 3 0 013 3v9M9 6v-3h6v3M6 21v-3h12v3M9 9h.01M12 9h.01M15 9h.01M9 12h.01M12 12h.01M15 12h.01M9 15h.01M12 15h.01M15 15h.01" />
    </svg>
  );
};