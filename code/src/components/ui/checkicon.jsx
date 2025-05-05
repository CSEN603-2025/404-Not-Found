import React from 'react';

export const CheckIcon = ({ className, ...props }) => {
  return (
    <svg
      className={`w-4 h-4 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};