import React from "react";

function DeleteIcon({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className={`bi bi-trash ${className}`}
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M5.5 5.5A.5.5 0 0 1 6 5h4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5H6a.5.5 0 0 1-.5-.5v-7zM4.118 4.5 4 4.5V13a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V4.5h-.118L10.5 4h-5l-.382.5zM3.5 3a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1H15a.5.5 0 0 1 0 1h-1v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V4H1a.5.5 0 0 1 0-1h2.5z" />
    </svg>
  );
}

export default DeleteIcon;