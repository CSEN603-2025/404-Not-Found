import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../components/ui/table';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { EyeIcon } from '../components/ui/eyeicon';
import { FilterIcon } from '../components/ui/filtericon';
import { mockInternships } from '../data/mock-data-comp'; // Import the mock data
import '../styles/InternshipListings.css';

function InternshipListings() {
  const [internships, setInternships] = useState(mockInternships);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [industryFilter, setIndustryFilter] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [paidFilter, setPaidFilter] = useState('');
  const [paidChecked, setPaidChecked] = useState(false);
  const [unpaidChecked, setUnpaidChecked] = useState(false);

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch =
      !searchTerm ||
      (internship.title &&
        internship.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (internship.company &&
        internship.company.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesIndustry = !industryFilter || internship.industry === industryFilter;
    const matchesDuration = !durationFilter || internship.duration === durationFilter;
    const matchesPaid = !paidChecked || internship.paid === 'Paid';

    return matchesSearch && matchesIndustry && matchesDuration && matchesPaid;
  });

  const handleViewDetails = (internship) => {
    console.log(`Viewing internship: ${internship.title}`);
  };

  const handleSelect = (internship) => {
    setSelectedInternship(internship.id === selectedInternship?.id ? null : internship);
  };

  const handleConfirmSelection = () => {
    if (selectedInternship) {
      console.log('Selected internship:', selectedInternship);
      // Add your logic here to proceed with the selected internship
    }
  };

  return (
    <div className="internship-listings-container">
      <div className="main-table-container">
        <div className="table-header">
          <h2>Internship Listings</h2>
        </div>
        <div className="filter-search-row">
          <div className="filter-icon-container">
            <FilterIcon className="filter-icon" />
          </div>
          <div className="search-container">
            <Input
              type="search"
              placeholder="Search by title or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value || '')}
            />
          </div>
        </div>
        <div className="filter-controls" style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
          <select value={industryFilter} onChange={e => setIndustryFilter(e.target.value)}>
            <option value="">All Industries</option>
            {[...new Set(internships.map(i => i.industry))].map(ind => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
          <select value={durationFilter} onChange={e => setDurationFilter(e.target.value)}>
            <option value="">All Durations</option>
            {[...new Set(internships.map(i => i.duration))].map(dur => (
              <option key={dur} value={dur}>{dur}</option>
            ))}
          </select>
          <label className="checkbox-container" style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={paidChecked}
              onChange={() => setPaidChecked((prev) => !prev)}
            />
            <svg viewBox="0 0 64 64" height="2em" width="2em">
              <path
                d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                pathLength="575.0541381835938"
                className="checkbox-path"
              ></path>
            </svg>
            <span style={{ marginLeft: 8 }}>Paid Only</span>
          </label>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Select</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Posted Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInternships.length > 0 ? (
              filteredInternships.map((internship) => (
                <TableRow 
                  key={internship.id}
                  className={selectedInternship?.id === internship.id ? 'selected-row' : ''}
                >
                  <TableCell>
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={selectedInternship?.id === internship.id}
                        onChange={() => handleSelect(internship)}
                      />
                      <svg viewBox="0 0 64 64" height="2em" width="2em">
                        <path
                          d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                          pathLength="575.0541381835938"
                          className="checkbox-path"
                        ></path>
                      </svg>
                    </label>
                  </TableCell>
                  <TableCell>{internship.title || 'N/A'}</TableCell>
                  <TableCell>{internship.company || 'N/A'}</TableCell>
                  <TableCell>{internship.location || 'N/A'}</TableCell>
                  <TableCell>{internship.status || 'N/A'}</TableCell>
                  <TableCell>{internship.postedDate || 'N/A'}</TableCell>
                  <TableCell>
                    <Button
                      className="icon-button"
                      onClick={() => handleViewDetails(internship)}
                    >
                      <EyeIcon className="action-icon" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="7">No internships found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="selection-controls">
          <Button
            className={`confirm-button ${!selectedInternship ? 'disabled' : ''}`}
            onClick={handleConfirmSelection}
            disabled={!selectedInternship}
          >
            Confirm Selection
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InternshipListings;