
import React from 'react';

const Button = ({ label, onClick, style }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '8px',
        backgroundColor: '#243B55',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        ...style
      }}
    >
      {label}
    </button>
  );
};

export default Button;
