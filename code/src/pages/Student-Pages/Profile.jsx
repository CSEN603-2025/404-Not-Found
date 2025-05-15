import React, { useState, useEffect } from 'react';
import ExperienceCard from '../../components/ui/ExperienceCard'; // Adjust the path as needed
import ActivityCard from '../../components/ui/ActivityCard'; // Adjust the path as needed

function JobInterests() {
  return (
    <div style={{
      maxWidth: 1100,
      margin: "32px auto",
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 18px rgba(56,211,159,0.10)",
      padding: "36px 32px"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <span style={{ fontSize: 34, color: "#43a047", display: "flex", alignItems: "center" }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 2a5 5 0 0 0-5 5v1H7a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5v-6a5 5 0 0 0-5-5h-1V7a5 5 0 0 0-5-5Zm-3 6V7a3 3 0 0 1 6 0v1H9Zm-2 2h10a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3Z" fill="#43a047"/>
          </svg>
        </span>
        <h2 style={{ fontWeight: 700, fontSize: "2rem", margin: 0 }}>Job Interests</h2>
      </div>
      <div style={{ color: "#4d6a7a", marginBottom: 28, fontSize: "1.13rem" }}>
        Specify your preferred job roles and industries.
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "24px 32px"
      }}>
        <div>
          <label style={{ fontWeight: 500, display: "block", marginBottom: 8 }}>Preferred Job Roles</label>
          <input
            type="text"
            placeholder="e.g., Software Engineer, Data Analyst"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 8,
              border: "1.5px solid #e0e0e0",
              background: "#f6f7fa",
              fontSize: "1.08rem",
              color: "#6a6a6a"
            }}
          />
        </div>
        <div>
          <label style={{ fontWeight: 500, display: "block", marginBottom: 8 }}>Preferred Industries</label>
          <input
            type="text"
            placeholder="e.g., Technology, Finance"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 8,
              border: "1.5px solid #e0e0e0",
              background: "#f6f7fa",
              fontSize: "1.08rem",
              color: "#6a6a6a"
            }}
          />
        </div>
      </div>
    </div>
  );
}

