import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { EyeIcon } from '../components/ui/eyeicon';
import { CalendarClockIcon } from '../components/ui/calendarclock'; // Import the calendar icon
import {  XIcon } from '../components/ui/x'; // Import icons
import { CheckIcon } from '../components/ui/checkicon'; // Import check icon
import { mockStudents, mockAppointmentRequests } from '../data/mock-data'; // Import the mock appointment requests
import ScrollableComponent from '../components/ui/scroll';
import StudentProfilePopup from '../components/ui/StudentProfilePopup'; // Import the new component
import { FilterIcon } from '../components/ui/filtericon';
import '../styles/StudentManagement.css';

function getStatusBadgeVariant(status) {
  switch (status) {
    case 'Completed':
      return 'status-completed';
    case 'No Offer':
      return 'status-no-offer';
    default:
      return 'status-other';
  }
}

function StudentManagement() {
  const [students, setStudents] = useState(mockStudents); // Updated to allow modification of students
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudentForProfile, setSelectedStudentForProfile] = useState(null); // Separate state for "View Profile"
  const [selectedStudentForAppointment, setSelectedStudentForAppointment] = useState(null); // Separate state for "Request Appointment"
  const [appointmentPopup, setAppointmentPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointmentRequests, setAppointmentRequests] = useState(mockAppointmentRequests); // Initialize with dummy data

  const internshipStatuses = [...new Set(students.map((s) => s.internshipStatus)), 'all'];

  const filteredStudents = students.filter((student) => {
    return statusFilter === 'all' || student.internshipStatus === statusFilter;
  });

  const handleViewProfile = (student) => {
    console.log('View Profile clicked for:', student); // Debugging
    setSelectedStudentForProfile(student); // Set the selected student for the profile popup
  };

  const handleCloseProfilePopup = () => {
    console.log('Closing Profile Popup'); // Debugging
    setSelectedStudentForProfile(null); // Clear the selected student for the profile popup
  };

  const handleRequestAppointment = (student) => {
    console.log('Request Appointment clicked for:', student); // Debugging
    setSelectedStudentForAppointment(student); // Set the selected student for the appointment popup
    setAppointmentPopup(true); // Show the appointment popup
  };

  const handleCloseAppointmentPopup = () => {
    console.log('Closing Appointment Popup'); // Debugging
    setAppointmentPopup(false); // Close the appointment popup
    setSelectedStudentForAppointment(null); // Clear the selected student for the appointment popup
    setSelectedDate(null); // Clear the selected date
  };

  const handleDateSelection = (date) => {
    console.log('Date selected:', date); // Debugging
    setSelectedDate(date); // Set the selected date
    alert(`Appointment requested for ${selectedStudentForAppointment.name} on ${date}`); // Confirm the appointment

    // Update the student's appointment status
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === selectedStudentForAppointment.id
          ? { ...student, appointmentDate: date } // Add the appointment date to the student
          : student
      )
    );

    handleCloseAppointmentPopup(); // Close the popup and clear the state
  };

  const handleAcceptAppointment = (student) => {
    console.log(`Accepted appointment for ${student.name}`);
    setAppointmentRequests((prev) => prev.filter((s) => s.id !== student.id)); // Remove the student from the requests list
  };

  const handleRejectAppointment = (student) => {
    console.log(`Rejected appointment for ${student.name}`);
    setAppointmentRequests((prev) => prev.filter((s) => s.id !== student.id)); // Remove the student from the requests list
  };

  // Generate random dates for the appointment selection
  const randomDates = [
    '2025-07-20',
    '2025-07-21',
    '2025-07-22',
    '2025-07-23',
    '2025-07-24',
  ];

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

          {/* Main Table Container */}
          <div className="table-container">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Internship Type</TableCell>
                  <TableCell>Internship Status</TableCell>
                  <TableCell>Appointments</TableCell> {/* New column for appointments */}
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
                        <span className={`status-badge ${getStatusBadgeVariant(student.internshipStatus)}`}>
                          {student.internshipStatus || 'Unknown'}
                        </span>
                      </TableCell>
                      <TableCell>
                        {student.appointmentDate ? (
                          <span className="appointment-status">
                            {student.appointmentDate}
                          </span>
                        ) : (
                          <span className="no-appointment-status">No request made</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="actions-container">
                          <Button
                            className="icon-button"
                            onClick={() => handleViewProfile(student)}
                          >
                            <EyeIcon className="action-icon" />
                          </Button>
                          <Button
                            className="icon-button"
                            onClick={() => handleRequestAppointment(student)}
                          >
                            <CalendarClockIcon className="action-icon" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="5">No students found matching the criteria.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Student Profile Popup */}
      {selectedStudentForProfile && (
        <StudentProfilePopup
          student={selectedStudentForProfile}
          onClose={handleCloseProfilePopup}
        />
      )}

      {/* Appointment Popup */}
      {appointmentPopup && (
        <div className="pop-overlay">
          <div className="pop">
            <h2>Request an Appointment</h2>
            <p>Select a date for your appointment with {selectedStudentForAppointment.name}:</p>
            <ul>
              {randomDates.map((date) => (
                <li key={date}>
                  <button
                    className="date-button"
                    onClick={() => handleDateSelection(date)}
                  >
                    {date}
                  </button>
                </li>
              ))}
            </ul>
            <button className="close-button" onClick={handleCloseAppointmentPopup}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Independent Appointment Requests Table */}
      <div className="appointment-requests-container">
        <h2>Appointment Requests</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Internship Type</TableCell>
              <TableCell>Requested Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointmentRequests.length > 0 ? (
              appointmentRequests.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.internshipType}</TableCell>
                  <TableCell>{student.date}</TableCell>
                  <TableCell>
                    <div className="actions-container">
                      <Button
                        className="small-button accept-button"
                        onClick={() => handleAcceptAppointment(student)}
                      >
                        <CheckIcon className="action-icon" />
                      </Button>
                      <Button
                        className="small-button reject-button"
                        onClick={() => handleRejectAppointment(student)}
                      >
                        <XIcon className="action-icon" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="4">No appointment requests.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </ScrollableComponent>
  );
}

export default StudentManagement;