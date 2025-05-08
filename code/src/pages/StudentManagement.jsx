import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '../components/ui/dialog';
import { EyeIcon } from '../components/ui/eyeicon';
import { FilterIcon } from '../components/ui/filtericon';
import { DownloadIcon } from '../components/ui/download';
import { mockStudents } from '../data/mock-data';
import '../styles/StudentManagement.css';


function StudentManagement() {
  const [students] = useState(mockStudents);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const internshipStatuses = [...new Set(students.map(s => s.internshipStatus)), 'all'];

  const filteredStudents = students.filter(student => {
    return statusFilter === 'all' || student.internshipStatus === statusFilter;
  });

  const handleViewProfile = (student) => {
    setSelectedStudent(student);
    setIsProfileModalOpen(true);
  };

  const handleDownloadCV = (student) => {
    if (!student?.cvUrl) {
      alert('No CV available for this student.');
      return;
    }
    window.open(student.cvUrl, '_blank');
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Placed':
      case 'Completed': return 'default';
      case 'Interviewing':
      case 'Applied': return 'outline';
      case 'Not Applied':
      case 'No Offer': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <Card className="student-management-container">
      <CardHeader>
        <CardTitle>Student Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="filter-row">
          <div className="filter-container">
            <FilterIcon className="filter-icon" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by internship status" />
              </SelectTrigger>
              <SelectContent>
                {internshipStatuses.map(status => (
                  <SelectItem key={status} value={status}>
                    {status === 'all' ? 'All Statuses' : status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
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
                      <Badge variant={getStatusBadgeVariant(student.internshipStatus)}>{student.internshipStatus}</Badge>
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
        <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
          <DialogContent className="small-modal">
            <DialogHeader>
              <DialogTitle>Student Profile</DialogTitle>
              <DialogDescription>Details for {selectedStudent?.name || 'Unknown'}.</DialogDescription>
            </DialogHeader>
            {selectedStudent && (
              <div className="details-grid">
                <div><span className="label">Name:</span> {selectedStudent.name || 'N/A'}</div>
                <div><span className="label">GUC ID:</span> {selectedStudent.gucId || 'N/A'}</div>
                <div><span className="label">Major:</span> {selectedStudent.major || 'N/A'}</div>
                <div><span className="label">Status:</span> <Badge variant={getStatusBadgeVariant(selectedStudent.internshipStatus)}>{selectedStudent.internshipStatus || 'N/A'}</Badge></div>
                <div><span className="label">Email:</span> {selectedStudent.email || 'N/A'}</div>
                {selectedStudent.cvUrl && (
                  <div><span className="label">CV:</span> <Button onClick={() => handleDownloadCV(selectedStudent)}>Download CV <DownloadIcon className="action-icon" /></Button></div>
                )}
              </div>
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default StudentManagement;