function WorkExperience() {
  const [experiences, setExperiences] = useState([{ id: 1 }]); // Initialize with one experience

  const handleAddExperience = () => {
    setExperiences([...experiences, { id: experiences.length + 1 }]); // Add a new experience
  };

  const handleRemoveExperience = (id) => {
    setExperiences(experiences.filter((experience) => experience.id !== id)); // Remove the selected experience
  };

  return (
    <div style={{
      maxWidth: 1100,
      margin: "32px auto",
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 18px rgba(56,211,159,0.10)",
      padding: "36px 32px"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <span style={{ fontSize: 34, color: "#43a047", display: "flex", alignItems: "center" }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 2a5 5 0 0 0-5 5v1H7a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5v-6a5 5 0 0 0-5-5h-1V7a5 5 0 0 0-5-5Zm-3 6V7a3 3 0 0 1 6 0v1H9Zm-2 2h10a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3Z" fill="#43a047"/>
          </svg>
        </span>
        <h2 style={{ fontWeight: 700, fontSize: "2rem", margin: 0 }}>Work Experience</h2>
      </div>
      <div style={{ color: "#4d6a7a", marginBottom: 28, fontSize: "1.13rem" }}>
        Add details about your previous work experiences.
      </div>
      {experiences.map((experience, index) => (
        <div key={experience.id} style={{ marginBottom: "24px", position: "relative" }}>
          <h3 style={{ fontWeight: 600, fontSize: "1.25rem", marginBottom: "16px" }}>
            Experience #{index + 1}
          </h3>
          {index > 0 && ( // Show the "X" button only for experiences after the first one
            <button
              type="button"
              onClick={() => handleRemoveExperience(experience.id)}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                background: "transparent",
                border: "none",
                color: "#d32f2f",
                fontSize: "1.5rem",
                cursor: "pointer"
              }}
            >
              &times;
            </button>
          )}
          <ExperienceCard index={index} isRemovable={false} onRemove={() => {}} />
        </div>
      ))}
      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <button
          type="button"
          onClick={handleAddExperience}
          style={{
            padding: "12px 24px",
            background: "#43a047",
            color: "#fff",
            fontSize: "1.08rem",
            fontWeight: 600,
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(67, 160, 71, 0.2)"
          }}
        >
          Add Experience
        </button>
      </div>
    </div>
  );
}

function CollegeActivities() {
  const [activities, setActivities] = useState([{ id: 1 }]); // Initialize with one activity

  const handleAddActivity = () => {
    setActivities([...activities, { id: activities.length + 1 }]); // Add a new activity
  };

  const handleRemoveActivity = (id) => {
    setActivities(activities.filter((activity) => activity.id !== id)); // Remove the selected activity
  };

  return (
    <div style={{
      maxWidth: 1100,
      margin: "32px auto",
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 18px rgba(56,211,159,0.10)",
      padding: "36px 32px"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <span style={{ fontSize: 34, color: "#43a047", display: "flex", alignItems: "center" }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 2a5 5 0 0 0-5 5v1H7a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5v-6a5 5 0 0 0-5-5h-1V7a5 5 0 0 0-5-5Zm-3 6V7a3 3 0 0 1 6 0v1H9Zm-2 2h10a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3Z" fill="#43a047"/>
          </svg>
        </span>
        <h2 style={{ fontWeight: 700, fontSize: "2rem", margin: 0 }}>College Activities</h2>
      </div>
      <div style={{ color: "#4d6a7a", marginBottom: 28, fontSize: "1.13rem" }}>
        Add details about your college activities and achievements.
      </div>
      {activities.map((activity, index) => (
        <div key={activity.id} style={{ marginBottom: "24px", position: "relative" }}>
          <h3 style={{ fontWeight: 600, fontSize: "1.25rem", marginBottom: "16px" }}>
            Activity #{index + 1}
          </h3>
          {index > 0 && ( // Show the "X" button only for activities after the first one
            <button
              type="button"
              onClick={() => handleRemoveActivity(activity.id)}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                background: "transparent",
                border: "none",
                color: "#d32f2f",
                fontSize: "1.5rem",
                cursor: "pointer"
              }}
            >
              &times;
            </button>
          )}
          <ActivityCard index={index} isRemovable={false} onRemove={() => {}} />
        </div>
      ))}
      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <button
          type="button"
          onClick={handleAddActivity}
          style={{
            padding: "12px 24px",
            background: "#43a047",
            color: "#fff",
            fontSize: "1.08rem",
            fontWeight: 600,
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(67, 160, 71, 0.2)"
          }}
        >
          Add Activity
        </button>
      </div>
    </div>
  );
}

function Profile() {
  const [isEditing, setIsEditing] = useState(false); // Default to "My Information" view
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    major: '',
    semester: '',
  });

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    major: '',
    semester: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  // Load profile data from localStorage when the component mounts
  useEffect(() => {
    const savedProfileData = localStorage.getItem('profileData');
    if (savedProfileData) {
      const parsedData = JSON.parse(savedProfileData);
      setProfileData(parsedData);
      setFormData(parsedData); // Pre-fill the form with saved data
    }
  }, []);

  const handleSaveChanges = () => {
    // Validate all fields are filled
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.major ||
      !formData.semester
    ) {
      setErrorMessage('Please fill out all fields before saving.');
      return;
    }

    // Save changes to state and localStorage
    setProfileData(formData);
    localStorage.setItem('profileData', JSON.stringify(formData)); // Persist data
    setErrorMessage('');
    setIsEditing(false); // Switch back to "My Information" view
  };

  const handleEditProfile = () => {
    setIsEditing(true); // Switch to edit mode
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      {!isEditing ? (
        // "My Information" View
        <div style={{
          maxWidth: 1100,
          margin: "32px auto",
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 18px rgba(56,211,159,0.10)",
          padding: "36px 32px"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <h2 style={{ fontWeight: 700, fontSize: "2rem", margin: 0 }}>My Information</h2>
              <p style={{ color: "#4d6a7a", fontSize: "1.13rem" }}>
                Your saved profile details. Click "Edit Profile" to make changes.
              </p>
            </div>
            <button
              type="button"
              onClick={handleEditProfile}
              style={{
                padding: "8px 16px",
                background: "#43a047",
                color: "#fff",
                fontSize: "1rem",
                fontWeight: 600,
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill="#fff">
                <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm14.71-9.04c.39-.39.39-1.02 0-1.41l-2.54-2.54a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
              </svg>
              Edit Profile
            </button>
          </div>
          <div style={{ color: "#4d6a7a", fontSize: "1.13rem" }}>
            <p><strong>Full Name:</strong> {profileData.fullName}</p>
            <p><strong>Email:</strong> {profileData.email}</p>
            <p><strong>Phone:</strong> {profileData.phone}</p>
            <p><strong>Major:</strong> {profileData.major}</p>
            <p><strong>Semester:</strong> {profileData.semester}</p>
          </div>
        </div>
      ) : (
        // Edit Profile View
        <>
          <div style={{
            maxWidth: 1100,
            margin: "32px auto",
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 18px rgba(56,211,159,0.10)",
            padding: "36px 32px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <span style={{ fontSize: 34, color: "#43a047" }}>👤</span>
              <h2 style={{ fontWeight: 700, fontSize: "2rem", margin: 0 }}>Edit Profile</h2>
            </div>
            <div style={{ color: "#4d6a7a", marginBottom: 28, fontSize: "1.13rem" }}>
              Update your personal information below.
            </div>
            <form>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px 32px"
              }}>
                <div>
                  <label style={{ fontWeight: 500, display: "block", marginBottom: 8 }}>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="e.g., Jane Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "14px",
                      borderRadius: 8,
                      border: "1px solid #e0e0e0",
                      background: "#f6f7fa",
                      fontSize: "1.08rem"
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 500, display: "block", marginBottom: 8 }}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g., jane.doe@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "14px",
                      borderRadius: 8,
                      border: "1px solid #e0e0e0",
                      background: "#f6f7fa",
                      fontSize: "1.08rem"
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 500, display: "block", marginBottom: 8 }}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="e.g., +11234567890"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "14px",
                      borderRadius: 8,
                      border: "1px solid #e0e0e0",
                      background: "#f6f7fa",
                      fontSize: "1.08rem"
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 500, display: "block", marginBottom: 8 }}>Major</label>
                  <input
                    type="text"
                    name="major"
                    placeholder="e.g., Computer Science"
                    value={formData.major}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "14px",
                      borderRadius: 8,
                      border: "1px solid #e0e0e0",
                      background: "#f6f7fa",
                      fontSize: "1.08rem"
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 500, display: "block", marginBottom: 8 }}>Semester</label>
                  <input
                    type="text"
                    name="semester"
                    placeholder="e.g., Semester 5"
                    value={formData.semester}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "14px",
                      borderRadius: 8,
                      border: "1px solid #e0e0e0",
                      background: "#f6f7fa",
                      fontSize: "1.08rem"
                    }}
                  />
                </div>
              </div>
            </form>
            {errorMessage && (
              <p style={{ color: "#d32f2f", marginTop: 16, fontSize: "1rem" }}>{errorMessage}</p>
            )}
          </div>

          {/* Other Sections */}
          <JobInterests />
          <WorkExperience />
          <CollegeActivities />

          {/* Save Button */}
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button
              type="button"
              onClick={handleSaveChanges}
              style={{
                padding: "12px 24px",
                background: "#43a047",
                color: "#fff",
                fontSize: "1.08rem",
                fontWeight: 600,
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(67, 160, 71, 0.2)"
              }}
            >
              Save Changes
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
