import React from 'react';

export function RegistrationSuccess({ companyName, onRegisterAnother, onNavigateToForm }) {
  return (
    <div className="registration-success">
      <h1>Registration Successful!</h1>
      <p>Congratulations, {companyName}, your registration is complete.</p>
      <button onClick={onRegisterAnother}>Register Another Company</button>
      <button onClick={onNavigateToForm}>Go Back to Form</button> {/* Example button */}
    </div>
  );
}