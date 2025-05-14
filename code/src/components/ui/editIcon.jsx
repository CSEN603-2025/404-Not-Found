import React from "react";

function EditIcon({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className={`bi bi-pencil ${className}`}
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M12.146.854a.5.5 0 0 1 .708 0l2.292 2.292a.5.5 0 0 1 0 .708l-9.5 9.5a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l9.5-9.5zM11.207 3L13 4.793 14.793 3 13 1.207 11.207 3zM10.5 3.707 2 12.207V14h1.793l8.5-8.5-1.793-1.793z" />
    </svg>
  );
}

export default EditIcon;