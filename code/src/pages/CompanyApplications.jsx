import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../components/ui/table';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { EyeIcon } from '../components/ui/eyeicon';
import { SearchIcon } from '../components/ui/searchicon';
import { FilterIcon } from '../components/ui/filtericon';
import { mockCompanies, mockApplications } from '../data/mock-data';
import '../styles/CompanyApplications.css';

function CompanyApplications() {
  const [applications, setApplications] = useState(mockApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null); // State for the selected application
  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false); // State for the popup

  const industries = [...new Set(mockCompanies.map(app => app.industry)), 'all'];

  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      !searchTerm ||
      (app.name &&
        app.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesIndustry = industryFilter === 'all' || app.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

  const handleViewDetails = (application) => {
    setSelectedApplication(application); // Set the selected application
    setIsDetailsPopupOpen(true); // Open the popup
  };

  const handleCloseDetailsPopup = () => {
    setSelectedApplication(null); // Clear the selected application
    setIsDetailsPopupOpen(false); // Close the popup
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Accepted': return 'default';
      case 'Rejected': return 'destructive';
      case 'Pending': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="filter-row">
          <div className="filter-icon-container">
            <FilterIcon className="filter-icon" />
          </div>
          <div className="search-container">
            <SearchIcon className="search-icon" />
            <Input
              type="search"
              placeholder="Search by company name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value || '')}
            />
          </div>
          <div className="filter-container">
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry === 'all' ? 'All Industries' : industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Industry</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Applied Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.length > 0 ? (
              filteredApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{app.name || 'N/A'}</TableCell>
                  <TableCell>{app.industry || 'N/A'}</TableCell>
                  <TableCell>
                    <span
                      className={`status-badge ${
                        app.status === 'Accepted'
                          ? 'status-accepted'
                          : app.status === 'Rejected'
                          ? 'status-rejected'
                          : 'status-pending'
                      }`}
                    >
                      {app.status || 'Unknown'}
                    </span>
                  </TableCell>
                  <TableCell>{app.appliedDate || 'N/A'}</TableCell>
                  <TableCell>
                    <div className="actions-container">
                      <Button
                        className="icon-button"
                        onClick={() => handleViewDetails(app)}
                      >
                        <EyeIcon className="action-icon" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="5">No applications found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Details Popup */}
        {isDetailsPopupOpen && selectedApplication && (
          <div className="pop-overlay">
            <div className="pop">
              <h2>Application Details</h2>
              <p><strong>Company Name:</strong> {selectedApplication.name || 'N/A'}</p>
              <p><strong>Industry:</strong> {selectedApplication.industry || 'N/A'}</p>
              <p><strong>Status:</strong> {selectedApplication.status || 'Unknown'}</p>
              <p><strong>Applied Date:</strong> {selectedApplication.appliedDate || 'N/A'}</p>
              <p><strong>Email:</strong> {selectedApplication.contactEmail || 'N/A'}</p>
              <p><strong>Website:</strong> <a href={selectedApplication.website || '#'} target="_blank" rel="noopener noreferrer">{selectedApplication.website || 'N/A'}</a></p>
              <p><strong>Description:</strong> {selectedApplication.description || 'No description available'}</p>
              <button className="close-button" onClick={handleCloseDetailsPopup}>Close</button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default CompanyApplications;