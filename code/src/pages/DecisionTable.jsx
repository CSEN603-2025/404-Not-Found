import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { mockStudents } from '../data/mock-data-comp';
import ScrollableComponent from '../components/ui/scroll'; // Import the ScrollableComponent
import '../styles/StudentManagement.css';

function DecisionTable() {
  const [students, setStudents] = useState(mockStudents); // State for managing student data

  const updateStudentStatus = (studentId, newStatus) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId ? { ...student, internshipStatus: newStatus } : student
      )
    );
    console.log(`Updated status for student ID ${studentId} to ${newStatus}`);
  };

  return (
    <div className="student-management-container">
      <h2>Manage Applicant Decisions</h2>
      {/* Wrap the table in ScrollableComponent */}
      <ScrollableComponent height="400px">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Current Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
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
                      onClick={() => updateStudentStatus(student.id, 'Accepted')}
                    >
                      Accepted
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
                      onClick={() => updateStudentStatus(student.id, 'Rejected')}
                    >
                      Rejected
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
                      onClick={() => updateStudentStatus(student.id, 'Finalized')}
                    >
                      Finalized
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

export default DecisionTable;