import './select.css';

export const Select = ({ children, onValueChange, defaultValue }) => (
  <select
    className="custom-select"
    onChange={(e) => onValueChange(e.target.value)}
    value={defaultValue}
  >
    {children}
  </select>
);

export const SelectTrigger = ({ children }) => (
  <div className="select-trigger">{children}</div>
);

export const SelectValue = ({ placeholder }) => (
  <option value="" disabled hidden>{placeholder}</option>
);

export const SelectContent = ({ children }) => <>{children}</>;

export const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);