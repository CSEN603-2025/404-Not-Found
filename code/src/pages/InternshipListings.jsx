import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../components/ui/table';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { EyeIcon } from '../components/ui/eyeicon';
import { FilterIcon } from '../components/ui/filtericon'; // Import the FilterIcon component
import { mockInternships } from '../data/mock-data';
import '../styles/InternshipListings.css';

function InternshipListings() {
  const [internships, setInternships] = useState(mockInternships);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInternship, setSelectedInternship] = useState(null); // State for the selected internship
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to toggle the popup

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch =
      !searchTerm ||
      (internship.title &&
        internship.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (internship.company &&
        internship.company.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const handleViewDetails = (internship) => {
    setSelectedInternship(internship); // Set the selected internship
    setIsPopupOpen(true); // Open the popup
  };

  const handleClosePopup = () => {
    setSelectedInternship(null); // Clear the selected internship
    setIsPopupOpen(false); // Close the popup
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Duration</TableCell>
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
                  <TableCell>{internship.Duration || 'N/A'}</TableCell>
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

      {/* Popup for Internship Details */}
      {isPopupOpen && selectedInternship && (
        <div className="pop-overlay">
          <div className="pop">
            <h2>Internship Details</h2>
            <p><strong>Type:</strong> {selectedInternship.Type || 'N/A'}</p>
            <p><strong>Title:</strong> {selectedInternship.title || 'N/A'}</p>
            <p><strong>Company:</strong> {selectedInternship.company || 'N/A'}</p>
            <p><strong>Location:</strong> {selectedInternship.location || 'N/A'}</p>
            <p><strong>Status:</strong> {selectedInternship.status || 'N/A'}</p>
            <p><strong>ExpectedSalary:</strong> {selectedInternship.expectedSalary || 'N/A'}</p>
            <p><strong>Skills:</strong> {selectedInternship.Skills || 'N/A'}</p>
            <p><strong>Duration:</strong> {selectedInternship.Duration || 'N/A'}</p>
            <p><strong>Description:</strong> {selectedInternship.description || 'No description available'}</p>
            <button className="close-button" onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InternshipListings;