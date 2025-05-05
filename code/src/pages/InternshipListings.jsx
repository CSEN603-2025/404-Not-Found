import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../components/ui/table';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { EyeIcon } from '../components/ui/eyeicon';
import { mockInternships } from '../data/mock-data';
import '../styles/InternshipListings.css';

function InternshipListings() {
  const [internships, setInternships] = useState(mockInternships);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInternships = internships.filter(internship => {
    const matchesSearch =
      !searchTerm ||
      (internship.title &&
        internship.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (internship.company &&
        internship.company.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const handleViewDetails = (internship) => {
    console.log(`Viewing internship: ${internship.title}`);
  };

  return (
    <div className="internship-listings-container">
      <h2>Internship Listings</h2>
      <div className="search-container">
        <Input
          type="search"
          placeholder="Search by title or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value || '')}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
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
              <TableRow key={internship.id}>
                <TableCell>{internship.title || 'N/A'}</TableCell>
                <TableCell>{internship.company || 'N/A'}</TableCell>
                <TableCell>{internship.location || 'N/A'}</TableCell>
                <TableCell>{internship.status || 'N/A'}</TableCell>
                <TableCell>{internship.postedDate || 'N/A'}</TableCell>
                <TableCell>
                  <Button onClick={() => handleViewDetails(internship)}>
                    <EyeIcon className="action-icon" /> View Details
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
  );
}

export default InternshipListings;