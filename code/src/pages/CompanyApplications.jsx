import React, { useState } from 'react';
import { Table } from '../components/ui/table';
import { TableHeader } from '../components/ui/tableheader';
import { TableBody } from '../components/ui/tablebody';
import { TableRow } from '../components/ui/tablerow';
import { TableCell } from '../components/ui/tablecell';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '../components/ui/dialog';
import { EyeIcon } from '../components/icons/eyeicon';
import { CheckIcon } from '../components/ui/checkicon';
import { XIcon } from '../components/ui/xicon';
import { SearchIcon } from '../components/icons/searchicon';
import { FilterIcon } from '../components/icons/filtericon';
import { mockCompanyApplications } from '../../mock-data';
import './CompanyApplications.css';

function CompanyApplications() {
  const [applications, setApplications] = useState(mockCompanyApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState(null);

  const industries = [...new Set(mockCompanyApplications.map(app => app.industry)), 'all'];

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter === 'all' || app.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setIsDetailsModalOpen(true);
  };

  const handleConfirmAction = (action, application) => {
    setSelectedApplication(application);
    setActionToConfirm(action);
    setIsConfirmModalOpen(true);
  };

  const performAction = () => {
    if (!selectedApplication || !actionToConfirm) return;

    const newStatus = actionToConfirm === 'accept' ? 'Accepted' : 'Rejected';
    setApplications(prev =>
      prev.map(app => app.id === selectedApplication.id ? { ...app, status: newStatus } : app)
    );
    alert(`Application ${newStatus} for ${selectedApplication.name}`);
    setIsConfirmModalOpen(false);
    setSelectedApplication(null);
    setActionToConfirm(null);
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
          <div className="search-container">
            <SearchIcon className="search-icon" />
            <Input
              type="search"
              placeholder="Search by company name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-container">
            <FilterIcon className="filter-icon" />
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map(industry => (
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
                  <TableCell>{app.name}</TableCell>
                  <TableCell>{app.industry}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(app.status)}>{app.status}</Badge>
                  </TableCell>
                  <TableCell>{app.appliedDate}</TableCell>
                  <TableCell>
                    <div className="action-buttons">
                      <Button onClick={() => handleViewDetails(app)}>
                        <EyeIcon className="action-icon" /> View Details
                      </Button>
                      {app.status === 'Pending' && (
                        <>
                          <Button onClick={() => handleConfirmAction('accept', app)} className="accept-button">
                            <CheckIcon className="action-icon" /> Accept
                          </Button>
                          <Button onClick={() => handleConfirmAction('reject', app)} className="reject-button">
                            <XIcon className="action-icon" /> Reject
                          </Button>
                        </>
                      )}
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
        <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Application Details</DialogTitle>
              <DialogDescription>Detailed information about the company application.</DialogDescription>
            </DialogHeader>
            {selectedApplication && (
              <div className="details-grid">
                <div><span className="label">Name:</span> {selectedApplication.name}</div>
                <div><span className="label">Industry:</span> {selectedApplication.industry}</div>
                <div><span className="label">Status:</span> <Badge variant={getStatusBadgeVariant(selectedApplication.status)}>{selectedApplication.status}</Badge></div>
                <div><span className="label">Applied:</span> {selectedApplication.appliedDate}</div>
                <div><span className="label">Email:</span> {selectedApplication.contactEmail}</div>
                <div><span className="label">Website:</span> <a href={selectedApplication.website} target="_blank" rel="noopener noreferrer">{selectedApplication.website}</a></div>
                <div><span className="label">Description:</span> <p>{selectedApplication.description}</p></div>
              </div>
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Action</DialogTitle>
              <DialogDescription>
                Are you sure you want to {actionToConfirm} the application for "{selectedApplication?.name}"?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Cancel</Button>
              </DialogClose>
              <Button onClick={performAction} className={actionToConfirm === 'reject' ? 'reject-button' : 'accept-button'}>
                Confirm {actionToConfirm?.charAt(0).toUpperCase() + actionToConfirm?.slice(1)}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default CompanyApplications;