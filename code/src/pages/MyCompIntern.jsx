import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../components/ui/table';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { EyeIcon } from '../components/ui/eyeicon';
import { FilterIcon } from '../components/ui/filtericon'; // Import the FilterIcon component
import { mockInternships } from '../data/mock-data';
import '../styles/InternshipListings.css';

function InternshipListings() {
  const [internships, setInternships] = useState(
    mockInternships.map((internship) => ({
      ...internship,
      applications: Math.floor(Math.random() * 100), // Add random number of applications
    }))
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All'); // State for the selected filter

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch =
      !searchTerm ||
      (internship.title &&
        internship.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (internship.company &&
        internship.company.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter =
      selectedFilter === 'All' || internship.status === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const handleViewDetails = (internship) => {
    console.log(`Viewing internship: ${internship.title}`);
  };

  return (
    <div className="internship-listings-container">
      <div className="main-table-container">
        <div className="table-header">
          <h2>My Internship</h2>
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
          <div className="filter-container">
            <select
              className="filter-dropdown"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Posted Date</TableCell>
              <TableCell>Applications</TableCell> {/* New column for applications */}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInternships.length > 0 ? (
              filteredInternships.map((internship) => (
                <TableRow key={internship.id}>
                  <TableCell>{internship.title || 'N/A'}</TableCell>
                  <TableCell>{internship.location || 'N/A'}</TableCell>
                  <TableCell>{internship.status || 'N/A'}</TableCell>
                  <TableCell>{internship.postedDate || 'N/A'}</TableCell>
                  <TableCell>{internship.applications}</TableCell> {/* Display applications */}
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
                <TableCell colSpan="6">No internships found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default InternshipListings;