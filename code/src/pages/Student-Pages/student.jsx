import React, { useState, useEffect } from 'react';
import { Tabs, TabList, TabTrigger, TabContent } from '../../components/ui/tabs';
import { BuildingIcon } from '../../components/ui/buildingicon';
import { BriefcaseIcon } from '../../components/ui/briefcaseicon';
import { UsersIcon } from '../../components/ui/usersicon';
import { FileTextIcon } from '../../components/ui/filetexticon';
import BellIcon from '../../components/ui/BellIcon'; // Import a bell icon for notifications
import { mockSuggestedCompanies, mockAppliedInternships } from '../../data/mock-data-Student'; // Import mock data
import '../../styles/student.css';

import Profile from './Profile';
import SuggestedCompanies from './SuggestedCompanies';
import AppliedInternships from './AppliedInternships';
import EvaluateCompanies from './EvaluateCompanies';
import InternshipReports from './InternshipReports';

function Student() {
  const [isClient, setIsClient] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // State to toggle the notification popup
  const [suggestedCompanies, setSuggestedCompanies] = useState([]); // State to store suggested companies
  const [uploadedFiles, setUploadedFiles] = useState([]); // State to store uploaded files
  const [appliedInternships, setAppliedInternships] = useState([]); // State to store applied internships
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [companyEvaluations, setCompanyEvaluations] = useState([]);
  const [editingEvaluation, setEditingEvaluation] = useState(null);
  const [internshipReports, setInternshipReports] = useState([]);
  const [editingReport, setEditingReport] = useState(null);
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');

  useEffect(() => {
    setIsClient(true);

    // Set mock data for suggested companies and applied internships
    setSuggestedCompanies(mockSuggestedCompanies);
    setAppliedInternships(mockAppliedInternships);
  }, []);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredInternships = appliedInternships.filter((internship) => {
    const matchesSearch =
      internship.title.toLowerCase().includes(searchQuery) ||
      internship.company.toLowerCase().includes(searchQuery);

    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'current' && internship.status === 'Accepted') ||
      (filterStatus === 'completed' && internship.status === 'Completed');

    return matchesSearch && matchesFilter;
  });

  const handleDeleteEvaluation = (id) => {
    setCompanyEvaluations((prev) => prev.filter((evaluation) => evaluation.id !== id));
  };

  const handleAddEvaluation = () => {
    const newEvaluation = {
      id: companyEvaluations.length + 1,
      companyName: '',
      recommendation: '',
      comments: '',
    };
    setCompanyEvaluations((prev) => [...prev, newEvaluation]);
    setEditingEvaluation(newEvaluation.id);
  };

  const handleEditEvaluation = (id) => {
    setEditingEvaluation(id);
  };

  const handleSaveEvaluation = (id, updatedEvaluation) => {
    setCompanyEvaluations((prev) =>
      prev.map((evaluation) =>
        evaluation.id === id ? { ...evaluation, ...updatedEvaluation } : evaluation
      )
    );
    setEditingEvaluation(null);
  };

  const handleAddReport = () => {
    const newReport = {
      id: internshipReports.length + 1,
      title: '',
      introduction: '',
      body: '',
    };
    setInternshipReports((prev) => [...prev, newReport]);
    setEditingReport(newReport.id);
  };

  const handleEditReport = (id) => {
    setEditingReport(id);
  };

  const handleSaveReport = (id, updatedReport) => {
    setInternshipReports((prev) =>
      prev.map((report) =>
        report.id === id ? { ...report, ...updatedReport } : report
      )
    );
    setEditingReport(null);
  };

  const handleDeleteReport = (id) => {
    setInternshipReports((prev) => prev.filter((report) => report.id !== id));
  };

  if (!isClient) return null;

  return (
    <div className="student-container">
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
              <li>No notifications available.</li>
            </ul>
          </div>
        )}
      </div>

      <h1 className="student-title">Student Dashboard</h1>
      <p className="student-description">
        Access your internship applications, notifications, and profile details.
      </p>
      <Tabs defaultValue="profile">
        <TabList>
          <TabTrigger value="profile">
            <UsersIcon className="tab-icon" /> Profile
          </TabTrigger>
          <TabTrigger value="suggested-companies">
            <BriefcaseIcon className="tab-icon" /> Companies
          </TabTrigger>
          <TabTrigger value="applied-internships">
            <FileTextIcon className="tab-icon" /> Applied Internships
          </TabTrigger>
          <TabTrigger value="evaluate-companies">
            <BuildingIcon className="tab-icon" /> Evaluate Companies
          </TabTrigger>
          <TabTrigger value="internship-reports">
            <FileTextIcon className="tab-icon" /> Internship Reports
          </TabTrigger>
        </TabList>

        <TabContent value="profile">
          <Profile
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            selectedMajor={selectedMajor}
            setSelectedMajor={setSelectedMajor}
            selectedSemester={selectedSemester}
            setSelectedSemester={setSelectedSemester}
          />
        </TabContent>

        <TabContent value="suggested-companies">
          <SuggestedCompanies suggestedCompanies={suggestedCompanies} />
        </TabContent>

        <TabContent value="applied-internships">
          <AppliedInternships
            appliedInternships={appliedInternships}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        </TabContent>

        <TabContent value="evaluate-companies">
          <EvaluateCompanies
            companyEvaluations={companyEvaluations}
            handleAddEvaluation={handleAddEvaluation}
            handleEditEvaluation={handleEditEvaluation}
            handleDeleteEvaluation={handleDeleteEvaluation}
            handleSaveEvaluation={handleSaveEvaluation}
            editingEvaluation={editingEvaluation}
          />
        </TabContent>

        <TabContent value="internship-reports">
          <InternshipReports
            internshipReports={internshipReports}
            handleAddReport={handleAddReport}
            handleEditReport={handleEditReport}
            handleDeleteReport={handleDeleteReport}
            handleSaveReport={handleSaveReport}
            editingReport={editingReport}
          />
        </TabContent>
      </Tabs>
    </div>
  );
}

export default Student;