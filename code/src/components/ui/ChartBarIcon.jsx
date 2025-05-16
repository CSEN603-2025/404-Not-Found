import React from "react";
export default function ChartBarIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" width={18} height={18} {...props}>
      <rect x="3" y="10" width="3" height="7" rx="1" fill="currentColor" />
      <rect x="8.5" y="6" width="3" height="11" rx="1" fill="currentColor" />
      <rect x="14" y="3" width="3" height="14" rx="1" fill="currentColor" />
    </svg>
  );
}