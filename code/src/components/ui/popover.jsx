import React from 'react';

export const Popover = ({ children, className, ...props }) => {
  return (
    <div className={`relative ${className}`} {...props}>
      {children}
    </div>
  );
};

export const PopoverTrigger = ({ children, className, ...props }) => {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export const PopoverContent = ({ children, className, ...props }) => {
  return (
    <div className={`absolute z-10 bg-white border rounded shadow-lg p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};