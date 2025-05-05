import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import TableHeader from '../components/TableHeader';
import TableBody from '../components/TableBody';
import TableRow from '../components/TableRow';
import TableCell from '../components/TableCell';
import Select from '../components/Select';
import SelectContent from '../components/SelectContent';
import SelectItem from '../components/SelectItem';
import SelectTrigger from '../components/SelectTrigger';
import SelectValue from '../components/SelectValue';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Card from '../components/Card';
import CardHeader from '../components/CardHeader';
import CardTitle from '../components/CardTitle';
import CardContent from '../components/CardContent';
import Dialog from '../components/Dialog';
import DialogContent from '../components/DialogContent';
import DialogHeader from '../components/DialogHeader';
import DialogTitle from '../components/DialogTitle';
import DialogDescription from '../components/DialogDescription';
import DialogFooter from '../components/DialogFooter';
import DialogClose from '../components/DialogClose';
import EyeIcon from '../components/icons/Eye';
import FilterIcon from '../components/icons/Filter';
import DownloadIcon from '../components/icons/Download';
import FileTextIcon from '../components/icons/FileText';
import UserIcon from '../components/icons/User';
import BriefcaseIcon from '../components/icons/Briefcase';
import CalendarIcon from '../components/icons/Calendar';
import FlagIcon from '../components/icons/Flag';
import CheckIcon from '../components/icons/Check';
import XIcon from '../components/icons/X';
import AlertTriangleIcon from '../components/icons/AlertTriangle';
import { mockReports } from '../../mock-data';
import './ReportManagement.css';

function ReportManagement() {
  const [reports] = useState(mockReports);
  const [majorFilter, setMajorFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const majors = [...new Set(reports.map(r => r.major)), 'all'];
  const statuses = [...new Set(reports.map(r => r.status)), 'all'];

  const filteredReports = reports.filter(report => {
    const matchesMajor = majorFilter === 'all' || report.major === majorFilter;
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesMajor && matchesStatus;
  });

  const handleViewDetails = (report) => {
    setSelectedReport(report);
    setIsDetailsModalOpen(true);
  };

  const handleDownloadReport = (report) => {
    window.open(report.reportUrl, '_blank');
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Accepted': return 'default';
      case 'Rejected': return 'destructive';
      case 'Flagged': return 'secondary';
      case 'Pending': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Accepted': return <CheckIcon className="status-icon" />;
      case 'Rejected': return <XIcon className="status-icon" />;
      case 'Flagged': return <FlagIcon className="status-icon" />;
      case 'Pending': return <AlertTriangleIcon className="status-icon" />;
      default: return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submitted Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="filter-row">
          <div className="filter-item">
            <FilterIcon className="filter-icon" />
            <Select value={majorFilter} onChange={(e) => setMajorFilter(e.target.value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by major" />
              </SelectTrigger>
              <SelectContent>
                {majors.map(major => (
                  <SelectItem key={major} value={major}>
                    {major === 'all' ? 'All Majors' : major}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="filter-item">
            <FilterIcon className="filter-icon" />
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>
                    {status === 'all' ? 'All Statuses' : status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Report Type</TableCell>
              <TableCell>Major</TableCell>
              <TableCell>Submission Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.studentName}</TableCell>
                  <TableCell>{report.reportType}</TableCell>
                  <TableCell>{report.major}</TableCell>
                  <TableCell>{report.submissionDate}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(report.status)}>
                      {getStatusIcon(report.status)}
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleViewDetails(report)}>
                      <EyeIcon className="action-icon" /> View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6">No reports found matching the criteria.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Dialog open={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedReport?.reportType} Details</DialogTitle>
              <DialogDescription>
                Details for the {selectedReport?.reportType?.toLowerCase()} submitted by {selectedReport?.studentName}.
              </DialogDescription>
            </DialogHeader>
            {selectedReport && (
              <div className="details-grid">
                <div><span className="label">Student:</span> {selectedReport.studentName} (ID: {selectedReport.studentId}, Major: {selectedReport.major})</div>
                <div><span className="label">Company:</span> {selectedReport.companyName}</div>
                <div><span className="label">Internship:</span> {selectedReport.internshipTitle}</div>
                <div><span className="label">Submitted:</span> {selectedReport.submissionDate}</div>
                <div><span className="label">Status:</span> <Badge variant={getStatusBadgeVariant(selectedReport.status)}>{selectedReport.status}</Badge></div>
                {selectedReport.reportType === 'Evaluation Report' && (
                  <>
                    <div><span className="label">Supervisor:</span> {selectedReport.supervisorName || 'N/A'}</div>
                    <div><span className="label">Internship Dates:</span> {selectedReport.internshipStartDate || 'N/A'} to {selectedReport.internshipEndDate || 'N/A'}</div>
                  </>
                )}
                <div><span className="label">Report File:</span> <Button onClick={() => handleDownloadReport(selectedReport)}>Download {selectedReport.reportType}</Button></div>
              </div>
            )}
            <DialogFooter>
              <DialogClose>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default ReportManagement;