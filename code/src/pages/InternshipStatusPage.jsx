import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { mockStudents2 } from '../data/mock-data-comp'; // Import the new dataset
import ScrollableComponent from '../components/ui/scroll'; // Import the scrollable component
import '../styles/InternshipStatusPage.css'; // Import the CSS file for styling

function InternshipStatusPage() {
  const [students, setStudents] = useState(mockStudents2); // Use the new dataset
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [statusFilter, setStatusFilter] = useState('all'); // State for filtering by status

  const updateInternshipStatus = (studentId, newStatus) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId ? { ...student, internshipStatus: newStatus } : student
      )
    );
    console.log(`Updated internship status for student ID ${studentId} to ${newStatus}`);
  };

  // Select interns who have completed their internship
  const completedInterns = students.filter(
    (student) => student.internshipStatus === 'Internship Complete'
  );

  console.log('Interns who have completed their internship:', completedInterns);

  // Filter students based on search query and status filter
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || student.internshipStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="student-management-container">
      <h2>Manage Internship Status</h2>

      {/* Search and Filter Controls */}
      <div className="controls-container">
        <input
          type="text"
          placeholder="Search by name or job title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All</option>
          <option value="Current Intern">Current Intern</option>
          <option value="Internship Complete">Internship Complete</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <ScrollableComponent height="400px">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Current Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.jobTitle || 'N/A'}</TableCell>
                <TableCell>{student.internshipStatus}</TableCell>
                <TableCell>
                  <div className="actions-container">
                    <Button
                      className="small-button"
                      style={{
                        backgroundColor: '#38d39f',
                        color: '#fff',
                        padding: '8px 12px',
                        fontSize: '14px',
                        margin: '4px',
                      }}
                      onClick={() => updateInternshipStatus(student.id, 'Current Intern')}
                    >
                      Current Intern
                    </Button>
                    <Button
                      className="small-button"
                      style={{
                        backgroundColor: '#38d39f',
                        color: '#fff',
                        padding: '8px 12px',
                        fontSize: '14px',
                        margin: '4px',
                      }}
                      onClick={() => updateInternshipStatus(student.id, 'Internship Complete')}
                    >
                      Internship Complete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollableComponent>
    </div>
  );
}

export default InternshipStatusPage;