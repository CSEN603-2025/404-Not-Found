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
import ReportOfFac from './ReportOfFac';
import InternshipStatusPage from './InternshipStatusPage';
import EvaluationFormPage from './EvaluationFormPage';
import JobPostPage from './JobPostPage';
import Clarification from './Clarification';
import Statistics from './Statistics';
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
      <h1 className="scad-office-title">Faculty Member Office</h1>
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
          <TabTrigger value="statistics">
            <UsersIcon className="tab-icon" /> Statistics
          </TabTrigger>
          <TabTrigger value="reports">
            <FileTextIcon className="tab-icon" /> Reports
          </TabTrigger>
          <TabTrigger value="clarification">
            <CalendarClockIcon className="tab-icon" /> Clarification Form
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
        <TabContent value="statistics">
          <Statistics />
        </TabContent>
        <TabContent value="reports">
          <ReportOfFac />
        </TabContent>
        <TabContent value="clarification">
          <Clarification />
        </TabContent>
        <TabContent value="evaluation-report">
          <EvaluationFormPage />
        </TabContent>
      </Tabs>
    </div>
  );
}

export default ScadOfficePage;