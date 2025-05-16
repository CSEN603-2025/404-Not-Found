import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { CheckIcon } from '../components/ui/checkicon';
import { XIcon } from '../components/ui/xicon';
import { Button } from '../components/ui/button';
import PhoneIcon from '../components/ui/phoneicon';
import MuteIcon from '../components/ui/muteicon';
import CameraIcon from '../components/ui/cameraicon';

// More dummy data for requests
const mockAppointmentRequests = [
  { id: 1, name: "Ali Hassan", major: "Computer Science", date: "2024-06-01" },
  { id: 2, name: "Sara Ahmed", major: "Electrical Engineering", date: "2024-06-03" },
  { id: 3, name: "Mohamed Salah", major: "Mechanical Engineering", date: "2024-06-05" },
  { id: 4, name: "Fatima Noor", major: "Business Administration", date: "2024-06-07" },
  { id: 5, name: "Yousef Tarek", major: "Civil Engineering", date: "2024-06-09" },
];

// Dummy data for confirmed appointments
const mockAppointments = [
  { id: 101, name: "Laila Mostafa", major: "Architecture", date: "2024-05-28", status: "Confirmed" },
  { id: 102, name: "Omar Khaled", major: "Software Engineering", date: "2024-05-30", status: "Confirmed" },
];

