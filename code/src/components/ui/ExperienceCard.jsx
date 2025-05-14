import React from 'react';

function ExperienceCard({ index, isRemovable, onRemove }) {
  return (
    <div style={{
      border: "1px solid #e0e0e0",
      borderRadius: 12,
      padding: "24px",
      marginBottom: "16px",
      background: "#f9f9f9"
    }}>
      <h3 style={{ fontWeight: 600, fontSize: "1.25rem", marginBottom: "16px" }}>
        Experience #{index + 1}
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={{ fontWeight: 500, display: "block", marginBottom: 8 }}>Company Name</label>
          <input
            type="text"
            placeholder="e.g., Google"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 8,
              border: "1px solid #e0e0e0",
              background: "#fff",
              fontSize: "1rem"
            }}
          />
        </div>
        <div>
          <label style={{ fontWeight: 500, display: "block", marginBottom: 8 }}>Role / Title</label>
          <input
            type="text"
            placeholder="e.g., Software Engineer Intern"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 8,
              border: "1px solid #e0e0e0",
              background: "#fff",
              fontSize: "1rem"
            }}
          />
        </div>
      </div>
      <div style={{ marginTop: "16px" }}>
        <label style={{ fontWeight: 500, display: "block", marginBottom: 8 }}>Responsibilities & Achievements</label>
        <textarea
          placeholder="e.g., Developed new features for..., Led a team of..."
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 8,
            border: "1px solid #e0e0e0",
            background: "#fff",
            fontSize: "1rem",
            resize: "none"
          }}
          rows={4}
        />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
        <div>
          <label style={{ fontWeight: 500, display: "block", marginBottom: 8 }}>Start Date</label>
          <input
            type="date"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 8,
              border: "1px solid #e0e0e0",
              background: "#fff",
              fontSize: "1rem"
            }}
          />
        </div>
        <div>
          <label style={{ fontWeight: 500, display: "block", marginBottom: 8 }}>End Date</label>
          <input
            type="date"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 8,
              border: "1px solid #e0e0e0",
              background: "#fff",
              fontSize: "1rem"
            }}
          />
        </div>
      </div>
      {isRemovable && (
        <button
          type="button"
          onClick={onRemove}
          style={{
            marginTop: "16px",
            padding: "8px 16px",
            background: "#d32f2f",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: 600,
            border: "none",
            borderRadius: 8,
            cursor: "pointer"
          }}
        >
          Remove Experience
        </button>
      )}
    </div>
  );
}

export default ExperienceCard;