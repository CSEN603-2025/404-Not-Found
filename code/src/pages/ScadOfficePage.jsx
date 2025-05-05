import React, { useState, useEffect } from 'react';
import Tabs from '../components/Tabs';
import TabContent from '../components/TabContent';
import TabList from '../components/TabList';
import TabTrigger from '../components/TabTrigger';
import CompanyApplications from './CompanyApplications';
import InternshipListings from './InternshipListings';
import StudentManagement from './StudentManagement';
import ReportManagement from './ReportManagement';
import InternshipCycleManagement from './InternshipCycleManagement';
import BuildingIcon from '../components/icons/Building';
import BriefcaseIcon from '../components/icons/Briefcase';
import UsersIcon from '../components/icons/Users';
import FileTextIcon from '../components/icons/FileText';
import CalendarClockIcon from '../components/icons/CalendarClock';
import './ScadOfficePage.css';

function ScadOfficePage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="scad-office-container">
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