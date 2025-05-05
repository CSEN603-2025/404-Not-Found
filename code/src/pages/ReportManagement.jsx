import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '../components/ui/dialog';
import { EyeIcon } from '../components/ui/eye';
import { FilterIcon } from '../components/ui/filter';
import { DownloadIcon } from '../components/ui/download';
import { FileTextIcon } from '../components/ui/filetext';
import { UserIcon } from '../components/ui/user';
import { BriefcaseIcon } from '../components/ui/briefcaseicon';
import { Calendar } from '../components/ui/calendar';
import { FlagIcon } from '../components/ui/flag';
import { CheckIcon } from '../components/ui/check';
import { XIcon } from '../components/ui/x';
import { AlertTriangleIcon } from '../components/ui/alerttriangle';
import { mockReports } from '../data/mock-data';
import '../styles/ReportManagement.css';

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
            <Select value={majorFilter} onValueChange={setMajorFilter}>
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
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
        <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
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
              <DialogClose asChild>
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