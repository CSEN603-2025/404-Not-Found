import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { EyeIcon } from '../components/ui/eye';
import { mockReports } from '../data/mock-data';
import '../styles/ReportFac.css';

function ReportManagement() {
  const [reports, setReports] = useState(mockReports);
  const [statusFilter, setStatusFilter] = useState('all');
  const [majorFilter, setMajorFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports = reports.filter((report) => {
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesMajor = majorFilter === 'all' || report.major === majorFilter;
    return matchesStatus && matchesMajor;
  });

  const handleViewDetails = (report) => setSelectedReport(report);

  const handleClosePopup = () => setSelectedReport(null);

  const handleDownloadReport = (report) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Report Details', 10, 10);
    doc.setFontSize(12);
    doc.text(`Name: ${report.student || 'N/A'}`, 10, 20);
    doc.text(`Title: ${report.title || 'N/A'}`, 10, 30);
    doc.text(`Submission Date: ${report.submissionDate || 'N/A'}`, 10, 40);
    doc.text(`Status: ${report.status || 'N/A'}`, 10, 50);
    doc.text(`Description: ${report.description || 'No description available'}`, 10, 60);
    doc.save(`${report.title || 'report'}.pdf`);
  };

  const handleSetStatus = (id, newStatus) => {
    setReports(reports.map(r =>
      r.id === id ? { ...r, status: newStatus } : r
    ));
  };

  return (
    <div className="student-management-container">
      {/* Controls */}
      <div className="controls-container">
        <Select
          value={majorFilter}
          onValueChange={setMajorFilter}
        >
          <SelectTrigger>
            <SelectValue>{majorFilter === 'all' ? 'Filter by Major' : majorFilter}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Majors</SelectItem>
            {[...new Set(reports.map(r => r.major).filter(Boolean))].map(major => (
              <SelectItem key={major} value={major}>{major}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger>
            <SelectValue>{statusFilter === 'all' ? 'Filter by Status' : statusFilter}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {['all', 'Pending', 'Flagged', 'Rejected', 'Accepted'].map((status) => (
              <SelectItem key={status} value={status}>
                {status === 'all' ? 'All Statuses' : status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Submission Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredReports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.student}</TableCell>
              <TableCell>{report.title}</TableCell>
              <TableCell>{report.submissionDate}</TableCell>
              <TableCell>
                <Badge variant="default">{report.status}</Badge>
              </TableCell>
              <TableCell>
                <div className="actions-container">
                  <Button
                    className="small-button"
                    style={{
                      backgroundColor: '#38d39f',
                      color: '#fff',
                      padding: '8px 12px',
                      fontSize: '14px',
                      margin: '4px',
                    }}
                    onClick={() => handleViewDetails(report)}
                  >
                    <EyeIcon className="action-icon" />
                  </Button>
                  <Button
                    className="small-button"
                    style={{
                      backgroundColor: '#ff9800',
                      color: '#fff',
                      padding: '8px 12px',
                      fontSize: '14px',
                      margin: '4px',
                    }}
                    onClick={() => handleSetStatus(report.id, 'Flagged')}
                  >
                    Flag
                  </Button>
                  <Button
                    className="small-button"
                    style={{
                      backgroundColor: '#e53935',
                      color: '#fff',
                      padding: '8px 12px',
                      fontSize: '14px',
                      margin: '4px',
                    }}
                    onClick={() => handleSetStatus(report.id, 'Rejected')}
                  >
                    Reject
                  </Button>
                  <Button
                    className="small-button"
                    style={{
                      backgroundColor: '#38d39f',
                      color: '#fff',
                      padding: '8px 12px',
                      fontSize: '14px',
                      margin: '4px',
                    }}
                    onClick={() => handleSetStatus(report.id, 'Accepted')}
                  >
                    Accept
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Popup */}
      {selectedReport && (
        <div className="pop-overlay">
          <div className="pop">
            <p><strong>Name:</strong> {selectedReport.student || 'N/A'}</p>
            <p><strong>StudentID:</strong> {selectedReport.studentId || 'N/A'}</p>
            <p><strong>Major:</strong> {selectedReport.major || 'N/A'}</p>
            <p><strong>Company:</strong> {selectedReport.company || 'N/A'}</p>
            <p><strong>Main Supervisor:</strong> {selectedReport.Supervisor || 'N/A'}</p>
            <p><strong>Start Date:</strong> {selectedReport.StartDate || 'N/A'}</p>
            <p><strong>End Date:</strong> {selectedReport.EndDate || 'N/A'}</p>
            <p><strong>Title:</strong> {selectedReport.title || 'N/A'}</p>
            <p><strong>Submission Date:</strong> {selectedReport.submissionDate || 'N/A'}</p>
            <p><strong>Status:</strong> {selectedReport.status || 'N/A'}</p>
            <p><strong>Description:</strong> {selectedReport.description || 'No description available'}</p>
            <div className="popup-actions">
              <button
                className="download-button"
                onClick={() => handleDownloadReport(selectedReport)}
              >
                Download as PDF
              </button>
              <button className="close-button" onClick={handleClosePopup}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportManagement;