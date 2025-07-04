import React from 'react';

export const FilterIcon = ({ className = '', ...props }) => {
  return (
    <svg
      className={`w-4 h-4 ${className}`} // Allow external styling via className
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
};