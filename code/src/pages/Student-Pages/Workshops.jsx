import React, { useState } from 'react';
import './Courses.css'; // Reuse the course card CSS for scale effect

function Workshops({ onRegisterWorkshop }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  // Modal state for registration
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerWorkshop, setRegisterWorkshop] = useState(null);
  const [registerForm, setRegisterForm] = useState({
    name: '',
    major: '',
    id: '',
    email: '',
    phone: ''
  });

  // Live workshop stream state
  const [liveWorkshop, setLiveWorkshop] = useState(null);

  // Recorded workshop screen state
  const [recordedWorkshop, setRecordedWorkshop] = useState(null);

  // Notes state
  const [notes, setNotes] = useState({});

  // Chat state
  const [chatMessages, setChatMessages] = useState({
    // Example: [workshopId]: [{user, text, time}]
  });

  // Certificate state
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateWorkshop, setCertificateWorkshop] = useState(null);

  // Feedback state
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackWorkshop, setFeedbackWorkshop] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(0);

  const handleRegisterChange = (field, value) => {
    setRegisterForm(f => ({ ...f, [field]: value }));
  };

  // Helper to get/set notes for each workshop (now only from state)
  const getNote = id => notes[id] ?? "";
  const setNote = (id, value) => {
    setNotes(n => ({ ...n, [id]: value }));
    localStorage.setItem(`workshop_notes_${id}`, value);
  };

  // Helper to get/set chat for each workshop
  const getChat = id => chatMessages[id] ?? [
    { user: "Instructor", text: "Welcome to the workshop! Feel free to ask questions here.", time: "05:28 PM" },
    { user: "Alice", text: "Hello everyone!", time: "05:29 PM" }
  ];
  const addChat = (id, msg) => {
    setChatMessages(c => ({
      ...c,
      [id]: [...(c[id] ?? getChat(id)), msg]
    }));
  };

  // When opening a live workshop, initialize the note if not already in state
  const openLiveWorkshop = (workshop) => {
    setLiveWorkshop(workshop);
    setNotes(n => {
      if (n[workshop.id] !== undefined) return n;
      const saved = localStorage.getItem(`workshop_notes_${workshop.id}`) ?? "";
      return { ...n, [workshop.id]: saved };
    });
  };

  // When leaving a live workshop, show certificate first, then feedback after closing certificate
  const handleLeaveLiveWorkshop = () => {
    setShowCertificate(true);
    setCertificateWorkshop(liveWorkshop);
    setLiveWorkshop(null);
  };

  // When closing the certificate, show feedback if needed
  const handleCloseCertificate = () => {
    if (certificateWorkshop) {
      setFeedbackWorkshop(certificateWorkshop);
      setShowFeedbackModal(true);
      setCertificateWorkshop(null);
    }
    setShowCertificate(false);
  };

  // When leaving a recorded workshop, show certificate first, then feedback after closing certificate
  const handleBackRecorded = (workshop) => {
    setShowCertificate(true);
    setCertificateWorkshop(workshop);
    setRecordedWorkshop(null);
  };

  const workshops = [
    {
      id: 'WS101',
      title: 'Introduction to Machine Learning',
      description: 'A beginner-friendly workshop on the basics of machine learning.',
      instructor: 'Dr. Andrew Ng',
      schedule: 'Saturday, 10:00 AM - 1:00 PM @ Room C101',
    },
    {
      id: 'WS102',
      title: 'Web Development Bootcamp',
      description: 'Learn the fundamentals of web development in this hands-on workshop.',
      instructor: 'Ms. Jane Doe',
      schedule: 'Sunday, 2:00 PM - 5:00 PM @ Room D202',
    },
    // --- Live Workshops ---
    {
      id: 'WS107',
      title: 'Live: AI in Healthcare',
      description: 'Explore real-time AI applications in healthcare. Join live and interact!',
      instructor: 'Dr. Sarah Connor',
      schedule: 'LIVE NOW',
      live: true,
      joinUrl: 'https://live.example.com/ai-healthcare'
    },
    {
      id: 'WS108',
      title: 'Live: Cloud Computing',
      description: 'A live interactive session on cloud computing basics and demos.',
      instructor: 'Mr. Cloud Strife',
      schedule: 'LIVE NOW',
      live: true,
      joinUrl: 'https://live.example.com/cloud-essentials'
    },
    // --- New Live Workshops ---
    {
      id: 'WS109',
      title: 'LIVE: Building Scalable Web Apps',
      description: 'Hands-on live session on scalable web app architecture and deployment.',
      instructor: 'Dr. Alice Wonderland',
      schedule: 'LIVE NOW',
      live: true,
      joinUrl: 'https://live.example.com/scalable-web-apps'
    },
    {
      id: 'WS110',
      title: 'LIVE: Data Science in Action',
      description: 'Live workshop with real-world data science projects and Q&A.',
      instructor: 'Dr. Bob Data',
      schedule: 'LIVE NOW',
      live: true,
      joinUrl: 'https://live.example.com/data-science-action'
    },
    // --- End Live Workshops ---
    {
      id: 'WS201',
      title: 'Recorded: Introduction to Data Analytics',
      description: 'Watch this recorded session to learn the basics of data analytics.',
      instructor: 'Ms. Linda Brown',
      schedule: 'Recorded Session',
      recorded: true,
      videoUrl: 'https://recorded.example.com/data-analytics'
    },
    {
      id: 'WS202',
      title: 'Recorded: DevOps Fundamentals',
      description: 'A comprehensive recorded workshop on DevOps practices and tools.',
      instructor: 'Mr. Kevin Lee',
      schedule: 'Recorded Session',
      recorded: true,
      videoUrl: 'https://recorded.example.com/devops-fundamentals'
    },
    {
      id: 'WS103',
      title: 'UI/UX Design Essentials',
      description: 'Explore the principles of user interface and user experience design.',
      instructor: 'Mr. John Smith',
      schedule: 'Monday, 3:00 PM - 5:00 PM @ Room B110',
    },
    {
      id: 'WS104',
      title: 'Data Visualization with Python',
      description: 'Hands-on workshop on creating impactful data visualizations using Python libraries.',
      instructor: 'Dr. Emily Clark',
      schedule: 'Wednesday, 1:00 PM - 4:00 PM @ Lab 3',
    },
    {
      id: 'WS105',
      title: 'Agile Project Management',
      description: 'Learn the basics of Agile methodology and how to manage projects efficiently.',
      instructor: 'Ms. Sara Lee',
      schedule: 'Friday, 9:00 AM - 12:00 PM @ Room E201',
    },
    {
      id: 'WS106',
      title: 'Cybersecurity Fundamentals',
      description: 'Understand the core concepts of cybersecurity and how to protect digital assets.',
      instructor: 'Mr. Alex Turner',
      schedule: 'Thursday, 2:00 PM - 4:00 PM @ Room F105',
    },
  ];

  const filteredWorkshops = workshops.filter((workshop) =>
    workshop.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Certificate Popup Component
  const CertificatePopup = ({ workshop, onClose }) => (
    <div style={{
      position: "fixed",
      top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.18)",
      zIndex: 2000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 4px 32px rgba(0,0,0,0.18)",
        width: 420,
        maxWidth: "95vw",
        padding: "36px 32px 32px 32px",
        position: "relative",
        textAlign: "center"
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            right: 18,
            top: 18,
            background: "none",
            border: "none",
            fontSize: 22,
            color: "#888",
            cursor: "pointer"
          }}
          aria-label="Close"
        >×</button>
        <div style={{ fontSize: 44, marginBottom: 12 }}>🎓</div>
        <div style={{ fontWeight: 700, fontSize: "1.5rem", color: "#22c55e", marginBottom: 8 }}>
          Certificate of Attendance
        </div>
        <div style={{ color: "#64748b", fontSize: "1.1rem", marginBottom: 18 }}>
          This certifies that you have attended<br />
          <span style={{ fontWeight: 600, color: "#007bff" }}>{workshop?.title}</span>
        </div>
        <div style={{ color: "#7b8a9a", fontSize: "1rem", marginBottom: 18 }}>
          Instructor: {workshop?.instructor}
        </div>
        <div style={{ color: "#7b8a9a", fontSize: "1rem", marginBottom: 18 }}>
          Date: {new Date().toLocaleDateString()}
        </div>
        <button
          onClick={onClose}
          style={{
            background: "#43a047",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 24px",
            fontWeight: 600,
            fontSize: "1.08rem",
            cursor: "pointer",
            marginTop: 12
          }}
        >
          Close
        </button>
      </div>
    </div>
  );

  // Feedback Modal Component
  const FeedbackModal = ({ workshop, onClose }) => (
    <div style={{
      position: "fixed",
      top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.18)",
      zIndex: 3000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 14,
        boxShadow: "0 4px 32px rgba(0,0,0,0.13)",
        width: 420,
        maxWidth: "95vw",
        padding: "32px 32px 24px 32px",
        position: "relative",
        textAlign: "center"
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            right: 18,
            top: 18,
            background: "none",
            border: "none",
            fontSize: 22,
            color: "#888",
            cursor: "pointer"
          }}
          aria-label="Close"
        >×</button>
        <div style={{ fontWeight: 700, fontSize: "1.35rem", marginBottom: 12 }}>
          Rate &amp; Give Feedback
        </div>
        <div style={{ color: "#7b8a9a", marginBottom: 18 }}>
          How would you rate <span style={{ fontWeight: 600, color: "#007bff" }}>{workshop?.title}</span>?
        </div>
        <div style={{ marginBottom: 18 }}>
          {[1,2,3,4,5].map(star => (
            <span
              key={star}
              style={{
                fontSize: 32,
                color: star <= feedbackRating ? "#ffc107" : "#e0e0e0",
                cursor: "pointer",
                transition: "color 0.2s"
              }}
              onClick={() => setFeedbackRating(star)}
              onMouseEnter={() => setFeedbackRating(star)}
              onMouseLeave={() => setFeedbackRating(feedbackRating)}
              role="img"
              aria-label={star + " star"}
            >★</span>
          ))}
        </div>
        <textarea
          placeholder="Write your feedback here..."
          value={feedbackText}
          onChange={e => setFeedbackText(e.target.value)}
          style={{
            width: "100%",
            minHeight: 80,
            borderRadius: 8,
            border: "1px solid #e0e0e0",
            background: "#f7f9fa",
            fontSize: "1.05rem",
            color: "#64748b",
            padding: "10px",
            marginBottom: 18,
            resize: "vertical"
          }}
        />
        <button
          onClick={() => {
            setShowFeedbackModal(false);
            setFeedbackText('');
            setFeedbackRating(0);
            setFeedbackWorkshop(null);
            alert('Thank you for your feedback!');
          }}
          style={{
            background: "#43a047",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 24px",
            fontWeight: 600,
            fontSize: "1.08rem",
            cursor: "pointer"
          }}
          disabled={feedbackRating === 0}
        >
          Submit
        </button>
      </div>
    </div>
  );

  // Live Workshop Stream "Screen" (not modal)
  const LiveWorkshopStreamScreen = ({ workshop }) => {
    const [chatInput, setChatInput] = useState("");
    const messages = getChat(workshop.id);

    return (
      <div style={{
        minHeight: "100vh",
        background: "#f7fafc",
        padding: "0 0 32px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div style={{
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 4px 32px rgba(0,0,0,0.13)",
          width: 1000,
          maxWidth: "99vw",
          margin: "32px 0 0 0",
          position: "relative"
        }}>
          <div style={{
            background: "#f7fafc",
            borderRadius: "14px 14px 0 0",
            padding: "32px 32px 18px 32px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "#22c55e", marginBottom: 6 }}>
              Live Workshop: {workshop.title}
            </div>
            <div style={{ color: "#7b8a9a", fontSize: "1.25rem", marginBottom: 18 }}>
              Instructor: {workshop.instructor}
            </div>
            <button
              onClick={handleLeaveLiveWorkshop}
              style={{
                margin: "0 auto",
                marginBottom: 10,
                background: "#e5e7eb",
                color: "#222",
                border: "none",
                borderRadius: 8,
                padding: "10px 24px",
                fontWeight: 500,
                fontSize: "1.05rem",
                cursor: "pointer"
              }}
            >
              Leave Workshop
            </button>
          </div>
          {/* Stream Section */}
          <div style={{
            margin: "24px 32px 0 32px",
            background: "#f1f5f9",
            borderRadius: 12,
            padding: "0 0 32px 0"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontWeight: 700,
              fontSize: "1.18rem",
              color: "#222",
              padding: "18px 0 0 24px"
            }}>
              <span role="img" aria-label="tv" style={{ color: "#22c55e", fontSize: 22 }}>📺</span>
              Workshop Stream
            </div>
            <div style={{
              margin: "18px 0 0 0",
              background: "#e2e8f0",
              borderRadius: 10,
              minHeight: 320,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <span style={{ fontSize: 64, color: "#94a3b8" }}>▶️</span>
              <div style={{ fontWeight: 600, color: "#64748b", fontSize: "1.18rem", marginTop: 8 }}>
                Live Video Stream Placeholder
              </div>
              <div style={{ color: "#64748b", fontSize: "1rem", marginTop: 2 }}>
                The workshop will begin shortly.
              </div>
            </div>
          </div>
          {/* Notes Section under the stream */}
          <div style={{
            margin: "24px 32px 0 32px",
            background: "#f3f6f8",
            borderRadius: 12,
            boxShadow: "0 1px 6px rgba(56,211,159,0.07)"
          }}>
            <div style={{
              background: "#e9eef1",
              borderRadius: "12px 12px 0 0",
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontWeight: 700,
              fontSize: "1.6rem",
              color: "#222"
            }}>
              <span role="img" aria-label="notes" style={{ color: "#22c55e", fontSize: 28 }}>📄</span>
              My Notes
            </div>
            <div style={{ padding: 18 }}>
              <textarea
                style={{
                  width: "100%",
                  minHeight: 180,
                  borderRadius: 8,
                  border: "none",
                  background: "#f7f9fa",
                  fontSize: "1.15rem",
                  color: "#64748b",
                  padding: "12px",
                  resize: "vertical",
                  outline: "none"
                }}
                placeholder="Start typing your notes here... They are saved automatically in your browser."
                value={getNote(workshop.id)}
                onChange={e => setNote(workshop.id, e.target.value)}
              />
              <button
                style={{
                  marginTop: 12,
                  background: "#e5e7eb",
                  color: "#222",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 24px",
                  fontWeight: 500,
                  fontSize: "1.05rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8
                }}
                onClick={() => {
                  const notes = getNote(workshop.id);
                  const blob = new Blob([notes], { type: "text/plain" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "notes.txt";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                <span role="img" aria-label="download">⬇️</span>
                Download Notes
              </button>
            </div>
          </div>
          {/* Live Chat Section */}
          <div style={{
            margin: "24px 32px 0 32px",
            background: "#e9eef1",
            borderRadius: 12,
            boxShadow: "0 1px 6px rgba(56,211,159,0.07)"
          }}>
            <div style={{
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontWeight: 700,
              fontSize: "1.6rem",
              color: "#222"
            }}>
              <span role="img" aria-label="chat" style={{ color: "#22c55e", fontSize: 28 }}>💬</span>
              Live Chat
            </div>
            <div style={{
              background: "#f7fafc",
              borderRadius: 8,
              margin: "0 18px 0 18px",
              minHeight: 220,
              maxHeight: 300,
              overflowY: "auto",
              padding: "18px 12px"
            }}>
              {messages.map((msg, i) => (
                <div key={i} style={{
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: "#e0e7ef", color: "#64748b",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, fontSize: 18
                  }}>
                    {msg.user[0]}
                  </div>
                  <div>
                    <div style={{
                      background: "#cfd8df",
                      borderRadius: 10,
                      padding: "10px 16px",
                      fontSize: "1.05rem",
                      color: "#374151",
                      fontWeight: msg.user === "Instructor" ? 700 : 500,
                      marginBottom: 2
                    }}>
                      {msg.user === "Instructor" ? <span style={{ fontWeight: 700 }}>Instructor</span> : msg.user}
                      <div style={{ fontWeight: 400, marginTop: 2 }}>{msg.text}</div>
                    </div>
                    <div style={{ fontSize: "0.95rem", color: "#7b8a9a", marginLeft: 4 }}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <form
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 18px 12px 18px",
                borderTop: "1px solid #e0e0e0"
              }}
              onSubmit={e => {
                e.preventDefault();
                if (!chatInput.trim()) return;
                const now = new Date();
                const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                addChat(workshop.id, { user: "You", text: chatInput, time });
                setChatInput("");
              }}
            >
              <input
                type="text"
                placeholder="Type your message..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                style={{
                  flex: 1,
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 14px",
                  fontSize: "1.08rem",
                  background: "#f7f9fa",
                  color: "#64748b",
                  outline: "none"
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#7be3a2",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 16px",
                  cursor: "pointer",
                  fontSize: 22,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <span role="img" aria-label="send">✈️</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Recorded Workshop Screen
  const RecordedWorkshopScreen = ({ workshop }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Simulate video controls (for placeholder)
    const handlePlay = () => { setIsPlaying(true); setIsPaused(false); };
    const handlePause = () => { setIsPaused(true); };
    const handleStop = () => { setIsPlaying(false); setIsPaused(false); };

    return (
      <div style={{
        minHeight: "100vh",
        background: "#f7fafc",
        padding: "0 0 32px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div style={{
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 4px 32px rgba(0,0,0,0.13)",
          width: 1000,
          maxWidth: "99vw",
          margin: "32px 0 0 0",
          position: "relative"
        }}>
          <div style={{
            background: "#f7fafc",
            borderRadius: "14px 14px 0 0",
            padding: "32px 32px 18px 32px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "#8e24aa", marginBottom: 6 }}>
              Recorded Workshop: {workshop.title}
            </div>
            <div style={{ color: "#7b8a9a", fontSize: "1.25rem", marginBottom: 18 }}>
              Instructor: {workshop.instructor}
            </div>
            <button
              onClick={() => handleBackRecorded(workshop)}
              style={{
                margin: "0 auto",
                marginBottom: 10,
                background: "#e5e7eb",
                color: "#222",
                border: "none",
                borderRadius: 8,
                padding: "10px 24px",
                fontWeight: 500,
                fontSize: "1.05rem",
                cursor: "pointer"
              }}
            >
              Back to Workshops
            </button>
          </div>
          {/* Stream Section ONLY */}
          <div style={{
            margin: "24px 32px 0 32px",
            background: "#f1f5f9",
            borderRadius: 12,
            padding: "0 0 32px 0"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontWeight: 700,
              fontSize: "1.18rem",
              color: "#222",
              padding: "18px 0 0 24px"
            }}>
              <span role="img" aria-label="tv" style={{ color: "#8e24aa", fontSize: 22 }}>📺</span>
              Recorded Stream
            </div>
            <div style={{
              margin: "18px 0 0 0",
              background: "#e2e8f0",
              borderRadius: 10,
              minHeight: 320,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <span style={{ fontSize: 64, color: "#94a3b8" }}>▶️</span>
              <div style={{ fontWeight: 600, color: "#64748b", fontSize: "1.18rem", marginTop: 8 }}>
                {isPlaying
                  ? isPaused
                    ? "Paused"
                    : "Playing Recorded Video..."
                  : "Press Play to start the recorded session."}
              </div>
              <div style={{ marginTop: 18, display: "flex", gap: 16 }}>
                <button
                  onClick={handlePlay}
                  style={{
                    background: "#8e24aa",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 24px",
                    fontWeight: 600,
                    fontSize: "1.05rem",
                    cursor: "pointer",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#6d1b7b"}
                  onMouseLeave={e => e.currentTarget.style.background = "#8e24aa"}
                >▶️ Play</button>
                <button
                  onClick={handlePause}
                  style={{
                    background: "#ffb300",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 24px",
                    fontWeight: 600,
                    fontSize: "1.05rem",
                    cursor: "pointer",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#b28704"}
                  onMouseLeave={e => e.currentTarget.style.background = "#ffb300"}
                >⏸ Pause</button>
                <button
                  onClick={handleStop}
                  style={{
                    background: "#e53935",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 24px",
                    fontWeight: 600,
                    fontSize: "1.05rem",
                    cursor: "pointer",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#b71c1c"}
                  onMouseLeave={e => e.currentTarget.style.background = "#e53935"}
                >⏹ Stop</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Certificate Popup */}
      {showCertificate && certificateWorkshop && (
        <CertificatePopup
          workshop={certificateWorkshop}
          onClose={handleCloseCertificate}
        />
      )}
      {/* Feedback Modal */}
      {showFeedbackModal && feedbackWorkshop && (
        <FeedbackModal
          workshop={feedbackWorkshop}
          onClose={() => {
            setShowFeedbackModal(false);
            setFeedbackText('');
            setFeedbackRating(0);
            setFeedbackWorkshop(null);
          }}
        />
      )}
      {/* Register Modal */}
      {showRegisterModal && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(0,0,0,0.18)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{
            background: "#fff",
            borderRadius: 14,
            boxShadow: "0 4px 32px rgba(0,0,0,0.13)",
            width: 480,
            maxWidth: "95vw",
            padding: "32px 32px 24px 32px",
            position: "relative"
          }}>
            <button
              onClick={() => setShowRegisterModal(false)}
              style={{
                position: "absolute",
                right: 18,
                top: 18,
                background: "none",
                border: "none",
                fontSize: 22,
                color: "#888",
                cursor: "pointer"
              }}
              aria-label="Close"
            >×</button>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span role="img" aria-label="edit" style={{ fontSize: 22, color: "#43a047" }}>📝</span>
              <span style={{ fontWeight: 700, fontSize: "1.35rem" }}>
                Register for {registerWorkshop?.title}
              </span>
            </div>
            <div style={{ color: "#7b8a9a", marginBottom: 18 }}>
              Please fill in your details to register for this workshop.
            </div>
            <form
              onSubmit={e => {
                e.preventDefault();
                setShowRegisterModal(false);
                setRegisterForm({ name: '', major: '', id: '', email: '', phone: '' });
                if (onRegisterWorkshop && registerWorkshop) {
                  onRegisterWorkshop(registerWorkshop);
                }
                alert('Registration submitted!');
              }}
            >
              <label>Name</label>
              <input
                value={registerForm.name}
                onChange={e => handleRegisterChange('name', e.target.value)}
                required
                style={{ width: "100%", marginBottom: 12 }}
              />
              <label>Major</label>
              <input
                value={registerForm.major}
                onChange={e => handleRegisterChange('major', e.target.value)}
                required
                style={{ width: "100%", marginBottom: 12 }}
              />
              <label>ID</label>
              <input
                value={registerForm.id}
                onChange={e => handleRegisterChange('id', e.target.value)}
                required
                style={{ width: "100%", marginBottom: 12 }}
              />
              <label>Email</label>
              <input
                type="email"
                value={registerForm.email}
                onChange={e => handleRegisterChange('email', e.target.value)}
                required
                style={{ width: "100%", marginBottom: 12 }}
              />
              <label>Phone Number</label>
              <input
                value={registerForm.phone}
                onChange={e => handleRegisterChange('phone', e.target.value)}
                required
                style={{ width: "100%", marginBottom: 12 }}
              />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
                <button
                  type="submit"
                  style={{
                    background: "#43a047",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 24px",
                    fontWeight: 600,
                    fontSize: "1.08rem",
                    cursor: "pointer"
                  }}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {liveWorkshop ? (
        <LiveWorkshopStreamScreen workshop={liveWorkshop} />
      ) : recordedWorkshop ? (
        <RecordedWorkshopScreen workshop={recordedWorkshop} />
      ) : (
        <>
          {!selectedWorkshop ? (
            <>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '16px' }}>
                🛠️ Explore Workshops
              </h1>
              <input
                type="text"
                placeholder="Search workshops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  marginBottom: '24px',
                }}
              />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '16px',
                }}
              >
                {filteredWorkshops.map((workshop) => (
                  <div
                    key={workshop.id}
                    className="course-card" // Reuse the scale effect from Courses.css
                    style={{
                      minHeight: 0,
                      padding: '12px',
                      maxWidth: 260,
                      margin: '0 auto',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#007bff', marginBottom: 6 }}>
                        {workshop.title}
                      </h3>
                      {workshop.live && (
                        <span style={{
                          background: '#e53935',
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: '0.78rem',
                          borderRadius: 6,
                          padding: '2px 8px',
                          marginLeft: 2,
                          letterSpacing: 1,
                        }}>
                          LIVE
                        </span>
                      )}
                      {workshop.recorded && (
                        <span style={{
                          background: '#8e24aa', // purple
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: '0.78rem',
                          borderRadius: 6,
                          padding: '2px 8px',
                          marginLeft: 2,
                          letterSpacing: 1,
                        }}>
                          RECORDED
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#6c757d', marginBottom: '6px' }}>
                      {workshop.description}
                    </p>
                    <p style={{ fontSize: '0.82rem', color: '#4d6a7a', marginBottom: '6px' }}>
                      Instructor: {workshop.instructor}
                    </p>
                    <p style={{ fontSize: '0.82rem', color: '#4d6a7a', marginBottom: '10px' }}>
                      Schedule: {workshop.schedule}
                    </p>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => setSelectedWorkshop(workshop)}
                        style={{
                          padding: '3px 5px',
                          background: '#43a047',
                          color: '#fff',
                          fontSize: '0.95rem',
                          fontWeight: 'bold',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          flex: 1,
                          transition: 'background 0.2s, transform 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#388e3c'}
                        onMouseLeave={e => e.currentTarget.style.background = '#43a047'}
                      >
                        View Details
                      </button>
                      {workshop.live ? (
                        <button
                          style={{
                            padding: '5px 5px',
                            background: '#e53935',
                            color: '#fff',
                            fontSize: '0.95rem',
                            fontWeight: 'bold',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background 0.2s, transform 0.2s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#b71c1c'}
                          onMouseLeave={e => e.currentTarget.style.background = '#e53935'}
                          onClick={() => openLiveWorkshop(workshop)}
                        >
                          Join
                        </button>
                      ) : workshop.recorded ? (
                        <button
                          style={{
                            padding: '5px 5px',
                            background: '#8e24aa', // purple
                            color: '#fff',
                            fontSize: '0.95rem',
                            fontWeight: 'bold',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background 0.2s, transform 0.2s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#6d1b7b'}
                          onMouseLeave={e => e.currentTarget.style.background = '#8e24aa'}
                          onClick={() => setRecordedWorkshop(workshop)}
                        >
                          ▶️ Play
                        </button>
                      ) : (
                        <button
                          style={{
                            padding: '5px 5px',
                            background: '#007bff',
                            color: '#fff',
                            fontSize: '0.95rem',
                            fontWeight: 'bold',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background 0.2s, transform 0.2s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#0056b3'}
                          onMouseLeave={e => e.currentTarget.style.background = '#007bff'}
                          onClick={() => {
                            setRegisterWorkshop(workshop);
                            setShowRegisterModal(true);
                          }}
                        >
                          Register
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ padding: '24px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#007bff', marginBottom: '16px' }}>
                {selectedWorkshop.title}
              </h2>
              <p style={{ fontSize: '1rem', color: '#6c757d', marginBottom: '16px' }}>
                {selectedWorkshop.description}
              </p>
              <p style={{ fontSize: '1rem', color: '#4d6a7a', marginBottom: '16px' }}>
                Instructor: {selectedWorkshop.instructor}
              </p>
              <p style={{ fontSize: '1rem', color: '#4d6a7a', marginBottom: '16px' }}>
                Schedule: {selectedWorkshop.schedule}
              </p>
              <button
                onClick={() => setSelectedWorkshop(null)}
                style={{
                  marginTop: '24px',
                  padding: '8px 16px',
                  background: '#007bff',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                Back to Workshops
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Workshops;