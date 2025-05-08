import React from 'react';

export const Dialog = ({ open, onOpenChange, children, className, ...props }) => {
  if (!open) return null;
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 ${className}`}
      onClick={() => onOpenChange(false)}
      {...props}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export const DialogContent = ({ children, className, ...props }) => {
  return (
    <div
      className={`bg-card rounded-lg p-6 max-w-lg w-full border border-border shadow-lg ${className}`}
      {...props}
    >
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
    <h2 className={`text-lg font-semibold text-foreground ${className}`} {...props}>
      {children}
    </h2>
  );
};

export const DialogDescription = ({ children, className, ...props }) => {
  return (
    <p className={`text-sm text-muted-foreground ${className}`} {...props}>
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