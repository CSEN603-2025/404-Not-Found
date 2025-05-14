import React from 'react';

function ActivityCard({ index, isRemovable, onRemove }) {
  return (
    <div style={{
      border: "1px solid #e0e0e0",
      borderRadius: 12,
      padding: "24px",
      marginBottom: "16px",
      background: "#f9f9f9"
    }}>
      <h3 style={{ fontWeight: 600, fontSize: "1.25rem", marginBottom: "16px" }}>
        Activity #{index + 1}
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={{ fontWeight: 500, display: "block", marginBottom: 8 }}>Activity Name</label>
          <input
            type="text"
            placeholder="e.g., Coding Club, Debate Team"
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
          <label style={{ fontWeight: 500, display: "block", marginBottom: 8 }}>Your Role (Optional)</label>
          <input
            type="text"
            placeholder="e.g., President, Member, Organizer"
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
        <label style={{ fontWeight: 500, display: "block", marginBottom: 8 }}>Description & Achievements (Optional)</label>
        <textarea
          placeholder="e.g., Organized weekly coding sessions, Won inter-college debate competition."
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
      <div style={{ marginTop: "16px" }}>
        <label style={{ fontWeight: 500, display: "block", marginBottom: 8 }}>Duration (Optional)</label>
        <input
          type="text"
          placeholder="e.g., 2022-2023, Fall 2021 - Spring 2022"
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
          Remove Activity
        </button>
      )}
    </div>
  );
}

export default ActivityCard;