import React from 'react';
import { Button } from './button';
import './ReportDetailsPopup.css'; // Import the CSS for styling

function ReportDetailsPopup({ report, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Report Details</h2>
        <ul>
          <li><strong>Title:</strong> {report.title}</li>
          <li><strong>Student Name:</strong> {report.student}</li>
          <li><strong>Student ID:</strong> {report.studentId}</li>
          <li><strong>Major:</strong> {report.major}</li>
          <li><strong>Company:</strong> {report.company}</li>
          <li><strong>Supervisor:</strong> {report.Supervisor}</li>
          <li><strong>Start Date:</strong> {report.StartDate}</li>
          <li><strong>End Date:</strong> {report.EndDate}</li>
          <li><strong>Submission Date:</strong> {report.submissionDate}</li>
          <li><strong>Status:</strong> {report.status}</li>
        </ul>
        <Button onClick={onClose} className="close-button">Close</Button>
      </div>
    </div>
  );
}

export default ReportDetailsPopup;