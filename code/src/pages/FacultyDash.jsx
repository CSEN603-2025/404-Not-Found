import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyCompIntern from './MyCompIntern';
import InternshipListings from './InternshipListings';
import Statistics from './Statistics';
import ReportOfFac from './ReportOfFac';
import Clarification from './Clarification';
import EvaluationFormPage from './EvaluationFormPage';
import { BuildingIcon } from '../components/ui/buildingicon';
import { BriefcaseIcon } from '../components/ui/briefcaseicon';
import { UsersIcon } from '../components/ui/usersicon';
import { FileTextIcon } from '../components/ui/filetexticon';
import { CalendarClockIcon } from '../components/ui/calendarclockicon';
import '../styles/FacultyDash.css';

function FacultyDash() {
  const [isClient, setIsClient] = useState(false);
  const [sidebarTab, setSidebarTab] = useState('my-internships');
  const navigate = useNavigate();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const iconStyle = { fontSize: 15, minWidth: 16, height: 16 };

  if (!isClient) return null;

  return (
    <div className="scad-office-container" style={{ display: 'flex', minHeight: '100vh', background: '#f7fafc' }}>
      {/* Sidebar */}
      <div style={{
        width: 240,
        background: "#f8f9fa",
        borderRight: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: 0
      }}>
        <div style={{
          width: "100%",
          padding: "18px 0 12px 0",
          borderBottom: "1px solid #e5e7eb",
          textAlign: "center",
          fontWeight: 700,
          fontSize: "1.18rem",
          color: "#222",
          letterSpacing: 0.2,
          background: "#f8f9fa"
        }}>
          Faculty Member Office
        </div>
        <div style={{ padding: "18px 0 0 0" }}>
          <div style={{ marginBottom: 8 }}>
            <button
              onClick={() => setSidebarTab('my-internships')}
              style={{
                width: "90%",
                margin: "0 auto 4px auto",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: sidebarTab === 'my-internships' ? "#43a047" : "transparent",
                color: sidebarTab === 'my-internships' ? "#fff" : "#222",
                border: "none",
                borderRadius: 6,
                padding: "7px 12px",
                fontWeight: 500,
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              <BuildingIcon style={iconStyle} /> My Internships
            </button>
            <button
              onClick={() => setSidebarTab('internship-listings')}
              style={{
                width: "90%",
                margin: "0 auto 4px auto",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: sidebarTab === 'internship-listings' ? "#43a047" : "transparent",
                color: sidebarTab === 'internship-listings' ? "#fff" : "#222",
                border: "none",
                borderRadius: 6,
                padding: "7px 12px",
                fontWeight: 500,
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              <BriefcaseIcon style={iconStyle} /> Internships
            </button>
            <button
              onClick={() => setSidebarTab('statistics')}
              style={{
                width: "90%",
                margin: "0 auto 4px auto",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: sidebarTab === 'statistics' ? "#43a047" : "transparent",
                color: sidebarTab === 'statistics' ? "#fff" : "#222",
                border: "none",
                borderRadius: 6,
                padding: "7px 12px",
                fontWeight: 500,
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              <UsersIcon style={iconStyle} /> Statistics
            </button>
            <button
              onClick={() => setSidebarTab('reports')}
              style={{
                width: "90%",
                margin: "0 auto 4px auto",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: sidebarTab === 'reports' ? "#43a047" : "transparent",
                color: sidebarTab === 'reports' ? "#fff" : "#222",
                border: "none",
                borderRadius: 6,
                padding: "7px 12px",
                fontWeight: 500,
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              <FileTextIcon style={iconStyle} /> Reports
            </button>
            <button
              onClick={() => setSidebarTab('clarification')}
              style={{
                width: "90%",
                margin: "0 auto 4px auto",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: sidebarTab === 'clarification' ? "#43a047" : "transparent",
                color: sidebarTab === 'clarification' ? "#fff" : "#222",
                border: "none",
                borderRadius: 6,
                padding: "7px 12px",
                fontWeight: 500,
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              <CalendarClockIcon style={iconStyle} /> Clarification Form
            </button>
            <button
              onClick={() => setSidebarTab('evaluation-report')}
              style={{
                width: "90%",
                margin: "0 auto 4px auto",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: sidebarTab === 'evaluation-report' ? "#43a047" : "transparent",
                color: sidebarTab === 'evaluation-report' ? "#fff" : "#222",
                border: "none",
                borderRadius: 6,
                padding: "7px 12px",
                fontWeight: 500,
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              <FileTextIcon style={iconStyle} /> Evaluation
            </button>
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ borderTop: "1px solid #e5e7eb", padding: "14px 0 0 0" }}>
          <button
            style={{
              width: "90%",
              margin: "0 auto 6px auto",
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "transparent",
              color: "#222",
              border: "none",
              borderRadius: 6,
              padding: "7px 12px",
              fontWeight: 500,
              fontSize: "1rem",
              cursor: "pointer"
            }}
            onClick={() => navigate('/job-posts')}
          >
            <BriefcaseIcon style={iconStyle} /> Create Post
          </button>
        </div>
      </div>
      {/* Main Content */}
      <div className="faculty-main-content">
        <h1 className="scad-office-title" style={{ marginLeft: 0, marginTop: 0 }}>
          Faculty Member Office
        </h1>
        <p className="scad-office-description" style={{ marginLeft: 0 }}>
          Manage company applications, internships, students, and reports for the GUC Internship Program.
        </p>
        <div style={{ margin: "32px 0" }}>
          {sidebarTab === 'my-internships' && <MyCompIntern />}
          {sidebarTab === 'internship-listings' && <InternshipListings />}
          {sidebarTab === 'statistics' && <Statistics />}
          {sidebarTab === 'reports' && <ReportOfFac />}
          {sidebarTab === 'clarification' && <Clarification />}
          {sidebarTab === 'evaluation-report' && <EvaluationFormPage />}
        </div>
      </div>
    </div>
  );
}

export default FacultyDash;