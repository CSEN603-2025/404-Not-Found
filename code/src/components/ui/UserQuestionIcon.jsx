import React from "react";
export default function UserQuestionIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" width={18} height={18} {...props}>
      <circle cx="10" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 17c0-2.485 3.358-4.5 7.5-4.5s7.5 2.015 7.5 4.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="15" r="1" fill="currentColor" />
      <path d="M10 11v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}