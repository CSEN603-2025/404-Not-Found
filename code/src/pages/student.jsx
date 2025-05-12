import React, { useState, useEffect } from 'react';
import { Tabs, TabList, TabTrigger, TabContent } from '../components/ui/tabs';
import { BuildingIcon } from '../components/ui/buildingicon';
import { BriefcaseIcon } from '../components/ui/briefcaseicon';
import { UsersIcon } from '../components/ui/usersicon';
import { FileTextIcon } from '../components/ui/filetexticon';
import '../styles/student.css';

function Student() {
  const [isClient, setIsClient] = useState(false);
  const [suggestedCompanies, setSuggestedCompanies] = useState([]); // State to store suggested companies
  const [uploadedFiles, setUploadedFiles] = useState([]); // State to store uploaded files
  const [appliedInternships, setAppliedInternships] = useState([]);

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
      {
        id: 4,
        title: 'Marketing Intern',
        company: 'Marketify',
        location: 'Los Angeles, CA',
        status: 'Finalized',
        postedDate: '2025-05-01',
      },
      // New internships
      {
        id: 5,
        title: 'Data Analyst Intern',
        company: 'Data Insights',
        location: 'Chicago, IL',
        status: 'Pending',
        postedDate: '2025-05-05',
      },
      {
        id: 6,
        title: 'Graphic Design Intern',
        company: 'Creative Studio',
        location: 'Austin, TX',
        status: 'Rejected',
        postedDate: '2025-04-25',
      },
      {
        id: 7,
        title: 'Cybersecurity Intern',
        company: 'SecureTech',
        location: 'Seattle, WA',
        status: 'Accepted',
        postedDate: '2025-03-20',
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
    // Here you can add logic to save the profile data to a database or API
  };

  if (!isClient) return null;

  return (
    <div className="student-container">
      <h1 className="student-title">Student Dashboard</h1>
      <p className="student-description">
        Access your internship applications, notifications, and profile details.
      </p>
      <Tabs defaultValue="profile">
        <TabList>
          <TabTrigger value="profile">
            <UsersIcon className="tab-icon" /> Profile
          </TabTrigger>
          <TabTrigger value="majors">
            <BriefcaseIcon className="tab-icon" /> Majors
          </TabTrigger>
          <TabTrigger value="suggested-companies">
            <BriefcaseIcon className="tab-icon" /> Suggested Companies
          </TabTrigger>
          <TabTrigger value="applied-internships">
            <FileTextIcon className="tab-icon" /> Applied Internships
          </TabTrigger>
        </TabList>
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
        <TabContent value="majors">
          <div className="majors-container">
            <h3>Select Your Major and Semester</h3>
            <form>
              <div className="form-group">
                <label htmlFor="major">Major</label>
                <select id="major">
                  <option value="">Select a Major</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Business Administration">Business Administration</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Psychology">Psychology</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="semester">Semester</label>
                <input
                  type="number"
                  id="semester"
                  placeholder="Enter semester number"
                  min="1"
                />
              </div>
              <button type="submit" className="profile-submit-button">
                Submit
              </button>
            </form>
          </div>
        </TabContent>
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
        <TabContent value="applied-internships">
          <div className="applied-internships-container">
            <h3>Applied Internships</h3>
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
                {appliedInternships.map((internship) => (
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
      </Tabs>
    </div>
  );
}

export default Student;