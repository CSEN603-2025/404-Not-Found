import React, { useState, useEffect } from 'react';
import { Tabs, TabList, TabTrigger, TabContent } from '../components/ui/tabs';
import CompanyApplications from './CompanyApplications';
import InternshipListings from './InternshipListings';
import StudentManagement from './StudentManagement';
import ReportManagement from './ReportManagement';
import InternshipCycleManagement from './InternshipCycleManagement';
import { BuildingIcon } from '../components/ui/buildingicon';
import { BriefcaseIcon } from '../components/ui/briefcaseicon';
import { UsersIcon } from '../components/ui/usersicon';
import { FileTextIcon } from '../components/ui/filetexticon';
import { CalendarClockIcon } from '../components/ui/calendarclockicon';
import BellIcon from '../components/ui/BellIcon'; // Import a bell icon for notifications
import PhoneIcon from '../components/ui/phoneicon'; // Import a phone icon for incoming call
import MuteIcon from '../components/ui/muteicon'; // Import a mute icon
import CameraIcon from '../components/ui/cameraicon'; // Import a camera icon
import {Button} from '../components/ui/button'; // Import a button component
import '../styles/ScadOfficePage.css';

function ScadOfficePage() {
  const [isClient, setIsClient] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // State to toggle the notification popup
  const [notifications, setNotifications] = useState([]); // State to store notifications
  const [callPopup, setCallPopup] = useState(false); // State to toggle the call popup
  const [callerName, setCallerName] = useState(null); // State for the caller's name

  useEffect(() => {
    setIsClient(true);

    // Example: Add dummy notifications
    setNotifications([
      'John Doe has accepted your appointment request.',
      'Jane Smith has rejected your appointment request.',
      'Ahmed is Calling You',
    ]);
  }, []);

  const handleAcceptCall = (callerName) => {
    setCallerName(callerName); // Set the caller's name
    setCallPopup(true); // Show the call popup

    // Remove the "Ahmed is Calling" notification
    setNotifications((prev) => prev.filter((notification) => notification !== 'Ahmed is Calling You'));
  };

  const handleRejectCall = () => {
    // Remove the "Ahmed is Calling" notification
    setNotifications((prev) => prev.filter((notification) => notification !== 'Ahmed is Calling You'));
  };

  if (!isClient) return null;

  return (
    <div className="scad-office-container">
      {/* Notifications Button */}
      <div className="notifications-button-container">
        <button
          className="notifications-button"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <BellIcon className="notifications-icon" />
        </button>
        {/* Notifications Popup */}
        {showNotifications && (
          <div className="notifications-popup">
            <h3>Notifications</h3>
            <ul>
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <li key={index}>{notification}</li>
                ))
              ) : (
                <li>No notifications available.</li>
              )}
            </ul>

            {/* Incoming Call Section */}
            {notifications.includes('Ahmed is Calling You') && (
              <div className="incoming-call">
                <div className="incoming-call-header">
                  <h4>Ahmed is Calling You</h4>
                  <div className="call-buttons">
                    <button
                      className="answer-button"
                      onClick={() => handleAcceptCall('Ahmed')}
                    >
                      <PhoneIcon className="action-icon" />
                    </button>
                    <button
                      className="reject-button"
                      onClick={handleRejectCall}
                    >
                      <PhoneIcon className="action-icon" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Call Popup */}
      {callPopup && callerName && (
        <div className="call-popup-overlay">
          <div className="call-popup">
            <h2>Calling {callerName}</h2>
            <div className="call-screen">
              {/* Call screen content */}
            </div>
            <div className="call-controls">
              <div className="left-controls">
                <Button className="call-control-button">
                  <MuteIcon className="action-icon" />
                </Button>
                <Button className="call-control-button">
                  <CameraIcon className="action-icon" />
                </Button>
              </div>
              <div className="right-controls">
                <Button className="call-control-button">
                  Share Screen
                </Button>
              </div>
            </div>
            <div className="end-call-container">
              <Button
                className="call-control-button end-call-button"
                onClick={() => {
                  setCallPopup(false); // Close the popup
                  setCallerName(null); // Clear the caller's name
                }}
              >
                <PhoneIcon className="action-icon" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <h1 className="scad-office-title">SCAD Office Central</h1>
      <p className="scad-office-description">
        Manage company applications, internships, students, and reports for the GUC Internship Program.
      </p>
      <Tabs defaultValue="company-applications">
        <TabList>
          <TabTrigger value="company-applications">
            <BuildingIcon className="tab-icon" /> Companies
          </TabTrigger>
          <TabTrigger value="internship-listings">
            <BriefcaseIcon className="tab-icon" /> Internships
          </TabTrigger>
          <TabTrigger value="student-management">
            <UsersIcon className="tab-icon" /> Students
          </TabTrigger>
          <TabTrigger value="report-management">
            <FileTextIcon className="tab-icon" /> Reports
          </TabTrigger>
          <TabTrigger value="internship-cycle">
            <CalendarClockIcon className="tab-icon" /> Cycle
          </TabTrigger>
        </TabList>
        <TabContent value="company-applications">
          <CompanyApplications />
        </TabContent>
        <TabContent value="internship-listings">
          <InternshipListings />
        </TabContent>
        <TabContent value="student-management">
          <StudentManagement />
        </TabContent>
        <TabContent value="report-management">
          <ReportManagement />
        </TabContent>
        <TabContent value="internship-cycle">
          <InternshipCycleManagement />
        </TabContent>
      </Tabs>
    </div>
  );
}

export default ScadOfficePage;