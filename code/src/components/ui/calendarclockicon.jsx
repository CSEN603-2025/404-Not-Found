import React from 'react';

export const CalendarClockIcon = ({ className, ...props }) => {
  return (
    <svg
      className={`w-4 h-4 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M21 7.5V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h10" />
      <path d="M16 2v4M8 2v4M3 10h12" />
      <path d="M17.5 17.5L16 16.25V14" />
      <path d="M22 16.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
    </svg>
  );
};