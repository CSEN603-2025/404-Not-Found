import React, { useState } from 'react';
import './Courses.css'; // Reuse the course card CSS for scale effect

// 2. Accept the callback prop and call it on successful registration
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

  // Simple handler for form fields
  const handleRegisterChange = (field, value) => {
    setRegisterForm(f => ({ ...f, [field]: value }));
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

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
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
                <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#007bff', marginBottom: 6 }}>
                  {workshop.title}
                </h3>
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
    </div>
  );
}

export default Workshops;