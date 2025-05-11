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
import '../styles/ScadOfficePage.css';

function ScadOfficePage() {
  const [isClient, setIsClient] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // State to toggle the notification popup
  const [notifications, setNotifications] = useState([]); // State to store notifications

  useEffect(() => {
    setIsClient(true);

    // Example: Add dummy notifications
    setNotifications([
      'John Doe has accepted your appointment request.',
      'Jane Smith has rejected your appointment request.',
      'Ahmed Ali has accepted your appointment request.',
    ]);
  }, []);

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
          </div>
        )}
      </div>

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