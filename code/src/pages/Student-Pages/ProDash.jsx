import React, { useState, useEffect } from 'react';
import { BuildingIcon } from '../../components/ui/buildingicon';
import { BriefcaseIcon } from '../../components/ui/briefcaseicon';
import { UsersIcon } from '../../components/ui/usersicon';
import { FileTextIcon } from '../../components/ui/filetexticon';
import BellIcon from '../../components/ui/BellIcon';
import PhoneIcon from '../../components/ui/phoneicon';
import MuteIcon from '../../components/ui/muteicon';
import CameraIcon from '../../components/ui/cameraicon';
import '../../styles/student.css';
import proStudentImg from '../../assets/pro student.svg';

import Profile from './Profile';
import SuggestedCompanies from './SuggestedCompanies';
import AppliedInternships from './AppliedInternships';
import EvaluateCompanies from './EvaluateCompanies';
import InternshipReports from './InternshipReports';
import Courses from './Courses';

function Student() {
  const [isClient, setIsClient] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]); // State for notifications
  const [sidebarTab, setSidebarTab] = useState('profile');
  const [showAssessments, setShowAssessments] = useState(false); 
  const [showCodingQuiz, setShowCodingQuiz] = useState(false);// State for assessments
  const [codingQuizAnswer1, setCodingQuizAnswer1] = useState("");
  const [codingQuizAnswer2, setCodingQuizAnswer2] = useState("");
  const [codingQuizAnswer3, setCodingQuizAnswer3] = useState("");  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [showProfileSuccess, setShowProfileSuccess] = useState(false);
  const [showProfileViews, setShowProfileViews] = useState(false);
  const [profileViews, setProfileViews] = useState([
    { company: "TechNova Inc.", date: "2025-05-10" },
    { company: "GreenByte Solutions", date: "2025-05-12" },
    { company: "InnovateX Labs", date: "2025-05-15" }
  ]);
  const [incomingCall, setIncomingCall] = useState(null); // { from: "Career Advisor" }
  const [inCall, setInCall] = useState(false);
  const [callMuted, setCallMuted] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [screenShared, setScreenShared] = useState(false);
  const [otherLeft, setOtherLeft] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Simulate fetching notifications for internship cycles
    const internshipCycleNotifications = [
      "The new internship cycle has started! Apply now.",
      "The next internship cycle will begin in 3 days. Prepare your applications.",
      "Your Report is now available for review.",
      "Your Apointment has been Accepted",
    ];

    setNotifications(internshipCycleNotifications);

    // Simulate receiving a notification for internship report status
    setTimeout(() => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        "Your internship report status has been set to 'Approved'.",
      ]);
    }, 5000); // Simulate a delay of 5 seconds

    // Simulate an incoming call after 7 seconds
    const timer = setTimeout(() => {
      setIncomingCall({ from: "Career Advisor" });
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  if (!isClient) return null;

  const iconStyle = { fontSize: 15, minWidth: 16, height: 16 };

  const handleAcceptCall = () => {
    setInCall(true);
    setIncomingCall(null);
    setOtherLeft(false);
    // Simulate the other user leaving after 20 seconds (demo)
    setTimeout(() => setOtherLeft(true), 20000);
  };

  const handleRejectCall = () => {
    setIncomingCall(null);
  };

  const handleLeaveCall = () => {
    setInCall(false);
    setOtherLeft(false);
  };

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
              <FileTextIcon style={iconStyle} /> Internships
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
            <button
              onClick={() => setSidebarTab('courses')}
              style={{
                width: "90%",
                margin: "0 auto 4px auto",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: sidebarTab === 'courses' ? "#43a047" : "transparent",
                color: sidebarTab === 'courses' ? "#fff" : "#222",
                border: "none",
                borderRadius: 6,
                padding: "7px 12px",
                fontWeight: 500,
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              <FileTextIcon style={iconStyle} /> Courses
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
        <div className="notifications-button-container" style={{ textAlign: "right", padding: "18px 24px 0 0", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12 }}>
          <button
            type="button"
            style={{
              background: "#43a047",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "8px 18px",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
              boxShadow: "0 1px 4px rgba(67,160,71,0.08)"
            }}
            onClick={() => setShowAssessments(true)}
          >
            Take Assessment
          </button>
          <button
            type="button"
            style={{
              background: "#fff",
              color: "#43a047",
              border: "2px solid #43a047",
              borderRadius: 6,
              padding: "8px 18px",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
              marginLeft: 8
            }}
            onClick={() => setShowProfileViews(true)}
          >
            Profile Views
          </button>
          <button
            className="notifications-button"
            onClick={() => setShowNotifications(!showNotifications)}
            style={{ marginRight: 0 }}
          >
            <BellIcon className="notifications-icon" />
          </button>
          {showNotifications && (
            <div className="notifications-popup">
              <h3>Notifications</h3>
              <ul>
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <li key={index} style={{ marginBottom: "8px", color: "#333" }}>
                      {notification}
                    </li>
                  ))
                ) : (
                  <li>No notifications available.</li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Assessments Section */}
        {showAssessments && (
          <div style={{ padding: "32px 0 0 0" }}>
            <h1 style={{ textAlign: "center", fontSize: "2.5rem", fontWeight: 700, marginBottom: 8 }}>
              Available Assessments
            </h1>
            <p style={{ textAlign: "center", color: "#555", fontSize: "1.18rem", marginBottom: 36 }}>
              Choose from a variety of assessments to test your knowledge and skills. Get instant, AI-powered feedback.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 40 }}>
              {/* General Knowledge Quiz */}
              <div style={{
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                padding: "32px 32px 24px 32px",
                minWidth: 340,
                maxWidth: 360,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start"
              }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>🧠</div>
                <div style={{ fontWeight: 700, fontSize: "1.25rem", marginBottom: 6 }}>
                  General Knowledge Quiz
                </div>
                <div style={{ color: "#444", marginBottom: 24 }}>
                  Test your knowledge across various domains including history, science, and arts.
                </div>
                <button
                  style={{
                    background: "#00bcd4",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "12px 0",
                    width: "100%",
                    fontWeight: 600,
                    fontSize: "1.08rem",
                    cursor: "pointer",
                    textAlign: "left", // Align text to the left
                    paddingLeft: "32px" // Add left padding to move text right
                  }}
                >
                  Take Assessment &nbsp; &rarr;
                </button>
              </div>
              {/* Basic Coding Challenge */}
              <div style={{
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                padding: "32px 32px 24px 32px",
                minWidth: 340,
                maxWidth: 360,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start"
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>⋙&nbsp;&lt;/&gt;</div>
                <div style={{ fontWeight: 700, fontSize: "1.25rem", marginBottom: 6 }}>
                  Basic Coding Challenge
                </div>
                <div style={{ color: "#444", marginBottom: 24 }}>
                  A short challenge to assess basic programming concepts and problem-solving skills.
                </div>
                <button
                  style={{
                    background: "#00bcd4",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "12px 0",
                    width: "100%",
                    fontWeight: 600,
                    fontSize: "1.08rem",
                    cursor: "pointer",
                    textAlign: "left", // Align text to the left
                    paddingLeft: "32px" // Add left padding to move text right
                  }}
                  onClick={() => {
                    setShowAssessments(false);
                    setShowCodingQuiz(true);
                  }}
                >
                  Take Assessment &nbsp; &rarr;
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Assessments Popup */}
        {showAssessments && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.32)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                boxShadow: "0 4px 32px rgba(0,0,0,0.18)",
                padding: "40px 32px 32px 32px",
                minWidth: 340,
                maxWidth: 900,
                width: "90vw",
                maxHeight: "90vh",
                overflowY: "auto",
                position: "relative"
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowAssessments(false)}
                style={{
                  position: "absolute",
                  top: 18,
                  right: 24,
                  background: "transparent",
                  border: "none",
                  fontSize: 28,
                  color: "#888",
                  cursor: "pointer",
                  fontWeight: 700,
                  lineHeight: 1
                }}
                aria-label="Close"
              >
                ×
              </button>
              <h1 style={{ textAlign: "center", fontSize: "2.5rem", fontWeight: 700, marginBottom: 8 }}>
                Available Assessments
              </h1>
              <p style={{ textAlign: "center", color: "#555", fontSize: "1.18rem", marginBottom: 36 }}>
                Choose from a variety of assessments to test your knowledge and skills. Get instant, AI-powered feedback.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
                {/* General Knowledge Quiz */}
                <div style={{
                  background: "#fff",
                  borderRadius: 12,
                  boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                  padding: "32px 32px 24px 32px",
                  minWidth: 340,
                  maxWidth: 360,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginBottom: 24
                }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>🧠</div>
                  <div style={{ fontWeight: 700, fontSize: "1.25rem", marginBottom: 6 }}>
                    General Knowledge Quiz
                  </div>
                  <div style={{ color: "#444", marginBottom: 24 }}>
                    Test your knowledge across various domains including history, science, and arts.
                  </div>
                  <button
                    style={{
                      background: "#00bcd4",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "12px 0",
                      width: "100%",
                      fontWeight: 600,
                      fontSize: "1.08rem",
                      cursor: "pointer",
                      textAlign: "left", // Align text to the left
                      paddingLeft: "32px" // Add left padding to move text right
                    }}
                  >
                    Take Assessment &nbsp; &rarr;
                  </button>
                </div>
                {/* Basic Coding Challenge */}
                <div style={{
                  background: "#fff",
                  borderRadius: 12,
                  boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                  padding: "32px 32px 24px 32px",
                  minWidth: 340,
                  maxWidth: 360,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginBottom: 24
                }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>⋙&nbsp;&lt;/&gt;</div>
                  <div style={{ fontWeight: 700, fontSize: "1.25rem", marginBottom: 6 }}>
                    Basic Coding Challenge
                  </div>
                  <div style={{ color: "#444", marginBottom: 24 }}>
                    A short challenge to assess basic programming concepts and problem-solving skills.
                  </div>
                  <button
                    style={{
                      background: "#00bcd4",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "12px 0",
                      width: "100%",
                      fontWeight: 600,
                      fontSize: "1.08rem",
                      cursor: "pointer",
                      textAlign: "left", // Align text to the left
                      paddingLeft: "32px" // Add left padding to move text right
                    }}
                    onClick={() => {
                      setShowAssessments(false);
                      setShowCodingQuiz(true);
                    }}
                  >
                    Take Assessment &nbsp; &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showCodingQuiz && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.32)",
              zIndex: 1100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                boxShadow: "0 4px 32px rgba(0,0,0,0.18)",
                padding: "40px 32px 32px 32px",
                minWidth: 340,
                maxWidth: 600,
                width: "90vw",
                maxHeight: "90vh",
                overflowY: "auto",
                position: "relative"
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowCodingQuiz(false)}
                style={{
                  position: "absolute",
                  top: 18,
                  right: 24,
                  background: "transparent",
                  border: "none",
                  fontSize: 28,
                  color: "#888",
                  cursor: "pointer",
                  fontWeight: 700,
                  lineHeight: 1
                }}
                aria-label="Close"
              >
                ×
              </button>
              <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 4 }}>Basic Coding Challenge</h1>
              <p style={{ color: "#666", marginBottom: 28 }}>
                A short challenge to assess basic programming concepts and problem-solving skills.
              </p>
              <form>
                {/* Question 1: Editable input */}
                <div style={{ marginBottom: 24, background: "#fafbfc", borderRadius: 8, padding: 18, border: "1px solid #eee" }}>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>
                    What is the output of the following Python code? <br /> <span style={{ fontFamily: "monospace" }}>print("Hello, " + "World!")</span>
                  </div>
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: 6,
                      border: "1px solid #ddd",
                      fontSize: "1rem",
                      marginTop: 6,
                      background: "#f6f6f6"
                    }}
                    placeholder="Your answer"
                    value={codingQuizAnswer1}
                    onChange={e => setCodingQuizAnswer1(e.target.value)}
                  />
                </div>
                {/* Question 2: Radio buttons beside text, answers left-aligned */}
                <div style={{ marginBottom: 24, background: "#fafbfc", borderRadius: 8, padding: 18, border: "1px solid #eee" }}>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>
                    Which of these is a JavaScript framework?
                  </div>
                  <div>
                    <label style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ minWidth: 60, textAlign: "left", marginRight: 12 }}>Python</span>
                      <input
                        type="radio"
                        name="jsfw"
                        checked={codingQuizAnswer2 === "Python"}
                        onChange={() => setCodingQuizAnswer2("Python")}
                      />
                    </label>
                    <label style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ minWidth: 60, textAlign: "left", marginRight: 12 }}>React</span>
                      <input
                        type="radio"
                        name="jsfw"
                        checked={codingQuizAnswer2 === "React"}
                        onChange={() => setCodingQuizAnswer2("React")}
                      />
                    </label>
                    <label style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ minWidth: 60, textAlign: "left", marginRight: 12 }}>Java</span>
                      <input
                        type="radio"
                        name="jsfw"
                        checked={codingQuizAnswer2 === "Java"}
                        onChange={() => setCodingQuizAnswer2("Java")}
                      />
                    </label>
                    <label style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ minWidth: 60, textAlign: "left", marginRight: 12 }}>C++</span>
                      <input
                        type="radio"
                        name="jsfw"
                        checked={codingQuizAnswer2 === "C++"}
                        onChange={() => setCodingQuizAnswer2("C++")}
                      />
                    </label>
                  </div>
                </div>
                {/* Question 3: Radio buttons beside text, answers left-aligned */}
                <div style={{ marginBottom: 24, background: "#fafbfc", borderRadius: 8, padding: 18, border: "1px solid #eee" }}>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>
                    A for loop is a type of control flow statement.
                  </div>
                  <div>
                    <label style={{ display: "flex", alignItems: "center", marginRight: 24 }}>
                      <span style={{ minWidth: 60, textAlign: "left", marginRight: 12 }}>True</span>
                      <input
                        type="radio"
                        name="forloop"
                        checked={codingQuizAnswer3 === "True"}
                        onChange={() => setCodingQuizAnswer3("True")}
                      />
                    </label>
                    <label style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ minWidth: 60, textAlign: "left", marginRight: 12 }}>False</span>
                      <input
                        type="radio"
                        name="forloop"
                        checked={codingQuizAnswer3 === "False"}
                        onChange={() => setCodingQuizAnswer3("False")}
                      />
                    </label>
                  </div>
                </div>
                {/* Submit button: green and centered */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    type="button"
                    style={{
                      background: "#43a047", // Green
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "13px 32px",
                      fontWeight: 600,
                      fontSize: "1.12rem",
                      marginTop: 12,
                      cursor: "pointer",
                      minWidth: 260
                    }}
                    onClick={() => {
                      setShowCodingQuiz(false);
                      setQuizScore(Math.floor(Math.random() * 11)); // 0-10
                      setShowQuizResult(true);
                    }}
                  >
                    Submit & View Report
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showQuizResult && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(67,160,71,0.10)", // light green overlay
              zIndex: 1200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                background: "#e8f5e9", // very light green
                borderRadius: 16,
                boxShadow: "0 4px 32px rgba(67,160,71,0.10)",
                padding: "40px 48px 32px 48px",
                minWidth: 320,
                maxWidth: 400,
                width: "90vw",
                textAlign: "center",
                border: "2px solid #43a047",
                position: "relative"
              }}
            >
              <div style={{ fontSize: "2rem", fontWeight: 700, color: "#43a047", marginBottom: 8 }}>
                Your Rating
              </div>
              <div style={{ fontSize: "5rem", fontWeight: 700, color: "#43a047", marginBottom: 0 }}>
                {quizScore} <span style={{ fontSize: "2.2rem", color: "#2e7d32" }}>/10</span>
              </div>
              <div style={{ fontSize: "1.5rem", color: "#388e3c", marginTop: 12, fontWeight: 600 }}>
                {quizScore >= 8 ? "Excellent!" : quizScore >= 5 ? "Not bad!" : "Keep practicing!"}
              </div>
              {/* Buttons row */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 32 }}>
                <button
                  style={{
                    background: "#43a047",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "10px 24px",
                    fontWeight: 600,
                    fontSize: "1.08rem",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    setShowProfileSuccess(true);
                    setTimeout(() => setShowProfileSuccess(false), 2000);
                    // Add your logic to save the score to profile here if needed
                  }}
                >
                  Add to Profile
                </button>
                <button
                  style={{
                    background: "#388e3c",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "10px 24px",
                    fontWeight: 600,
                    fontSize: "1.08rem",
                    cursor: "pointer"
                  }}
                  onClick={() => setShowQuizResult(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {showProfileSuccess && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(67,160,71,0.10)",
              zIndex: 1300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                background: "#43a047",
                color: "#fff",
                padding: "24px 48px",
                borderRadius: 12,
                fontSize: "1.25rem",
                fontWeight: 600,
                boxShadow: "0 2px 16px rgba(67,160,71,0.18)"
              }}
            >
              Score added to your profile!
            </div>
          </div>
        )}

        {showProfileViews && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.18)",
              zIndex: 1250,
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
              <button
                onClick={() => setShowProfileViews(false)}
                style={{
                  position: "absolute",
                  top: 16,
                  right: 24,
                  background: "transparent",
                  border: "none",
                  fontSize: 26,
                  color: "#888",
                  cursor: "pointer",
                  fontWeight: 700,
                  lineHeight: 1
                }}
                aria-label="Close"
              >
                ×
              </button>
              <div style={{ fontSize: "1.7rem", fontWeight: 700, color: "#43a047", marginBottom: 18 }}>
                Companies That Viewed Your Profile
              </div>
              {profileViews.length === 0 ? (
                <div style={{ color: "#888", fontSize: "1.1rem" }}>No companies have viewed your profile yet.</div>
              ) : (
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {profileViews.map((view, idx) => (
                    <li key={idx} style={{
                      background: "#e8f5e9",
                      borderRadius: 8,
                      marginBottom: 12,
                      padding: "14px 18px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "1.08rem",
                      color: "#222"
                    }}>
                      <span style={{ fontWeight: 600 }}>{view.company}</span>
                      <span style={{ color: "#388e3c", fontSize: "0.98rem" }}>{view.date}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

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
                <div style={{ fontWeight: 600 }}>{incomingCall.from} is calling you...</div>
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
                  onClick={handleAcceptCall}
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

        <h1 className="student-title" style={{ marginLeft: 32, marginTop: 16, display: "flex", alignItems: "center", gap: 16 }}>
          <img
            src={proStudentImg}
            alt="Pro Student"
            style={{ height: 150, marginRight: 8, verticalAlign: "middle" }}
          />
          Student Dashboard
        </h1>
        <p className="student-description" style={{ marginLeft: 32 }}>
          Access your internship applications, notifications, and profile details.
        </p>
        <div style={{ margin: "32px" }}>
          {sidebarTab === 'profile' && <Profile />}
          {sidebarTab === 'suggested-companies' && <SuggestedCompanies />}
          {sidebarTab === 'applied-internships' && <AppliedInternships />}
          {sidebarTab === 'evaluate-companies' && <EvaluateCompanies />}
          {sidebarTab === 'internship-reports' && <InternshipReports />}
          {sidebarTab === 'courses' && <Courses />}
        </div>
      </div>
    </div>
  );
}

export default Student;