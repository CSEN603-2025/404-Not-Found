import './form.css';
import { Controller } from 'react-hook-form';

export const Form = ({ children, ...props }) => (
  <form {...props}>{children}</form>
);

export const FormItem = ({ children }) => (
  <div className="form-item">{children}</div>
);

export const FormLabel = ({ className, children }) => (
  <label className={`form-label ${className || ''}`}>{children}</label>
);

export const FormControl = ({ children }) => <>{children}</>;

export const FormDescription = ({ children }) => (
  <p className="form-description">{children}</p>
);

export const FormMessage = ({ children }) => (
  <p className="form-message">{children}</p>
);

// Correct FormField using Controller
export const FormField = ({ control, name, render }) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => render({ field, fieldState })}
  />
);