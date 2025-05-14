import React, { useState } from 'react';
import '../styles/Clarification.css';

function Clarification({ onSubmit }) {
  const [clarification, setClarification] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (clarification.trim()) {
      if (onSubmit) onSubmit(clarification);
      setClarification('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  return (
    <div className="clarification-container">
      {showSuccess && (
        <div className="clarification-success-box">
          Clarification submitted successfully!
        </div>
      )}
      <h3>Submit Clarification</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="clarification">
          Please explain why the internship report was flagged or rejected:
        </label>
        <textarea
          id="clarification"
          value={clarification}
          onChange={e => setClarification(e.target.value)}
          required
        />
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Clarification;