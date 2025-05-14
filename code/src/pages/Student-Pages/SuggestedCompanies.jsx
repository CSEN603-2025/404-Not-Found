import React from 'react';

function SuggestedCompanies({ suggestedCompanies }) {
  return (
    <div className="suggested-companies">
      <h3>Suggested Companies</h3>
      <div className="company-cards">
        {suggestedCompanies.map((company) => (
          <div key={company.id} className="company-card">
            <h4>{company.name}</h4>
            <p><strong>Industry:</strong> {company.industry}</p>
            <p><strong>Location:</strong> {company.location}</p>
            <p><strong>Recommendation:</strong> {company.recommendation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuggestedCompanies;