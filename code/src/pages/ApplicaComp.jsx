import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { EyeIcon } from '../components/ui/eyeicon';
import StudentProfilePopup from '../components/ui/StudentProfilePopup'; // Import the profile popup component
import ScrollableComponent from '../components/ui/scroll'; // Import the scrollable component
import { mockStudents } from '../data/mock-data-comp';
import '../styles/StudentManagement.css';

function ApplicaComp() {
  const [selectedStudentForProfile, setSelectedStudentForProfile] = useState(null);
  const [students, setStudents] = useState(mockStudents); // State for managing student data
  const [selectedMajor, setSelectedMajor] = useState('all'); // State for filtering by major

  const handleViewProfile = (student) => {
    console.log('View Profile clicked for:', student); // Debugging
    setSelectedStudentForProfile(student); // Set the selected student for the profile popup
  };

  const handleCloseProfilePopup = () => {
    console.log('Closing Profile Popup'); // Debugging
    setSelectedStudentForProfile(null); // Clear the selected student for the profile popup
  };

  // Get unique majors for the dropdown
  const majors = ['all', ...new Set(mockStudents.map((student) => student.major))];

  // Filter students based on the selected major
  const filteredStudents =
    selectedMajor === 'all'
      ? students
      : students.filter((student) => student.major === selectedMajor);

  return (
    <ScrollableComponent height="600px">
      <div className="student-management-container">
        <h2>Student Management</h2>

        {/* Filter by Major */}
        <div className="filter-container">
          <label htmlFor="major-filter"></label>
          <select
            id="major-filter"
            value={selectedMajor}
            onChange={(e) => setSelectedMajor(e.target.value)}
          >
            {majors.map((major) => (
              <option key={major} value={major}>
                {major}
              </option>
            ))}
          </select>
        </div>

        {/* Main Table */}
        <div className="scrollable-table-container">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Internship Type</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.major}</TableCell>
                  <TableCell>
                    <div className="actions-container">
                      <Button
                        className="icon-button"
                        onClick={() => handleViewProfile(student)}
                      >
                        <EyeIcon className="action-icon" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Student Profile Popup */}
        {selectedStudentForProfile && (
          <StudentProfilePopup
            student={selectedStudentForProfile}
            onClose={handleCloseProfilePopup}
          />
        )}
      </div>
    </ScrollableComponent>
  );
}

export default ApplicaComp;