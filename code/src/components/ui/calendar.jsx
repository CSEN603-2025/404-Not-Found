import React from 'react';

export const Calendar = ({ selected, onSelect, className, ...props }) => {
  // Simplified calendar; you may want to use a library like react-datepicker
  return (
    <input
      type="date"
      value={selected ? selected.toISOString().split('T')[0] : ''}
      onChange={(e) => onSelect(new Date(e.target.value))}
      className={`border rounded p-2 ${className}`}
      {...props}
    />
  );
};