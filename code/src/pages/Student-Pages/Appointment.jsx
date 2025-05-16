import React from "react";

export default function Appointment() {
  // Dummy meeting link
  const meetingLink = "https://meet.example.com/generated-link-123";

  // Handler for copy link
  const handleCopy = () => {
    navigator.clipboard.writeText(meetingLink);
    alert("Link copied!");
  };

  return (
    <div style={{
      background: "#e6f7f5",
      minHeight: "100vh",
      padding: "40px 0"
    }}>
      {/* First Box */}
      <div style={{
        maxWidth: 700,
        margin: "40px auto",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 12px rgba(56,211,159,0.07)",
        padding: "32px 28px",
        position: "relative"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 16
        }}>
          <div style={{ fontWeight: 700, fontSize: "1.6rem" }}>Career Guidance</div>
          <span style={{
            display: "flex",
            alignItems: "center",
            background: "#e6faf3",
            color: "#16a34a",
            border: "1.5px solid #b6f0d3",
            borderRadius: 18,
            padding: "4px 16px",
            fontWeight: 600,
            fontSize: "1.01rem"
          }}>
            <svg width="18" height="18" fill="none" style={{ marginRight: 6 }} viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="9" stroke="#16a34a" strokeWidth="1.5"/>
              <path d="M6.5 10.5l2.5 2 4-5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Accepted
          </span>
        </div>
        <div style={{ color: "#7b8a9a", marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
            <path d="M10 10a3 3 0 100-6 3 3 0 000 6z" stroke="#7b8a9a" strokeWidth="1.5"/>
            <path d="M16.5 15c0-2.485-2.91-4.5-6.5-4.5s-6.5 2.015-6.5 4.5" stroke="#7b8a9a" strokeWidth="1.5"/>
          </svg>
          To: Career Advisor Sarah
        </div>
        <div style={{ color: "#222", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
            <rect x="3" y="4" width="14" height="13" rx="2" stroke="#7b8a9a" strokeWidth="1.5"/>
            <path d="M3 8h14" stroke="#7b8a9a" strokeWidth="1.5"/>
            <path d="M7 2v4" stroke="#7b8a9a" strokeWidth="1.5"/>
            <path d="M13 2v4" stroke="#7b8a9a" strokeWidth="1.5"/>
          </svg>
          May 19th, 2025
        </div>
        <div style={{ color: "#222", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="8" stroke="#7b8a9a" strokeWidth="1.5"/>
            <path d="M10 5v5l3 3" stroke="#7b8a9a" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          3:42 AM
        </div>
        <div style={{ color: "#222", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
            <rect x="4" y="4" width="12" height="12" rx="2" stroke="#7b8a9a" strokeWidth="1.5"/>
            <path d="M7 7h6v6H7V7z" stroke="#7b8a9a" strokeWidth="1.5"/>
          </svg>
          Career Guidance
        </div>
        <div style={{ color: "#16a34a", marginBottom: 8, display: "flex", alignItems: "center", gap: 8, fontSize: "1.05rem" }}>
          <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
            <path d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm2.5 0a4.5 4.5 0 109 0 4.5 4.5 0 00-9 0z" stroke="#16a34a" strokeWidth="1.5"/>
            <path d="M7 10l2 2 4-4" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <a href={meetingLink} target="_blank" rel="noopener noreferrer" style={{ color: "#16a34a", textDecoration: "underline" }}>
            {meetingLink}
          </a>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 18 }}>
          <button
            style={{
              background: "#e6faf3",
              color: "#16a34a",
              border: "none",
              borderRadius: 8,
              padding: "12px 32px",
              fontWeight: 600,
              fontSize: "1.08rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8
            }}
            onClick={() => window.open(meetingLink, "_blank")}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
              <path d="M5 10l4 4 6-8" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Join Call
          </button>
          <button
            style={{
              background: "#f4f8ff",
              color: "#222",
              border: "none",
              borderRadius: 8,
              padding: "12px 32px",
              fontWeight: 600,
              fontSize: "1.08rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8
            }}
            onClick={handleCopy}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
              <rect x="5" y="7" width="10" height="10" rx="2" stroke="#7b8a9a" strokeWidth="1.5"/>
              <rect x="7" y="3" width="10" height="10" rx="2" stroke="#7b8a9a" strokeWidth="1.5"/>
            </svg>
            Copy Link
          </button>
          <button
            style={{
              background: "#e6faf3",
              color: "#16a34a",
              border: "none",
              borderRadius: 8,
              padding: "12px 32px",
              fontWeight: 600,
              fontSize: "1.08rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8
            }}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
              <rect x="3" y="3" width="14" height="14" rx="3" stroke="#16a34a" strokeWidth="1.5"/>
              <path d="M7 10l2 2 4-4" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Mark as Completed
          </button>
        </div>
      </div>

      {/* Second Box */}
      <div style={{
        maxWidth: 700,
        margin: "32px auto",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 12px rgba(56,211,159,0.07)",
        padding: "32px 28px",
        position: "relative"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 16
        }}>
          <div style={{ fontWeight: 700, fontSize: "1.6rem" }}>Report Clarification</div>
          <span style={{
            display: "flex",
            alignItems: "center",
            background: "#fff7e6",
            color: "#b8860b",
            border: "1.5px solid #ffe0a3",
            borderRadius: 18,
            padding: "4px 16px",
            fontWeight: 600,
            fontSize: "1.01rem"
          }}>
            <svg width="18" height="18" fill="none" style={{ marginRight: 6 }} viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="9" stroke="#b8860b" strokeWidth="1.5"/>
              <path d="M10 6v4" stroke="#b8860b" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="10" cy="14" r="1" fill="#b8860b"/>
            </svg>
            Pending
          </span>
        </div>
        <div style={{ color: "#222", marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
            <path d="M10 10a3 3 0 100-6 3 3 0 000 6z" stroke="#7b8a9a" strokeWidth="1.5"/>
            <path d="M16.5 15c0-2.485-2.91-4.5-6.5-4.5s-6.5 2.015-6.5 4.5" stroke="#7b8a9a" strokeWidth="1.5"/>
          </svg>
          From: John Student
        </div>
        <div style={{ color: "#222", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
            <rect x="3" y="4" width="14" height="13" rx="2" stroke="#7b8a9a" strokeWidth="1.5"/>
            <path d="M3 8h14" stroke="#7b8a9a" strokeWidth="1.5"/>
            <path d="M7 2v4" stroke="#7b8a9a" strokeWidth="1.5"/>
            <path d="M13 2v4" stroke="#7b8a9a" strokeWidth="1.5"/>
          </svg>
          May 18th, 2025
        </div>
        <div style={{ color: "#222", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="8" stroke="#7b8a9a" strokeWidth="1.5"/>
            <path d="M10 5v5l3 3" stroke="#7b8a9a" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          3:42 AM
        </div>
        <div style={{ color: "#222", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
            <rect x="4" y="4" width="12" height="12" rx="2" stroke="#7b8a9a" strokeWidth="1.5"/>
            <path d="M7 7h6v6H7V7z" stroke="#7b8a9a" strokeWidth="1.5"/>
          </svg>
          Report Clarification
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <button style={{
            background: "#43a047",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 32px",
            fontWeight: 600,
            fontSize: "1.08rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8
          }}>
            <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
              <path d="M5 10l4 4 6-8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Accept
          </button>
          <button style={{
            background: "#e53935",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 32px",
            fontWeight: 600,
            fontSize: "1.08rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8
          }}>
            <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
              <path d="M6 6l8 8M14 6l-8 8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
