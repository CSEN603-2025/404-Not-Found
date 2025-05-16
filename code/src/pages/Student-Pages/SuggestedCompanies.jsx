import React, { useState } from 'react';
import { mockSuggestedCompanies } from '../../data/mock-data-Student';
import SaveIcon from '../../components/ui/SaveIcon'; // Import the SaveIcon component
import '../../components/ui/SaveIcon'; // Import the provided CSS for the SaveIcon

function SuggestedCompanies() {
  const [jobInterests, setJobInterests] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // Tabs: 'all', 'suggested', 'saved'
  const [savedCompanies, setSavedCompanies] = useState([]);

  const handleFindCompanies = () => {
    console.log('Finding companies for:', jobInterests);
  };

  const handleSaveCompany = (company) => {
    if (!savedCompanies.some((saved) => saved.id === company.id)) {
      setSavedCompanies([...savedCompanies, company]);
    }
  };

  const handleRemoveSavedCompany = (companyId) => {
    setSavedCompanies(savedCompanies.filter((company) => company.id !== companyId));
  };

  const filteredCompanies =
    activeTab === 'suggested'
      ? mockSuggestedCompanies.filter((company) =>
          company.name.toLowerCase().includes(jobInterests.toLowerCase())
        )
      : activeTab === 'saved'
      ? savedCompanies
      : mockSuggestedCompanies;

  return (
    <div style={{ maxWidth: 800, margin: '32px auto', background: '#fff', borderRadius: 12, padding: '24px 32px' }}>
      {/* Job Interests Section */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#d32f2f', marginBottom: 16 }}>Your Job Interests</h2>
      <textarea
        value={jobInterests}
        onChange={(e) => setJobInterests(e.target.value)}
        placeholder="e.g., software development, frontend technologies, AI, product management in tech startups..."
        style={{
          width: '100%',
          minHeight: 80,
          padding: '12px',
          borderRadius: 8,
          border: '1.5px solid #e0e0e0',
          background: '#f6f7fa',
          fontSize: '1rem',
          color: '#6a6a6a',
          marginBottom: 8,
          resize: 'none',
        }}
      />
      <p style={{ fontSize: '0.9rem', color: '#4d6a7a', marginBottom: 16 }}>
        Describe your ideal job, skills, or industries you're interested in.
      </p>
      <button
        onClick={handleFindCompanies}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          background: '#43a047',
          color: '#fff',
          fontSize: '1rem',
          fontWeight: 600,
          padding: '12px 24px',
          borderRadius: 8,
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(67, 160, 71, 0.2)',
        }}
      >
        Find Companies
      </button>

      {/* Tabs Section */}
      <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        {['all', 'suggested', 'saved'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: activeTab === tab ? '#43a047' : 'none',
              color: activeTab === tab ? '#fff' : '#000',
              border: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              padding: '8px 16px',
              borderRadius: 8,
              cursor: 'pointer',
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Companies
          </button>
        ))}
      </div>

      {/* Company Cards Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {filteredCompanies.map((company) => (
          <div
            key={company.id}
            style={{
              background: '#fff',
              border: '1px solid #e0e0e0',
              borderRadius: 12,
              padding: '16px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            <div style={{ marginBottom: 12 }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>{company.name}</h3>
              <p style={{ fontSize: '0.9rem', color: '#6a6a6a', margin: 0 }}>{company.industry}</p>
              <p style={{ fontSize: '0.9rem', color: '#6a6a6a', margin: 0 }}>{company.location}</p>
              {company.recommendation && (
                <p style={{ fontSize: '0.8rem', color: '#4d6a7a', marginTop: 8 }}>{company.recommendation}</p>
              )}
            </div>
            {activeTab === 'saved' ? (
              <button
                onClick={() => handleRemoveSavedCompany(company.id)}
                style={{
                  width: '100%',
                  padding: '8px 0',
                  background: '#d32f2f',
                  color: '#fff',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  borderRadius: 8,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Remove
              </button>
            ) : (
              <button
                onClick={() => handleSaveCompany(company)}
                className="bookmarkBtn" // Apply the provided CSS class
              >
                <SaveIcon /> {/* Use the SaveIcon component */}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuggestedCompanies;