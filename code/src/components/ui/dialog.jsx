import React from 'react';

export const Dialog = ({ open, onOpenChange, children, ...props }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" {...props}>
      {children}
    </div>
  );
};

export const DialogContent = ({ children, className, ...props }) => {
  return (
    <div className={`bg-white rounded-lg p-6 max-w-lg w-full ${className}`} {...props}>
      {children}
    </div>
  );
};

export const DialogHeader = ({ children, className, ...props }) => {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const DialogTitle = ({ children, className, ...props }) => {
  return (
    <h2 className={`text-lg font-semibold ${className}`} {...props}>
      {children}
    </h2>
  );
};

export const DialogDescription = ({ children, className, ...props }) => {
  return (
    <p className={`text-sm text-gray-500 ${className}`} {...props}>
      {children}
    </p>
  );
};

export const DialogFooter = ({ children, className, ...props }) => {
  return (
    <div className={`mt-4 flex justify-end gap-2 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const DialogClose = ({ children, asChild, className, ...props }) => {
  return asChild ? (
    <div className={className} {...props}>
      {children}
    </div>
  ) : (
    <button className={`text-sm ${className}`} {...props}>
      {children}
    </button>
  );
};