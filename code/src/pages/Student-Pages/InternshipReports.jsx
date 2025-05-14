import React from 'react';

function InternshipReports({ internshipReports, handleAddReport, handleEditReport, handleDeleteReport, handleSaveReport, editingReport }) {
  return (
    <div className="reports-list-container">
      <h3>Internship Reports</h3>
      <button className="add-report-button" onClick={handleAddReport}>Add New Report</button>
      <ul className="reports-list">
        {internshipReports.map((report) => (
          <li key={report.id} className="report-item">
            {editingReport === report.id ? (
              <div className="report-edit-form">
                <input type="text" placeholder="Title" defaultValue={report.title} />
                <button onClick={() => handleSaveReport(report.id, report)}>Save</button>
              </div>
            ) : (
              <div className="report-display">
                <h4>{report.title}</h4>
                <button onClick={() => handleEditReport(report.id)}>Edit</button>
                <button onClick={() => handleDeleteReport(report.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InternshipReports;