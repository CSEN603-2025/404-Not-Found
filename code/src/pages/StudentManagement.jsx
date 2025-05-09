import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { EyeIcon } from '../components/ui/eyeicon';
import { FilterIcon } from '../components/ui/filtericon';
import { DownloadIcon } from '../components/ui/download';
import { mockStudents } from '../data/mock-data';
import ScrollableComponent from '../components/ui/scroll';
import StudentProfilePopup from '../components/ui/StudentProfilePopup'; // Import the new component
import '../styles/StudentManagement.css';

function getStatusBadgeVariant(status) {
  switch (status) {
    case 'Completed':
      return 'success';
    case 'In Progress':
      return 'warning';
    case 'Not Started':
      return 'default';
    default:
      return 'neutral';
  }
}

function StudentManagement() {
  const [students] = useState(mockStudents);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const internshipStatuses = [...new Set(students.map((s) => s.internshipStatus)), 'all'];

  const filteredStudents = students.filter((student) => {
    return statusFilter === 'all' || student.internshipStatus === statusFilter;
  });

  const handleViewProfile = (student) => {
    setSelectedStudent(student); // Set the selected student
  };

  const handleClosePopup = () => {
    setSelectedStudent(null); // Clear the selected student to close the pop-up
  };

  return (
    <ScrollableComponent height="600px">
      <Card className="student-management-container">
        <CardHeader>
          <CardTitle>Student Management</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filter Row */}
          <div className="filter-row">
            <FilterIcon className="filter-icon" />
            <div className="filter-container">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by internship status" />
                </SelectTrigger>
                <SelectContent>
                  {internshipStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === 'all' ? 'All Statuses' : status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table Container */}
          <div className="table-container">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Major</TableCell>
                  <TableCell>Internship Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.major}</TableCell>
                      <TableCell>
                        <span
                          className={`status-badge ${
                            student.internshipStatus === 'Completed'
                              ? 'status-completed'
                              : student.internshipStatus === 'No Offer'
                              ? 'status-no-offer'
                              : 'status-other'
                          }`}
                        >
                          {student.internshipStatus}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button className="icon-button" onClick={() => handleViewProfile(student)}>
                          <EyeIcon className="action-icon" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="4">No students found matching the criteria.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Student Profile Popup */}
          {selectedStudent && (
            <StudentProfilePopup student={selectedStudent} onClose={handleClosePopup} />
          )}
        </CardContent>
      </Card>
    </ScrollableComponent>
  );
}

export default StudentManagement;