export default function Appointments() {
  const [appointmentRequests, setAppointmentRequests] = useState(mockAppointmentRequests);
  const [appointments, setAppointments] = useState(mockAppointments);
  const [callPopup, setCallPopup] = useState(false);
  const [selectedAppointmentForCall, setSelectedAppointmentForCall] = useState(null);
  const [callMuted, setCallMuted] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [screenShared, setScreenShared] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null);

  const handleAcceptAppointment = (student) => {
    setAppointments(prev => [
      ...prev,
      { ...student, status: "Confirmed" }
    ]);
    setAppointmentRequests(prev => prev.filter((s) => s.id !== student.id));
  };

  const handleRejectAppointment = (student) => {
    alert(`Appointment rejected for ${student.name}`);
    setAppointmentRequests((prev) => prev.filter((s) => s.id !== student.id));
  };

  const handleCallAppointment = (appt) => {
    setSelectedAppointmentForCall(appt);
    setCallPopup(true);
  };

  const handleCloseCallPopup = () => {
    setCallPopup(false);
    setSelectedAppointmentForCall(null);
    setCallMuted(false);
    setVideoEnabled(false);
    setScreenShared(false);
  };

  const handleAcceptCall = () => {
    setCallPopup(true);
    setIncomingCall(null);
  };

  const handleRejectCall = () => {
    setIncomingCall(null);
  };

  // Table row/cell style for compact height
  const rowStyle = { height: 28 };
  const cellStyle = { padding: "4px 8px", fontSize: "0.95rem" };

  return (
    <div style={{ maxWidth: 1000, margin: "32px auto" }}>
      {/* Appointment Requests Table */}
      <Card className="appointment-requests-container" style={{ marginBottom: 32 }}>
        <CardHeader>
          <CardTitle>Appointment Requests</CardTitle>
        </CardHeader>
        <CardContent style={{ padding: 0 }}>
          <div
            style={{
              width: "100%",
              overflowX: "auto",
              minHeight: 30,
              maxHeight: 260,
              resize: "vertical",
              transition: "min-height 0.2s",
            }}
          >
            <Table style={{ width: "100%", minWidth: 600, tableLayout: "auto" }}>
              <TableHeader>
                <TableRow style={rowStyle}>
                  <TableCell style={cellStyle}>Name</TableCell>
                  <TableCell style={cellStyle}>Major</TableCell>
                  <TableCell style={cellStyle}>Requested Date</TableCell>
                  <TableCell style={cellStyle}>Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointmentRequests.length > 0 ? (
                  appointmentRequests.map((student) => (
                    <TableRow key={student.id} style={rowStyle}>
                      <TableCell style={cellStyle}>{student.name}</TableCell>
                      <TableCell style={cellStyle}>{student.major}</TableCell>
                      <TableCell style={cellStyle}>{student.date}</TableCell>
                      <TableCell style={cellStyle}>
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
                  <TableRow style={rowStyle}>
                    <TableCell colSpan="4" style={{ ...cellStyle, textAlign: "center" }}>
                      No appointment requests.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Confirmed Appointments Table */}
      <Card className="appointments-table-container">
        <CardHeader>
          <CardTitle>Appointments</CardTitle>
        </CardHeader>
        <CardContent style={{ padding: 0 }}>
          <div
            style={{
              width: "100%",
              overflowX: "auto",
              minHeight: 60,
              maxHeight: 260,
              resize: "vertical",
              transition: "min-height 0.2s",
            }}
          >
            <Table style={{ width: "100%", minWidth: 600, tableLayout: "auto" }}>
              <TableHeader>
                <TableRow style={rowStyle}>
                  <TableCell style={cellStyle}>Name</TableCell>
                  <TableCell style={cellStyle}>Major</TableCell>
                  <TableCell style={cellStyle}>Date</TableCell>
                  <TableCell style={cellStyle}>Status</TableCell>
                  <TableCell style={cellStyle}>Call</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.length > 0 ? (
                  appointments.map((appt) => (
                    <TableRow key={appt.id} style={rowStyle}>
                      <TableCell style={cellStyle}>{appt.name}</TableCell>
                      <TableCell style={cellStyle}>{appt.major}</TableCell>
                      <TableCell style={cellStyle}>{appt.date}</TableCell>
                      <TableCell style={cellStyle}>
                        <span
                          style={{
                            color: "#43a047",
                            fontWeight: 600,
                            background: "#e8f5e9",
                            padding: "2px 8px",
                            borderRadius: 8,
                            fontSize: "0.95rem",
                          }}
                        >
                          {appt.status}
                        </span>
                      </TableCell>
                      <TableCell style={cellStyle}>
                        <Button
                          className="icon-button"
                          onClick={() => handleCallAppointment(appt)}
                        >
                          <PhoneIcon className="action-icon" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow style={rowStyle}>
                    <TableCell colSpan="5" style={{ ...cellStyle, textAlign: "center" }}>
                      No appointments.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Call Popup */}
      {callPopup && selectedAppointmentForCall && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.18)",
            zIndex: 2100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 4px 32px rgba(67,160,71,0.10)",
              padding: "36px 40px 28px 40px",
              minWidth: 420,
              maxWidth: 540,
              width: "90vw",
              textAlign: "center",
              border: "2px solid #43a047",
              position: "relative"
            }}
          >
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#43a047", marginBottom: 18 }}>
              In Call with {selectedAppointmentForCall.name}
            </div>
            <div
              style={{
                background: "#f0f0f0",
                height: 180,
                margin: "1rem 0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
                border: "1px solid #ddd",
                fontSize: "1.2rem",
                color: "#555"
              }}
            >
              {videoEnabled ? (
                <span>Video Stream (enabled)</span>
              ) : (
                <span>Video Disabled</span>
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 18, marginBottom: 18 }}>
              <button
                style={{
                  background: callMuted ? "#ffc107" : "#43a047",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  padding: "12px 18px",
                  fontWeight: 600,
                  fontSize: "1.08rem",
                  cursor: "pointer"
                }}
                onClick={() => setCallMuted((m) => !m)}
              >
                <MuteIcon style={{ fontSize: 22, color: "#fff" }} />
                <div style={{ fontSize: 12 }}>{callMuted ? "Unmute" : "Mute"}</div>
              </button>
              <button
                style={{
                  background: videoEnabled ? "#43a047" : "#888",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  padding: "12px 18px",
                  fontWeight: 600,
                  fontSize: "1.08rem",
                  cursor: "pointer"
                }}
                onClick={() => setVideoEnabled((v) => !v)}
              >
                <CameraIcon style={{ fontSize: 22, color: "#fff" }} />
                <div style={{ fontSize: 12 }}>{videoEnabled ? "Disable Video" : "Enable Video"}</div>
              </button>
              <button
                style={{
                  background: screenShared ? "#007bff" : "#43a047",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  padding: "12px 18px",
                  fontWeight: 600,
                  fontSize: "1.08rem",
                  cursor: "pointer"
                }}
                onClick={() => setScreenShared((s) => !s)}
              >
                <span role="img" aria-label="Share Screen" style={{ fontSize: 22 }}>🖥️</span>
                <div style={{ fontSize: 12 }}>{screenShared ? "Stop Share" : "Share Screen"}</div>
              </button>
            </div>
            <button
              style={{
                background: "#c82333",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                padding: "14px 22px",
                fontWeight: 600,
                fontSize: "1.08rem",
                cursor: "pointer"
              }}
              onClick={handleCloseCallPopup}
            >
              Leave Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
}