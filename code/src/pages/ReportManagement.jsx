import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { EyeIcon } from '../components/ui/eye';
import { CheckIcon } from '../components/ui/check';
import { XIcon } from '../components/ui/xicon';
import { FlagIcon } from '../components/ui/flag';
import { AlertTriangleIcon } from '../components/ui/alerttriangle';
import { mockReports } from '../data/mock-data'; // Import mock data
import ReportDetailsPopup from '../components/ui/ReportDetailsPopup';
import ScrollableComponent from '../components/ui/scroll'; // Import ScrollableComponent
import '../styles/ReportManagement.css';

function ReportManagement() {
  const [reports] = useState(mockReports); // Use mockReports as the data source
  const [majorFilter, setMajorFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);

  // Extract unique majors for filtering
  const majors = [...new Set(reports.map(r => r.major)), 'all'];

  // Define valid statuses explicitly
  const validStatuses = ['Pending', 'Flagged', 'Rejected', 'Accepted', 'all'];
  const statuses = validStatuses;

  // Filter reports based on selected filters
  const filteredReports = reports.filter(report => {
    const matchesMajor = majorFilter === 'all' || report.major === majorFilter;
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesMajor && matchesStatus;
  });

  // Handle viewing details of a report
  const handleViewDetails = (report) => {
    setSelectedReport(report); // Set the selected report
  };

  // Handle closing the popup
  const handleClosePopup = () => {
    setSelectedReport(null); // Clear the selected report to close the pop-up
  };

  // Get the badge variant based on the report status
  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Accepted': return 'default';
      case 'Rejected': return 'destructive';
      case 'Flagged': return 'secondary';
      case 'Pending': return 'outline';
      default: return 'outline';
    }
  };

  // Get the icon based on the report status
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
        <CardTitle>Reports</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="filters-container">
          <div className="filter-container-left">
            <Select value={majorFilter} onValueChange={setMajorFilter}>
              <SelectTrigger>
                <SelectValue>{majorFilter === 'all' ? 'Filter by Major' : majorFilter}</SelectValue>
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
          <div className="filter-container-right">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue>{statusFilter === 'all' ? 'Filter by Status' : statusFilter}</SelectValue>
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

        {/* Table */}
        <div className="report-management-container">
          <ScrollableComponent height="400px">
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
                {filteredReports.map((report) => (
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
                      <Button
                        className="icon-button"
                        onClick={() => handleViewDetails(report)}
                        aria-label="View Details Button"
                      >
                        <EyeIcon className="action-icon" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollableComponent>
        </div>

        {/* Popup */}
        {selectedReport && (
          <ReportDetailsPopup report={selectedReport} onClose={handleClosePopup} />
        )}
      </CardContent>
    </Card>
  );
}

export default ReportManagement;