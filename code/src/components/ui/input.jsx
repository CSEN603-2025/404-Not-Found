import './input.css';

export const Input = ({ className, ...props }) => (
  <input className={`custom-input ${className || ''}`} {...props} />
);