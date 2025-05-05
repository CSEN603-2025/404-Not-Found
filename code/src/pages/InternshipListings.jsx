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
import SearchIcon from '../components/icons/Search';
import FilterIcon from '../components/icons/Filter';
import DownloadIcon from '../components/icons/Download';
import BriefcaseIcon from '../components/icons/Briefcase';
import DollarSignIcon from '../components/icons/DollarSign';
import ClockIcon from '../components/icons/Clock';
import CheckCircleIcon from '../components/icons/CheckCircle';
import XCircleIcon from '../components/icons/XCircle';
import { mockInternships } from '../../mock-data';
import './InternshipListings.css';

function InternshipListings() {
  const [internships] = useState(mockInternships);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [durationFilter, setDurationFilter] = useState('all');
  const [paidFilter, setPaidFilter] = useState('all');
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const industries = [...new Set(mockInternships.map(int => int.industry)), 'all'];
  const durations = [...new Set(mockInternships.map(int => int.duration)), 'all'];

  const filteredInternships = internships.filter(int => {
    const matchesSearch = int.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) || int.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter === 'all' || int.industry === industryFilter;
    const matchesDuration = durationFilter === 'all' || int.duration === durationFilter;
    const matchesPaid = paidFilter === 'all' || (paidFilter === 'paid' && int.isPaid) || (paidFilter === 'unpaid' && !int.isPaid);
    return matchesSearch && matchesIndustry && matchesDuration && matchesPaid;
  });

  const handleViewDetails = (internship) => {
    setSelectedInternship(internship);
    setIsDetailsModalOpen(true);
  };

  const handleDownload = (internship) => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(internship, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `${internship.companyName}-${internship.jobTitle}-details.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Internships</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="filter-row">
          <div className="search-container">
            <SearchIcon className="search-icon" />
            <Input
              type="search"
              placeholder="Search by job title or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <div className="filter-item">
              <FilterIcon className="filter-icon" />
              <Select value={industryFilter} onChange={(e) => setIndustryFilter(e.target.value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Industry" />
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
            <div className="filter-item">
              <FilterIcon className="filter-icon" />
              <Select value={durationFilter} onChange={(e) => setDurationFilter(e.target.value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map(duration => (
                    <SelectItem key={duration} value={duration}>
                      {duration === 'all' ? 'All Durations' : duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="filter-item">
              <FilterIcon className="filter-icon" />
              <Select value={paidFilter} onChange={(e) => setPaidFilter(e.target.value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Job Title</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Industry</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInternships.length > 0 ? (
              filteredInternships.map((int) => (
                <TableRow key={int.id}>
                  <TableCell>{int.jobTitle}</TableCell>
                  <TableCell>{int.companyName}</TableCell>
                  <TableCell>{int.industry}</TableCell>
                  <TableCell>{int.duration}</TableCell>
                  <TableCell>
                    <Badge variant={int.isPaid ? 'default' : 'secondary'}>
                      {int.isPaid ? <CheckCircleIcon className="badge-icon" /> : <XCircleIcon className="badge-icon" />}
                      {int.isPaid ? 'Paid' : 'Unpaid'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="action-buttons">
                      <Button onClick={() => handleViewDetails(int)}>
                        <EyeIcon className="action-icon" /> View Details
                      </Button>
                      <Button onClick={() => handleDownload(int)}>
                        <DownloadIcon className="action-icon" /> Download
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6">No internships found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Dialog open={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedInternship?.jobTitle}</DialogTitle>
              <DialogDescription>
                Internship details for {selectedInternship?.jobTitle} at {selectedInternship?.companyName}.
              </DialogDescription>
            </DialogHeader>
            {selectedInternship && (
              <div className="details-grid">
                <div><span className="label">Company:</span> {selectedInternship.companyName} ({selectedInternship.industry})</div>
                <div><span className="label">Duration:</span> {selectedInternship.duration}</div>
                <div><span className="label">Payment:</span> <Badge variant={selectedInternship.isPaid ? 'default' : 'secondary'}>
                  {selectedInternship.isPaid ? <CheckCircleIcon className="badge-icon" /> : <XCircleIcon className="badge-icon" />}
                  {selectedInternship.isPaid ? `Paid${selectedInternship.salary ? ` (Expected: ${selectedInternship.salary} EGP)` : ''}` : 'Unpaid'}
                </Badge></div>
                <div><span className="label">Skills Required:</span> {selectedInternship.skillsRequired.join(', ')}</div>
                <div><span className="label">Location:</span> {selectedInternship.location}</div>
                <div><span className="label">Description:</span> <p>{selectedInternship.description}</p></div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => handleDownload(selectedInternship)}>
                <DownloadIcon className="action-icon" /> Download Details
              </Button>
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

export default InternshipListings;