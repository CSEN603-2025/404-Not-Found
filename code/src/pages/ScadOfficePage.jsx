import React, { useState, useEffect } from 'react';
import CompanyApplications from './CompanyApplications';
import InternshipListings from './InternshipListings';
import StudentManagement from './StudentManagement';
import ReportManagement from './ReportManagement';
import InternshipCycleManagement from './InternshipCycleManagement';
import Workshops from './Workshops';
import Clarification from './Clarification';
import Statistics from './Statistics';
import Appointments from './Appointments';
import { BuildingIcon } from '../components/ui/buildingicon';
import { BriefcaseIcon } from '../components/ui/briefcaseicon';
import { UsersIcon } from '../components/ui/usersicon';
import { FileTextIcon } from '../components/ui/filetexticon';
import { CalendarClockIcon } from '../components/ui/calendarclockicon';
import BellIcon from '../components/ui/BellIcon';
import PhoneIcon from '../components/ui/phoneicon';
import MuteIcon from '../components/ui/muteicon';
import CameraIcon from '../components/ui/cameraicon';
import UserQuestionIcon from '../components/ui/UserQuestionIcon';
import ChartBarIcon from '../components/ui/ChartBarIcon';
import { Button } from '../components/ui/button';

import '../styles/ScadOfficePage.css';

