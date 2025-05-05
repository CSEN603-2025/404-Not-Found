import './card.css';

export const Card = ({ className, children }) => (
  <div className={`card ${className || ''}`}>{children}</div>
);

export const CardHeader = ({ className, children }) => (
  <div className={`card-header ${className || ''}`}>{children}</div>
);

export const CardTitle = ({ className, children }) => (
  <h2 className={`card-title ${className || ''}`}>{children}</h2>
);

export const CardDescription = ({ className, children }) => (
  <p className={`card-description ${className || ''}`}>{children}</p>
);

export const CardContent = ({ className, children }) => (
  <div className={`card-content ${className || ''}`}>{children}</div>
);

export const CardFooter = ({ className, children }) => (
  <div className={`card-footer ${className || ''}`}>{children}</div>
);