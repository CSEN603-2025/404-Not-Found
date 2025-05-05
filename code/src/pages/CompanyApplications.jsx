import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import TableHeader from '../components/TableHeader';
import TableBody from '../components/TableBody';
import TableRow from '../components/TableRow';
import TableCell from '../components/TableCell';
import Input from '../components/Input';
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
import CheckIcon from '../components/icons/Check';
import XIcon from '../components/icons/X';
import SearchIcon from '../components/icons/Search';
import FilterIcon from '../components/icons/Filter';
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
            <Select value={industryFilter} onChange={(e) => setIndustryFilter(e.target.value)}>
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
        <Dialog open={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)}>
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
              <DialogClose>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Action</DialogTitle>
              <DialogDescription>
                Are you sure you want to {actionToConfirm} the application for "{selectedApplication?.name}"?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>
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