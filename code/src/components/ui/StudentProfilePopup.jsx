import React from 'react';

const StudentProfilePopup = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <div className="pop-overlay">
      <div className="pop">
        <h2>Student Profile</h2>
        <p><strong>Name:</strong> {student.name || 'N/A'}</p>
        <p><strong>GUC ID:</strong> {student.gucId || 'N/A'}</p>
        <p><strong>Major:</strong> {student.major || 'N/A'}</p>
        <p><strong>Status:</strong> {student.internshipStatus || 'N/A'}</p>
        <p><strong>Email:</strong> {student.email || 'N/A'}</p>
        {student.cvUrl && (
          <p>
            <strong>CV:</strong>{' '}
            <a href={student.cvUrl} target="_blank" rel="noopener noreferrer">
              Download CV
            </a>
          </p>
        )}
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default StudentProfilePopup;