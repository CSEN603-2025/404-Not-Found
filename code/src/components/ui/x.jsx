import React from 'react';

export const XIcon = ({ className, ...props }) => {
  return (
    <svg
      className={`w-4 h-4 ${className}`}
      viewBox="0 0 24 24"
      fill="white"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
};