import React from 'react';

const ReportDetailsPopup = ({ report, onClose }) => {
  if (!report) return null;

  return (
    <div className="pop-overlay">
      <div className="pop">
        <h2>{report.reportType} Details</h2>
        <p><strong>Student:</strong> {report.studentName} (ID: {report.studentId}, Major: {report.major})</p>
        <p><strong>Company:</strong> {report.companyName}</p>
        <p><strong>Internship:</strong> {report.internshipTitle}</p>
        <p><strong>Submitted:</strong> {report.submissionDate}</p>
        <p><strong>Status:</strong> {report.status}</p>
        {report.reportType === 'Evaluation Report' && (
          <>
            <p><strong>Supervisor:</strong> {report.supervisorName || 'N/A'}</p>
            <p><strong>Internship Dates:</strong> {report.internshipStartDate || 'N/A'} to {report.internshipEndDate || 'N/A'}</p>
          </>
        )}
        <p>
          <strong>Report File:</strong>{' '}
          <button onClick={() => window.open(report.reportUrl, '_blank')}>
            Download {report.reportType}
          </button>
        </p>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ReportDetailsPopup;