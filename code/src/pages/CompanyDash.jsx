import React, { useState, useEffect } from 'react';
import MyCompIntern from './MyCompIntern';
import InternshipListingV2 from './InternshipListingV2';
import ApplicaComp from './ApplicaComp';
import DecisionTable from './DecisionTable';
import InternshipStatusPage from './InternshipStatusPage';
import EvaluationFormPage from './EvaluationFormPage';
import JobPostPage from './JobPostPage';
import { BuildingIcon } from '../components/ui/buildingicon';
import { BriefcaseIcon } from '../components/ui/briefcaseicon';
import { UsersIcon } from '../components/ui/usersicon';
import { FileTextIcon } from '../components/ui/filetexticon';
import { CalendarClockIcon } from '../components/ui/calendarclockicon';
import '../styles/CompanyDash.css';

function CompanyDash() {
  const [isClient, setIsClient] = useState(false);
  const [sidebarTab, setSidebarTab] = useState('my-internships');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const iconStyle = { fontSize: 15, minWidth: 16, height: 16 };

  if (!isClient) return null;

  return (
    <div
      className="company-dash-container"
      style={{
        minHeight: "100vh",
        width: "100vw",
        maxWidth: "100vw",
        margin: 0,
        padding: 0,
        background: "#f7fafc",
        display: "flex"
      }}
    >
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
        {/* Header at the top of the sidebar */}
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
          Company Office
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
              onClick={() => setSidebarTab('applications-company')}
              style={{
                width: "90%",
                margin: "0 auto 4px auto",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: sidebarTab === 'applications-company' ? "#43a047" : "transparent",
                color: sidebarTab === 'applications-company' ? "#fff" : "#222",
                border: "none",
                borderRadius: 6,
                padding: "7px 12px",
                fontWeight: 500,
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              <UsersIcon style={iconStyle} /> Applications
            </button>
            <button
              onClick={() => setSidebarTab('decision-table')}
              style={{
                width: "90%",
                margin: "0 auto 4px auto",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: sidebarTab === 'decision-table' ? "#43a047" : "transparent",
                color: sidebarTab === 'decision-table' ? "#fff" : "#222",
                border: "none",
                borderRadius: 6,
                padding: "7px 12px",
                fontWeight: 500,
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              <FileTextIcon style={iconStyle} /> Action
            </button>
            <button
              onClick={() => setSidebarTab('internship-status')}
              style={{
                width: "90%",
                margin: "0 auto 4px auto",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: sidebarTab === 'internship-status' ? "#43a047" : "transparent",
                color: sidebarTab === 'internship-status' ? "#fff" : "#222",
                border: "none",
                borderRadius: 6,
                padding: "7px 12px",
                fontWeight: 500,
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              <CalendarClockIcon style={iconStyle} /> Enrolling Interns
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
            <button
              onClick={() => setSidebarTab('job-posts')}
              style={{
                width: "90%",
                margin: "0 auto 4px auto",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: sidebarTab === 'job-posts' ? "#43a047" : "transparent",
                color: sidebarTab === 'job-posts' ? "#fff" : "#222",
                border: "none",
                borderRadius: 6,
                padding: "7px 12px",
                fontWeight: 500,
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              <BriefcaseIcon style={iconStyle} /> Create Post
            </button>
          </div>
        </div>
        <div style={{ flex: 1 }} />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, minHeight: "100vh", position: "relative" }}>
        <h1 className="company-dash-title" style={{ marginLeft: 32, marginTop: 16 }}>
          {(() => {
            switch (sidebarTab) {
              case 'my-internships': return 'My Internships';
              case 'internship-listings': return 'Internships';
              case 'applications-company': return 'Applications';
              case 'decision-table': return 'Action';
              case 'internship-status': return 'Enrolling Interns';
              case 'evaluation-report': return 'Evaluation';
              case 'job-posts': return 'Create Post';
              default: return '';
            }
          })()}
        </h1>
        <div style={{ margin: "32px" }}>
          {sidebarTab === 'my-internships' && <MyCompIntern />}
          {sidebarTab === 'internship-listings' && <InternshipListingV2 />}
          {sidebarTab === 'applications-company' && <ApplicaComp />}
          {sidebarTab === 'decision-table' && <DecisionTable />}
          {sidebarTab === 'internship-status' && <InternshipStatusPage />}
          {sidebarTab === 'evaluation-report' && <EvaluationFormPage />}
          {sidebarTab === 'job-posts' && <JobPostPage />}
        </div>
      </div>
    </div>
  );
}

export default CompanyDash;