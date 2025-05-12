import React, { useState, useEffect } from 'react';
import { Tabs, TabList, TabTrigger, TabContent } from '../components/ui/tabs';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import CompanyApplications from './CompanyApplications';
import MyCompIntern from './MyCompIntern';
import InternshipListings from './InternshipListings';
import StudentManagement from './StudentManagement';
import ApplicaComp from './ApplicaComp';
import ReportManagement from './ReportManagement';
import InternshipCycleManagement from './InternshipCycleManagement';
import DecisionTable from './DecisionTable';
import InternshipStatusPage from './InternshipStatusPage';
import EvaluationFormPage from './EvaluationFormPage';
import JobPostPage from './JobPostPage';
import { BuildingIcon } from '../components/ui/buildingicon';
import { BriefcaseIcon } from '../components/ui/briefcaseicon';
import { UsersIcon } from '../components/ui/usersicon';
import { FileTextIcon } from '../components/ui/filetexticon';
import { CalendarClockIcon } from '../components/ui/calendarclockicon';
import '../styles/CompanyDash.css';

function ScadOfficePage() {
  const [isClient, setIsClient] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

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
      <button
        className="job-post-button"
        onClick={() => navigate('/job-posts')} // Redirect to JobPostPage
      >
        Create Post
      </button>
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
          <TabTrigger value="decision-table">
            <FileTextIcon className="tab-icon" /> Action
          </TabTrigger>
          <TabTrigger value="internship-status">
            <CalendarClockIcon className="tab-icon" /> Enrolling Interns
          </TabTrigger>
          <TabTrigger value="evaluation-report">
            <FileTextIcon className="tab-icon" /> Evaluation
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
        <TabContent value="decision-table">
          <DecisionTable />
        </TabContent>
        <TabContent value="internship-status">
          <InternshipStatusPage />
        </TabContent>
        <TabContent value="evaluation-report">
          <EvaluationFormPage />
        </TabContent>
      </Tabs>
    </div>
  );
}

export default ScadOfficePage;