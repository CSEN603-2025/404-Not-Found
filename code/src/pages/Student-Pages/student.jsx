import React, { useState, useEffect } from 'react';
import { BuildingIcon } from '../../components/ui/buildingicon';
import { BriefcaseIcon } from '../../components/ui/briefcaseicon';
import { UsersIcon } from '../../components/ui/usersicon';
import { FileTextIcon } from '../../components/ui/filetexticon';
import BellIcon from '../../components/ui/BellIcon';
import { mockSuggestedCompanies, mockAppliedInternships } from '../../data/mock-data-Student';
import '../../styles/student.css';

import Profile from './Profile';
import SuggestedCompanies from './SuggestedCompanies';
import AppliedInternships from './AppliedInternships';
import EvaluateCompanies from './EvaluateCompanies';
import InternshipReports from './InternshipReports';

function Student() {
  const [isClient, setIsClient] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [suggestedCompanies, setSuggestedCompanies] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [appliedInternships, setAppliedInternships] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [companyEvaluations, setCompanyEvaluations] = useState([]);
  const [editingEvaluation, setEditingEvaluation] = useState(null);
  const [internshipReports, setInternshipReports] = useState([]);
  const [editingReport, setEditingReport] = useState(null);
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [sidebarTab, setSidebarTab] = useState('profile');

  useEffect(() => {
    setIsClient(true);
    setSuggestedCompanies(mockSuggestedCompanies);
    setAppliedInternships(mockAppliedInternships);
  }, []);

  // Dummy handlers to fix "not defined" errors
  const handleAddEvaluation = () => {};
  const handleEditEvaluation = () => {};
  const handleDeleteEvaluation = () => {};
  const handleSaveEvaluation = () => {};

  const handleAddReport = () => {};
  const handleEditReport = () => {};
  const handleDeleteReport = () => {};
  const handleSaveReport = () => {};

  // Even smaller icon size for sidebar, matching your screenshot
  const iconStyle = { fontSize: 15, minWidth: 16, height: 16 };

  if (!isClient) return null;

  return (
    <div
      className="student-container"
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
        <div style={{ padding: "18px 0 0 0" }}>
          <div style={{ marginBottom: 8 }}>
            <button
              onClick={() => setSidebarTab('profile')}
              style={{
                width: "90%",
                margin: "0 auto 4px auto",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: sidebarTab === 'profile' ? "#43a047" : "transparent",
                color: sidebarTab === 'profile' ? "#fff" : "#222",
                border: "none",
                borderRadius: 6,
                padding: "7px 12px",
                fontWeight: 500,
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              <UsersIcon style={iconStyle} /> Profile
            </button>
            <button
              onClick={() => setSidebarTab('suggested-companies')}
              style={{
                width: "90%",
                margin: "0 auto 4px auto",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: sidebarTab === 'suggested-companies' ? "#43a047" : "transparent",
                color: sidebarTab === 'suggested-companies' ? "#fff" : "#222",
                border: "none",
                borderRadius: 6,
                padding: "7px 12px",
                fontWeight: 500,
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              <BriefcaseIcon style={iconStyle} /> Companies
            </button>
            <button
              onClick={() => setSidebarTab('applied-internships')}
              style={{
                width: "90%",
                margin: "0 auto 4px auto",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: sidebarTab === 'applied-internships' ? "#43a047" : "transparent",
                color: sidebarTab === 'applied-internships' ? "#fff" : "#222",
                border: "none",
                borderRadius: 6,
                padding: "7px 12px",
                fontWeight: 500,
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              <FileTextIcon style={iconStyle} /> Applied Internships
            </button>
            <button
              onClick={() => setSidebarTab('evaluate-companies')}
              style={{
                width: "90%",
                margin: "0 auto 4px auto",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: sidebarTab === 'evaluate-companies' ? "#43a047" : "transparent",
                color: sidebarTab === 'evaluate-companies' ? "#fff" : "#222",
                border: "none",
                borderRadius: 6,
                padding: "7px 12px",
                fontWeight: 500,
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              <BuildingIcon style={iconStyle} /> Evaluate Companies
            </button>
            <button
              onClick={() => setSidebarTab('internship-reports')}
              style={{
                width: "90%",
                margin: "0 auto 4px auto",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: sidebarTab === 'internship-reports' ? "#43a047" : "transparent",
                color: sidebarTab === 'internship-reports' ? "#fff" : "#222",
                border: "none",
                borderRadius: 6,
                padding: "7px 12px",
                fontWeight: 500,
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              <FileTextIcon style={iconStyle} /> Internship Reports
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
          >
            <span role="img" aria-label="settings" style={{ fontSize: 14 }}>⚙️</span> Settings
          </button>
          <button
            style={{
              width: "90%",
              margin: "0 auto",
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
          >
            <span role="img" aria-label="logout" style={{ fontSize: 14 }}>↩️</span> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, minHeight: "100vh" }}>
        <div className="notifications-button-container" style={{ textAlign: "right", padding: "18px 24px 0 0" }}>
          <button
            className="notifications-button"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <BellIcon className="notifications-icon" />
          </button>
          {showNotifications && (
            <div className="notifications-popup">
              <h3>Notifications</h3>
              <ul>
                <li>No notifications available.</li>
              </ul>
            </div>
          )}
        </div>
        <h1 className="student-title" style={{ marginLeft: 32, marginTop: 16 }}>Student Dashboard</h1>
        <p className="student-description" style={{ marginLeft: 32 }}>
          Access your internship applications, notifications, and profile details.
        </p>
        <div style={{ margin: "32px" }}>
          {sidebarTab === 'profile' && (
            <Profile
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              selectedMajor={selectedMajor}
              setSelectedMajor={setSelectedMajor}
              selectedSemester={selectedSemester}
              setSelectedSemester={setSelectedSemester}
            />
          )}
          {sidebarTab === 'suggested-companies' && (
            <SuggestedCompanies suggestedCompanies={suggestedCompanies} />
          )}
          {sidebarTab === 'applied-internships' && (
            <AppliedInternships
              appliedInternships={appliedInternships}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />
          )}
          {sidebarTab === 'evaluate-companies' && (
            <EvaluateCompanies
              companyEvaluations={companyEvaluations}
              handleAddEvaluation={handleAddEvaluation}
              handleEditEvaluation={handleEditEvaluation}
              handleDeleteEvaluation={handleDeleteEvaluation}
              handleSaveEvaluation={handleSaveEvaluation}
              editingEvaluation={editingEvaluation}
            />
          )}
          {sidebarTab === 'internship-reports' && (
            <InternshipReports
              internshipReports={internshipReports}
              handleAddReport={handleAddReport}
              handleEditReport={handleEditReport}
              handleDeleteReport={handleDeleteReport}
              handleSaveReport={handleSaveReport}
              editingReport={editingReport}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Student;