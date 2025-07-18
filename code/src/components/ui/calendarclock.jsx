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
      <path d="M21 7v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7" />
      <path d="M3 10h18M16 2v4M8 2v4" />
      <path d="M12 14v4l2 1" />
    </svg>
  );
};