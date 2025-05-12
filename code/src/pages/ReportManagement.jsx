import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { EyeIcon } from '../components/ui/eye';
import { mockReports, mockEvaluationReports } from '../data/mock-data';
import '../styles/ReportManagement.css';

function ReportManagement() {
  const [reports] = useState(mockReports);
  const [evaluationReports] = useState(mockEvaluationReports); // New state for evaluation reports
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports = reports.filter((report) => {
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesStatus;
  });

  const handleViewDetails = (report) => {
    console.log('Selected Report:', report); // Debugging log
    setSelectedReport(report); // Set the selected report for the popup
  };

  const handleClosePopup = () => {
    setSelectedReport(null); // Clear the selected report and close the popup
  };

  const handleDownloadReport = (report) => {
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(16);
    doc.text('Report Details', 10, 10);
    doc.setFontSize(12);
    doc.text(`Name: ${report.student || 'N/A'}`, 10, 20);
    doc.text(`Title: ${report.title || 'N/A'}`, 10, 30);
    doc.text(`Submission Date: ${report.submissionDate || 'N/A'}`, 10, 40);
    doc.text(`Status: ${report.status || 'N/A'}`, 10, 50);
    doc.text(`Description: ${report.description || 'No description available'}`, 10, 60);

    // Save the PDF
    doc.save(`${report.title || 'report'}.pdf`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="filters-container">
          <div className="filter-container-right">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue>{statusFilter === 'all' ? 'Filter by Status' : statusFilter}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {['all', 'Submitted', 'Reviewed', 'Pending'].map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === 'all' ? 'All Statuses' : status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="report-management-container">
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
                    <Button
                      className="icon-button"
                      onClick={() => handleViewDetails(report)}
                    >
                      <EyeIcon className="action-icon" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Evaluation Reports Table */}
        <div className="evaluation-reports-container">
          <h3 className="evaluation-reports-header">Evaluation Reports</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Supervisor</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {evaluationReports.length > 0 ? (
                evaluationReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.student || 'N/A'}</TableCell>
                    <TableCell>{report.company || 'N/A'}</TableCell>
                    <TableCell>{report.Supervisor || 'N/A'}</TableCell>
                    <TableCell>
                      <Button
                        className="icon-button"
                        onClick={() => handleViewDetails(report)}
                      >
                        <EyeIcon className="action-icon" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="4">No evaluation reports found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Popup for Report Details */}
        {selectedReport && (
          <div className="pop-overlay">
            <div className="pop">
              <h2>Report Details</h2>
              <p><strong>Name:</strong> {selectedReport.student || 'N/A'}</p>
              <p><strong>StudentID:</strong> {selectedReport.studentId || 'N/A'}</p>
               <p><strong>Major:</strong> {selectedReport.major || 'N/A'}</p>
              <p><strong>Title:</strong> {selectedReport.title || 'N/A'}</p>
              <p><strong>Submission Date:</strong> {selectedReport.submissionDate || 'N/A'}</p>
              <p><strong>Status:</strong> {selectedReport.status || 'N/A'}</p>
              
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
      </CardContent>
    </Card>
  );
}

export default ReportManagement;