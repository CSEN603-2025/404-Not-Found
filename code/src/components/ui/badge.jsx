import React from 'react';

export const Badge = ({ children, variant = 'default', className, ...props }) => {
  const variantStyles = {
    default: 'bg-green-500 text-white',
    outline: 'border border-gray-300 text-gray-700',
    secondary: 'bg-gray-200 text-gray-800',
    destructive: 'bg-red-500 text-white',
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};