import React from "react";

export default function CalendarIcon({ style = {}, ...props }) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 20 20"
      fill="none"
      style={style}
      {...props}
    >
      <rect x="3" y="4" width="14" height="13" rx="2" stroke="#222" strokeWidth="1.5"/>
      <path d="M3 8h14" stroke="#222" strokeWidth="1.5"/>
      <path d="M7 2v4" stroke="#222" strokeWidth="1.5"/>
      <path d="M13 2v4" stroke="#222" strokeWidth="1.5"/>
    </svg>
  );
}