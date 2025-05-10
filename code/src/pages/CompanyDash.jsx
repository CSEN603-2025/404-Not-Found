import React, { useState, useEffect } from 'react';
import { Tabs, TabList, TabTrigger, TabContent } from '../components/ui/tabs';
import CompanyApplications from './CompanyApplications';
import MyCompIntern from './MyCompIntern';
import InternshipListings from './InternshipListings';
import StudentManagement from './StudentManagement';
import ApplicaComp from './ApplicaComp';
import ReportManagement from './ReportManagement';
import InternshipCycleManagement from './InternshipCycleManagement';
import { BuildingIcon } from '../components/ui/buildingicon';
import { BriefcaseIcon } from '../components/ui/briefcaseicon';
import { UsersIcon } from '../components/ui/usersicon';
import { FileTextIcon } from '../components/ui/filetexticon';
import { CalendarClockIcon } from '../components/ui/calendarclockicon';
import '../styles/ScadOfficePage.css';

function ScadOfficePage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="scad-office-container">
      <h1 className="scad-office-title">Company Office</h1>
      <p className="scad-office-description">
        Manage company applications, internships, students, and reports for the GUC Internship Program.
      </p>
      <Tabs defaultValue="company-applications">
        <TabList>
          <TabTrigger value="my-internships">
            <BuildingIcon className="tab-icon" /> My Internships
          </TabTrigger>
          <TabTrigger value="internship-listings">
            <BriefcaseIcon className="tab-icon" /> Internships
          </TabTrigger>
          <TabTrigger value="apllications-company">
            <UsersIcon className="tab-icon" /> Applications
          </TabTrigger>
          <TabTrigger value="report-management">
            <FileTextIcon className="tab-icon" /> Reports
          </TabTrigger>
          <TabTrigger value="internship-cycle">
            <CalendarClockIcon className="tab-icon" /> Cycle
          </TabTrigger>
        </TabList>
        <TabContent value="my-internships">
          <MyCompIntern />
        </TabContent>
        <TabContent value="internship-listings">
          <InternshipListings />
        </TabContent>
        <TabContent value="apllications-company">
          <ApplicaComp />
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