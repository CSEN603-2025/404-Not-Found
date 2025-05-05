import './button.css';

export const Button = ({ className, children, onClick, ...props }) => {
  return (
    <button
      className={`custom-button ${className || ''}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};