function ScadOfficePage() {
  const [isClient, setIsClient] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [callPopup, setCallPopup] = useState(false);
  const [callerName, setCallerName] = useState(null);
  const [sidebarTab, setSidebarTab] = useState('company-applications');
  const [incomingCall, setIncomingCall] = useState(null);
  const [inCall, setInCall] = useState(false);
  const [callMuted, setCallMuted] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [screenShared, setScreenShared] = useState(false);
  const [otherLeft, setOtherLeft] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setNotifications([
      'John Doe has accepted your appointment request.',
      'Jane Smith has rejected your appointment request.',
    ]);
    setIncomingCall({ from: 'Ahmed' });
  }, []);

  const handleAcceptCall = (callerName) => {
    setCallerName(callerName);
    setCallPopup(false);
    setIncomingCall(null);
    setInCall(true);
  };

  const handleRejectCall = () => {
    setIncomingCall(null);
  };

  const handleLeaveCall = () => {
    setInCall(false);
    setCallMuted(false);
    setVideoEnabled(false);
    setScreenShared(false);
    setOtherLeft(false);
  };

  const iconStyle = { fontSize: 15, minWidth: 16, height: 16 };

  if (!isClient) return null;

  return (
    <div
      className="scad-office-container"
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
          SCAD Office Central
        </div>
        <div style={{ padding: "18px 0 0 0" }}>
          <div style={{ marginBottom: 8 }}>
            <button
              onClick={() => setSidebarTab('company-applications')}
              style={{
                width: "90%",
                margin: "0 auto 4px auto",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: sidebarTab === 'company-applications' ? "#43a047" : "transparent",
                color: sidebarTab === 'company-applications' ? "#fff" : "#222",
                border: "none",
                borderRadius: 6,
                padding: "7px 12px",
                fontWeight: 500,
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              <BuildingIcon style={iconStyle} /> Companies
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
              onClick={() => setSidebarTab('student-management')}
              style={{
                width: "90%",
                margin: "0 auto 4px auto",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: sidebarTab === 'student-management' ? "#43a047" : "transparent",
                color: sidebarTab === 'student-management' ? "#fff" : "#222",
                border: "none",
                borderRadius: 6,
                padding: "7px 12px",
                fontWeight: 500,
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              <UsersIcon style={iconStyle} /> Students
            </button>
            <button
              onClick={() => setSidebarTab('report-management')}
              style={{
                width: "90%",
                margin: "0 auto 4px auto",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: sidebarTab === 'report-management' ? "#43a047" : "transparent",
                color: sidebarTab === 'report-management' ? "#fff" : "#222",
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
              onClick={() => setSidebarTab('internship-cycle')}
              style={{
                width: "90%",
                margin: "0 auto 4px auto",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: sidebarTab === 'internship-cycle' ? "#43a047" : "transparent",
                color: sidebarTab === 'internship-cycle' ? "#fff" : "#222",
                border: "none",
                borderRadius: 6,
                padding: "7px 12px",
                fontWeight: 500,
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              <CalendarClockIcon style={iconStyle} /> Cycle
            </button>
            <button
              onClick={() => setSidebarTab('workshops')}
              style={{
                width: "90%",
                margin: "0 auto 4px auto",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: sidebarTab === 'workshops' ? "#43a047" : "transparent",
                color: sidebarTab === 'workshops' ? "#fff" : "#222",
                border: "none",
                borderRadius: 6,
                padding: "7px 12px",
                fontWeight: 500,
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              <BriefcaseIcon style={iconStyle} /> Workshops
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
              <UserQuestionIcon style={{ ...iconStyle, color: "#000" }} /> Clarification
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
              <ChartBarIcon style={{ ...iconStyle, color: "#000" }} /> Statistics
            </button>
            <button
              onClick={() => setSidebarTab('appointments')}
              style={{
                width: "90%",
                margin: "0 auto 4px auto",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: sidebarTab === 'appointments' ? "#43a047" : "transparent",
                color: sidebarTab === 'appointments' ? "#fff" : "#222",
                border: "none",
                borderRadius: 6,
                padding: "7px 12px",
                fontWeight: 500,
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              <span role="img" aria-label="appointments" style={{ fontSize: 18 }}>📅</span> Appointments
            </button>
          </div>
        </div>
        <div style={{ flex: 1 }} />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, minHeight: "100vh", position: "relative" }}>
        {/* Notifications Button */}
        <div className="notifications-button-container" style={{ textAlign: "right", padding: "18px 24px 0 0" }}>
          <button
            className="notifications-button"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <BellIcon className="notifications-icon" />
          </button>
          {/* Notifications Popup */}
          {showNotifications && (
            <div className="notifications-popup">
              <h3>Notifications</h3>
              <ul>
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <li key={index}>{notification}</li>
                  ))
                ) : (
                  <li>No notifications available.</li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Incoming Call Notification */}
        {incomingCall && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.18)",
              zIndex: 2000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                boxShadow: "0 4px 32px rgba(67,160,71,0.10)",
                padding: "36px 40px 28px 40px",
                minWidth: 320,
                maxWidth: 420,
                width: "90vw",
                textAlign: "center",
                border: "2px solid #43a047",
                position: "relative"
              }}
            >
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#43a047", marginBottom: 18 }}>
                Incoming Call
              </div>
              <div style={{ marginBottom: 18 }}>
                <PhoneIcon style={{ fontSize: 32, color: "#43a047", marginBottom: 8 }} />
                <div style={{ fontWeight: 600 }}>
                  {incomingCall.from ? `${incomingCall.from} is calling you...` : "Someone is calling you..."}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 18 }}>
                <button
                  style={{
                    background: "#43a047",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    padding: "14px 22px",
                    fontWeight: 600,
                    fontSize: "1.08rem",
                    cursor: "pointer"
                  }}
                  onClick={() => handleAcceptCall(incomingCall.from)}
                >
                  Accept
                </button>
                <button
                  style={{
                    background: "#c82333",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    padding: "14px 22px",
                    fontWeight: 600,
                    fontSize: "1.08rem",
                    cursor: "pointer"
                  }}
                  onClick={handleRejectCall}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Call Popup */}
        {callPopup && callerName && (
          <div className="call-popup-overlay">
            <div className="call-popup">
              <h2>Calling {callerName}</h2>
              <div className="call-screen">
                {/* Call screen content */}
              </div>
              <div className="call-controls">
                <div className="left-controls">
                  <Button className="call-control-button">
                    <MuteIcon className="action-icon" />
                  </Button>
                  <Button className="call-control-button">
                    <CameraIcon className="action-icon" />
                  </Button>
                </div>
                <div className="right-controls">
                  <Button className="call-control-button">
                    Share Screen
                  </Button>
                </div>
              </div>
              <div className="end-call-container">
                <Button
                  className="call-control-button end-call-button"
                  onClick={() => {
                    setCallPopup(false);
                    setCallerName(null);
                  }}
                >
                  <PhoneIcon className="action-icon" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* In-Call Popup */}
        {inCall && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.18)",
              zIndex: 2100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                boxShadow: "0 4px 32px rgba(67,160,71,0.10)",
                padding: "36px 40px 28px 40px",
                minWidth: 420,
                maxWidth: 540,
                width: "90vw",
                textAlign: "center",
                border: "2px solid #43a047",
                position: "relative"
              }}
            >
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#43a047", marginBottom: 18 }}>
                In Call with Career Advisor
              </div>
              <div
                style={{
                  background: "#f0f0f0",
                  height: 180,
                  margin: "1rem 0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                  border: "1px solid #ddd",
                  fontSize: "1.2rem",
                  color: "#555"
                }}
              >
                {videoEnabled ? (
                  <span>Video Stream (enabled)</span>
                ) : (
                  <span>Video Disabled</span>
                )}
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 18, marginBottom: 18 }}>
                <button
                  style={{
                    background: callMuted ? "#ffc107" : "#43a047",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    padding: "12px 18px",
                    fontWeight: 600,
                    fontSize: "1.08rem",
                    cursor: "pointer"
                  }}
                  onClick={() => setCallMuted((m) => !m)}
                >
                  <MuteIcon style={{ fontSize: 22, color: "#fff" }} />
                  <div style={{ fontSize: 12 }}>{callMuted ? "Unmute" : "Mute"}</div>
                </button>
                <button
                  style={{
                    background: videoEnabled ? "#43a047" : "#888",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    padding: "12px 18px",
                    fontWeight: 600,
                    fontSize: "1.08rem",
                    cursor: "pointer"
                  }}
                  onClick={() => setVideoEnabled((v) => !v)}
                >
                  <CameraIcon style={{ fontSize: 22, color: "#fff" }} />
                  <div style={{ fontSize: 12 }}>{videoEnabled ? "Disable Video" : "Enable Video"}</div>
                </button>
                <button
                  style={{
                    background: screenShared ? "#007bff" : "#43a047",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    padding: "12px 18px",
                    fontWeight: 600,
                    fontSize: "1.08rem",
                    cursor: "pointer"
                  }}
                  onClick={() => setScreenShared((s) => !s)}
                >
                  <span role="img" aria-label="Share Screen" style={{ fontSize: 22 }}>🖥️</span>
                  <div style={{ fontSize: 12 }}>{screenShared ? "Stop Share" : "Share Screen"}</div>
                </button>
              </div>
              <button
                style={{
                  background: "#c82333",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  padding: "14px 22px",
                  fontWeight: 600,
                  fontSize: "1.08rem",
                  cursor: "pointer"
                }}
                onClick={handleLeaveCall}
              >
                Leave Call
              </button>
              {otherLeft && (
                <div style={{
                  marginTop: 18,
                  color: "#c82333",
                  fontWeight: 600,
                  fontSize: "1.1rem"
                }}>
                  The other caller has left the call.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Section Title */}
        <h1 className="scad-office-title" style={{ marginLeft: 32, marginTop: 16 }}>
          {(() => {
            switch (sidebarTab) {
              case 'company-applications': return 'Companies';
              case 'internship-listings': return 'Internships';
              case 'student-management': return 'Students';
              case 'report-management': return 'Reports';
              case 'internship-cycle': return 'Internship Cycle';
              case 'workshops': return 'Workshops';
              case 'clarification': return 'Clarification';
              case 'statistics': return 'Statistics';
              case 'appointments': return 'Appointments';
              default: return '';
            }
          })()}
        </h1>
        <div style={{ margin: "32px" }}>
          {sidebarTab === 'company-applications' && <CompanyApplications />}
          {sidebarTab === 'internship-listings' && <InternshipListings />}
          {sidebarTab === 'student-management' && <StudentManagement />}
          {sidebarTab === 'report-management' && <ReportManagement />}
          {sidebarTab === 'internship-cycle' && <InternshipCycleManagement />}
          {sidebarTab === 'workshops' && <Workshops />}
          {sidebarTab === 'clarification' && <Clarification />}
          {sidebarTab === 'statistics' && <Statistics />}
          {sidebarTab === 'appointments' && <Appointments />}
        </div>
      </div>
    </div>
  );
}

export default ScadOfficePage;