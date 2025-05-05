import React from 'react';

export const Table = ({ children, className, ...props }) => {
  return (
    <table className={`min-w-full border-collapse ${className}`} {...props}>
      {children}
    </table>
  );
};

export const TableHeader = ({ children, className, ...props }) => {
  return (
    <thead className={`bg-gray-100 ${className}`} {...props}>
      {children}
    </thead>
  );
};

export const TableBody = ({ children, className, ...props }) => {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  );
};

export const TableRow = ({ children, className, ...props }) => {
  return (
    <tr className={`border-b ${className}`} {...props}>
      {children}
    </tr>
  );
};

export const TableCell = ({ children, className, ...props }) => {
  return (
    <td className={`px-4 py-2 ${className}`} {...props}>
      {children}
    </td>
  );
};