import React, { useState, useEffect } from 'react';
import { Tabs, TabList, TabTrigger, TabContent } from '../components/ui/tabs';
import { BuildingIcon } from '../components/ui/buildingicon';
import { BriefcaseIcon } from '../components/ui/briefcaseicon';
import { UsersIcon } from '../components/ui/usersicon';
import { FileTextIcon } from '../components/ui/filetexticon';
import BellIcon from '../components/ui/BellIcon'; // Import a bell icon for notifications
import '../styles/student.css';

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

    // Example: Fetch suggested companies (dummy data for now)
    setSuggestedCompanies([
      {
        id: 1,
        name: 'Tech Corp',
        industry: 'Technology',
        location: 'San Francisco, CA',
        recommendation: 'Highly recommended by past interns',
      },
      {
        id: 2,
        name: 'Health Inc',
        industry: 'Healthcare',
        location: 'New York, NY',
        recommendation: 'Great learning environment',
      },
      {
        id: 3,
        name: 'Edu Solutions',
        industry: 'Education',
        location: 'Boston, MA',
        recommendation: 'Flexible work culture',
      },
    ]);

    // Example: Fetch applied internships (updated data)
    setAppliedInternships([
      {
        id: 1,
        title: 'Software Engineering Intern',
        company: 'Tech Corp',
        location: 'Remote',
        status: 'Pending',
        postedDate: '2025-04-01',
      },
      {
        id: 2,
        title: 'Healthcare Intern',
        company: 'Health Inc',
        location: 'New York, NY',
        status: 'Rejected',
        postedDate: '2025-03-10',
      },
      {
        id: 3,
        title: 'Education Intern',
        company: 'Edu Solutions',
        location: 'Boston, MA',
        status: 'Accepted',
        postedDate: '2025-02-15',
      },
    ]);
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
            <BriefcaseIcon className="tab-icon" /> Suggested Companies
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

        {/* Profile Tab */}
        <TabContent value="profile">
          <form className="profile-form" onSubmit={handleProfileSubmit}>
            <div className="form-group">
              <label htmlFor="jobInterests">Job Interests</label>
              <input
                type="text"
                id="jobInterests"
                name="jobInterests"
                placeholder="Describe your job interests..."
              />
            </div>
            <div className="form-group">
              <label htmlFor="previousInternships">Previous Internships</label>
              <input
                type="text"
                id="previousInternships"
                name="previousInternships"
                placeholder="Include responsibilities, duration, and company name..."
              />
            </div>
            <div className="form-group">
              <label htmlFor="partTimeJobs">Part-Time Jobs</label>
              <input
                type="text"
                id="partTimeJobs"
                name="partTimeJobs"
                placeholder="Include responsibilities, duration, and company name..."
              />
            </div>
            <div className="form-group">
              <label htmlFor="collegeActivities">College Activities</label>
              <input
                type="text"
                id="collegeActivities"
                name="collegeActivities"
                placeholder="List any college activities you took part in..."
              />
            </div>
            <div className="form-group">
              <label htmlFor="extraDocuments">Upload Extra Documents</label>
              <input
                type="file"
                id="extraDocuments"
                name="extraDocuments"
                multiple
                onChange={handleFileUpload}
              />
            </div>
            <div className="form-group">
              <label htmlFor="majorSelect">Select Major</label>
              <select
                id="majorSelect"
                value={selectedMajor}
                onChange={(e) => setSelectedMajor(e.target.value)}
              >
                <option value="">-- Select a Major --</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="semesterInput">Enter Semester</label>
              <input
                type="number"
                id="semesterInput"
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                min="1"
                max="8"
                placeholder="Enter semester number"
              />
            </div>
            <div className="uploaded-files">
              <h4>Uploaded Files:</h4>
              <ul>
                {uploadedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
            <button type="submit" className="profile-submit-button">
              Update Profile
            </button>
          </form>
        </TabContent>

        {/* Evaluate Companies Tab */}
        <TabContent value="evaluate-companies">
          <div className="evaluation-list-container">
            <h3>Evaluate Companies</h3>
            <button className="add-evaluation-button" onClick={handleAddEvaluation}>
              Add New Evaluation
            </button>
            <ul className="evaluation-list">
              {companyEvaluations.map((evaluation) => (
                <li key={evaluation.id} className="evaluation-item">
                  {editingEvaluation === evaluation.id ? (
                    <div className="evaluation-edit-form">
                      <input
                        type="text"
                        placeholder="Company Name"
                        defaultValue={evaluation.companyName}
                        onChange={(e) =>
                          (evaluation.companyName = e.target.value)
                        }
                      />
                      <input
                        type="text"
                        placeholder="Recommendation"
                        defaultValue={evaluation.recommendation}
                        onChange={(e) =>
                          (evaluation.recommendation = e.target.value)
                        }
                      />
                      <textarea
                        placeholder="Comments"
                        defaultValue={evaluation.comments}
                        onChange={(e) => (evaluation.comments = e.target.value)}
                      />
                      <button
                        className="save-button"
                        onClick={() =>
                          handleSaveEvaluation(evaluation.id, evaluation)
                        }
                      >
                        Save
                      </button>
                      <button
                        className="cancel-button"
                        onClick={() => setEditingEvaluation(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="evaluation-display">
                      <h4>{evaluation.companyName}</h4>
                      <p>
                        <strong>Recommendation:</strong>{' '}
                        {evaluation.recommendation}
                      </p>
                      <p>
                        <strong>Comments:</strong> {evaluation.comments}
                      </p>
                      <div className="evaluation-actions">
                        <button
                          className="edit-button"
                          onClick={() => handleEditEvaluation(evaluation.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteEvaluation(evaluation.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </TabContent>

        {/* Suggested Companies Tab */}
        <TabContent value="suggested-companies">
          <div className="suggested-companies">
            <h3>Suggested Companies</h3>
            <div className="company-cards">
              {suggestedCompanies.map((company) => (
                <div key={company.id} className="company-card">
                  <h4>{company.name}</h4>
                  <p><strong>Industry:</strong> {company.industry}</p>
                  <p><strong>Location:</strong> {company.location}</p>
                  <p><strong>Recommendation:</strong> {company.recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </TabContent>

        {/* Applied Internships Tab */}
        <TabContent value="applied-internships">
          <div className="applied-internships-container">
            <h3>Applied Internships</h3>
            <div className="search-filter-container">
              <input
                type="text"
                placeholder="Search by title or company..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
              />
              <select
                value={filterStatus}
                onChange={handleFilterChange}
                className="filter-select"
              >
                <option value="all">All</option>
                <option value="current">Current Intern</option>
                <option value="completed">Internship Complete</option>
              </select>
            </div>
            <div className="internship-table">
              <div className="table-header">
                <div className="table-row">
                  <div className="table-cell">Title</div>
                  <div className="table-cell">Company</div>
                  <div className="table-cell">Location</div>
                  <div className="table-cell">Status</div>
                  <div className="table-cell">Posted Date</div>
                  <div className="table-cell">Actions</div>
                </div>
              </div>
              <div className="table-body">
                {filteredInternships.map((internship) => (
                  <div key={internship.id} className="table-row">
                    <div className="table-cell">{internship.title}</div>
                    <div className="table-cell">{internship.company}</div>
                    <div className="table-cell">{internship.location}</div>
                    <div className="table-cell">
                      <span
                        className={`status-label ${
                          internship.status.toLowerCase()
                        }`}
                      >
                        {internship.status}
                      </span>
                    </div>
                    <div className="table-cell">{internship.postedDate}</div>
                    <div className="table-cell">
                      <button className="view-button">View</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabContent>

        {/* Internship Reports Tab */}
        <TabContent value="internship-reports">
          <div className="reports-list-container">
            <h3>Internship Reports</h3>
            <button className="add-report-button" onClick={handleAddReport}>
              Add New Report
            </button>
            <ul className="reports-list">
              {internshipReports.map((report) => (
                <li key={report.id} className="report-item">
                  {editingReport === report.id ? (
                    <div className="report-edit-form">
                      <input
                        type="text"
                        placeholder="Title"
                        defaultValue={report.title}
                        onChange={(e) => (report.title = e.target.value)}
                      />
                      <textarea
                        placeholder="Introduction"
                        defaultValue={report.introduction}
                        onChange={(e) => (report.introduction = e.target.value)}
                      />
                      <textarea
                        placeholder="Body"
                        defaultValue={report.body}
                        onChange={(e) => (report.body = e.target.value)}
                      />
                      {/* Dropdown for selecting courses */}
                      <div className="form-group">
                        <label htmlFor={`coursesSelect-${report.id}`}>
                          Select Courses That Helped You
                        </label>
                        <select
                          id={`coursesSelect-${report.id}`}
                          multiple
                          value={report.selectedCourses || []}
                          onChange={(e) =>
                            (report.selectedCourses = Array.from(
                              e.target.selectedOptions,
                              (option) => option.value
                            ))
                          }
                        >
                          <option value="Data Structures">Data Structures</option>
                          <option value="Algorithms">Algorithms</option>
                          <option value="Database Systems">Database Systems</option>
                          <option value="Operating Systems">Operating Systems</option>
                          <option value="Software Engineering">
                            Software Engineering
                          </option>
                          <option value="Machine Learning">Machine Learning</option>
                        </select>
                      </div>
                      <div className="report-actions">
                        <button
                          className="save-button"
                          onClick={() => handleSaveReport(report.id, report)}
                        >
                          Save
                        </button>
                        <button
                          className="cancel-button"
                          onClick={() => setEditingReport(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="report-display">
                      <h4>{report.title}</h4>
                      <p>
                        <strong>Introduction:</strong> {report.introduction}
                      </p>
                      <p>
                        <strong>Body:</strong> {report.body}
                      </p>
                      <p>
                        <strong>Courses That Helped:</strong>{' '}
                        {report.selectedCourses?.join(', ') || 'None selected'}
                      </p>
                      <div className="report-actions">
                        <button
                          className="edit-button"
                          onClick={() => handleEditReport(report.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteReport(report.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </TabContent>
      </Tabs>
    </div>
  );
}

export default Student;