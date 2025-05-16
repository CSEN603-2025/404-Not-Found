import React, { useState, useRef } from 'react';
import './InternshipReports.css';

const initialReports = [
  {
    title: "My First Internship Experience",
    updated: "May 14th, 2025 5:23 PM",
    created: "May 14th, 2025 8:23 PM",
    summary: "This report details my activities and learnings during my summer internship at Tech Solutions Inc.",
    introduction: "This report details my activities and learnings during my summer internship at Tech Solutions Inc.",
    body: "Throughout the internship, I was involved in various projects, including developing a new feature for the company's flagship product and participating in agile team meetings. I gained valuable experience in full-stack development and teamwork.",
    conclusion: "Overall, the internship was a highly rewarding experience that significantly contributed to my professional growth and understanding of the tech industry.",
    Status: "Flagged",
    Comments: "The report contains insufficient details about the challenges faced during the internship."
  },
  {
    title: "Marketing Internship at Creative Co.",
    updated: "May 12th, 2025 5:23 PM",
    summary: "A comprehensive overview of my marketing internship focusing on digital campaigns and market research.",
    Status: "Accepted",
  },
  {
    title: "Software Engineering Internship",
    updated: "May 10th, 2025 4:00 PM",
    summary: "My experience as a software engineering intern, working on real-world projects and collaborating with a tech team."
  },
  {
    title: "Finance Internship at FinCorp",
    updated: "May 8th, 2025 2:15 PM",
    summary: "Insights and skills gained during my finance internship, including data analysis and client reporting."
  },
  {
    title: "Business Analyst Internship",
    updated: "May 6th, 2025 3:00 PM",
    summary: "Business analysis, requirements gathering, and process improvement during my internship at BizAnalytics."
  },
  {
    title: "HR Internship at PeopleFirst",
    updated: "May 4th, 2025 1:45 PM",
    summary: "Recruitment, onboarding, and employee engagement projects during my HR internship at PeopleFirst."
  }
];

const COURSE_LIST = [
  "COM210 - Technical Communication",
  "CS305 - Software Engineering",
  "CS320 - Database Management Systems",
  "DS410 - Data Analysis and Visualization",
  "FIN301 - Corporate Finance",
  "MKTG450 - Digital Marketing"
];

function InternshipReports() {
  const [reports, setReports] = useState(initialReports);
  const [viewIdx, setViewIdx] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editReport, setEditReport] = useState(reports[0]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const printRef = useRef();

  // Download as PDF handler for the detailed view
  const handlePrint = () => {
    // Print only the print-section
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // To restore React events
  };

  // Handler to add a new report (with placeholder content)
  const handleCreateReport = () => {
    const newReport = {
      title: "New Internship Report",
      updated: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      created: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      summary: "Summary of your new internship report.",
      introduction: "",
      body: "",
      conclusion: ""
    };
    setReports([newReport, ...reports]);
    setEditReport(newReport);
    setViewIdx(0);
    setEditMode(true);
  };

  // Prefill selectedCourses when entering edit mode
  React.useEffect(() => {
    if (editMode && editReport.relevantCourses) {
      setSelectedCourses(editReport.relevantCourses);
    } else if (editMode) {
      setSelectedCourses([]);
    }
    // eslint-disable-next-line
  }, [editMode, editReport]);

  // Only show the detailed view for the first report
  if (viewIdx === 0) {
    const report = editMode ? editReport : reports[0];

    return (
      <div style={{ minHeight: "100vh", background: "#f5f5f5", padding: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <button
            style={{
              background: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: 8,
              padding: "10px 22px",
              fontWeight: 500,
              fontSize: "1.08rem",
              cursor: "pointer"
            }}
            onClick={() => {
              setViewIdx(null);
              setEditMode(false);
            }}
          >
            ← Back to Reports
          </button>
          <div style={{ display: "flex", gap: 16 }}>
            {!editMode && (
              <button
                style={{
                  background: "#fff",
                  border: "1px solid #e0e0e0",
                  borderRadius: 8,
                  padding: "10px 22px",
                  fontWeight: 500,
                  fontSize: "1.08rem",
                  cursor: "pointer"
                }}
                onClick={() => setEditMode(true)}
              >
                Edit Report
              </button>
            )}
            {editMode && (
              <button
                style={{
                  background: "#43a047",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 22px",
                  fontWeight: 500,
                  fontSize: "1.08rem",
                  cursor: "pointer"
                }}
                onClick={() => {
                  // Save changes to the main reports array
                  const updatedReports = [...reports];
                  updatedReports[0] = {
                    ...editReport,
                    updated: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
                    relevantCourses: selectedCourses
                  };
                  setReports(updatedReports);
                  setEditMode(false);
                }}
              >
                Save
              </button>
            )}
            <button
              style={{
                background: "#ffd600",
                color: "#222",
                border: "none",
                borderRadius: 8,
                padding: "10px 22px",
                fontWeight: 600,
                fontSize: "1.08rem",
                cursor: "pointer"
              }}
              onClick={handlePrint}
            >
              Download as PDF
            </button>
          </div>
        </div>
        <div
          id="print-section"
          ref={printRef}
          style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 18px rgba(56,211,159,0.10)",
            padding: "36px 32px",
            maxWidth: 900,
            margin: "0 auto"
          }}
        >
          {editMode ? (
            <form
              onSubmit={e => {
                e.preventDefault();
                const updatedReports = [...reports];
                updatedReports[0] = {
                  ...editReport,
                  updated: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
                  relevantCourses: selectedCourses
                };
                setReports(updatedReports);
                setEditMode(false);
              }}
            >
              <input
                type="text"
                value={editReport.title}
                onChange={e => setEditReport({ ...editReport, title: e.target.value })}
                style={{
                  color: "#43a047",
                  fontWeight: 700,
                  fontSize: "2.3rem",
                  marginBottom: 8,
                  border: "none",
                  outline: "none",
                  width: "100%",
                  background: "transparent"
                }}
              />
              <div style={{ color: "#888", fontSize: "1.08rem", marginBottom: 24 }}>
                Created: {editReport.created} | Last updated: {editReport.updated}
              </div>
              <div style={{ fontWeight: 700, color: "#43a047", fontSize: "1.35rem", marginBottom: 6 }}>Introduction</div>
              <hr style={{ margin: "0 0 12px 0" }} />
              <textarea
                value={editReport.introduction}
                onChange={e => setEditReport({ ...editReport, introduction: e.target.value })}
                style={{
                  fontSize: "1.13rem",
                  marginBottom: 24,
                  width: "100%",
                  border: "1px solid #e0e0e0",
                  borderRadius: 6,
                  padding: 10,
                  minHeight: 60
                }}
              />
              <div style={{ fontWeight: 700, color: "#43a047", fontSize: "1.35rem", marginBottom: 6 }}>Body</div>
              <hr style={{ margin: "0 0 12px 0" }} />
              <textarea
                value={editReport.body}
                onChange={e => setEditReport({ ...editReport, body: e.target.value })}
                style={{
                  fontSize: "1.13rem",
                  marginBottom: 24,
                  width: "100%",
                  border: "1px solid #e0e0e0",
                  borderRadius: 6,
                  padding: 10,
                  minHeight: 80
                }}
              />
              <div style={{ fontWeight: 700, color: "#43a047", fontSize: "1.35rem", marginBottom: 6 }}>Conclusion</div>
              <hr style={{ margin: "0 0 12px 0" }} />
              <textarea
                value={editReport.conclusion}
                onChange={e => setEditReport({ ...editReport, conclusion: e.target.value })}
                style={{
                  fontSize: "1.13rem",
                  width: "100%",
                  border: "1px solid #e0e0e0",
                  borderRadius: 6,
                  padding: 10,
                  minHeight: 60
                }}
              />
              <div style={{
                marginTop: 32,
                background: "#fafbfa",
                borderRadius: 12,
                border: "1px solid #e0e0e0",
                padding: "18px 18px 10px 18px"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 22, color: "#43a047" }}>📚</span>
                  <span style={{ fontWeight: 600, fontSize: "1.18rem", color: "#222" }}>Relevant Courses</span>
                </div>
                <div style={{ color: "#888", marginBottom: 18, fontSize: "1.05rem" }}>
                  Select the courses from your major that you found helpful or relevant during your internship.
                </div>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "12px 18px"
                }}>
                  {COURSE_LIST.map(course => (
                    <label key={course} style={{
                      display: "flex",
                      alignItems: "center",
                      background: "#fff",
                      borderRadius: 8,
                      border: "1px solid #e0e0e0",
                      padding: "12px 14px",
                      fontWeight: 500,
                      fontSize: "1.08rem"
                    }}>
                      <input
                        type="checkbox"
                        style={{ marginRight: 10, accentColor: "#43a047" }}
                        checked={selectedCourses.includes(course)}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectedCourses([...selectedCourses, course]);
                          } else {
                            setSelectedCourses(selectedCourses.filter(c => c !== course));
                          }
                        }}
                      />
                      {course}
                    </label>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                style={{
                  marginTop: 16,
                  background: "#43a047",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 22px",
                  fontWeight: 500,
                  fontSize: "1.08rem",
                  cursor: "pointer"
                }}
              >
                Save
              </button>
            </form>
          ) : (
            <>
              <div style={{ color: "#43a047", fontWeight: 700, fontSize: "2.3rem", marginBottom: 8 }}>
                {report.title}
              </div>
              <div style={{ color: "#888", fontSize: "1.08rem", marginBottom: 24 }}>
                Created: {report.created} | Last updated: {report.updated}
              </div>
              <div style={{ fontWeight: 700, color: "#43a047", fontSize: "1.35rem", marginBottom: 6 }}>Introduction</div>
              <hr style={{ margin: "0 0 12px 0" }} />
              <div style={{ fontSize: "1.13rem", marginBottom: 24 }}>
                {report.introduction}
              </div>
              <div style={{ fontWeight: 700, color: "#43a047", fontSize: "1.35rem", marginBottom: 6 }}>Body</div>
              <hr style={{ margin: "0 0 12px 0" }} />
              <div style={{ fontSize: "1.13rem", marginBottom: 24 }}>
                {report.body}
              </div>
              <div style={{ fontWeight: 700, color: "#43a047", fontSize: "1.35rem", marginBottom: 6 }}>Conclusion</div>
              <hr style={{ margin: "0 0 12px 0" }} />
              <div style={{ fontSize: "1.13rem" }}>
                {report.conclusion}
              </div>
              {report.relevantCourses && report.relevantCourses.length > 0 && (
                <div style={{
                  marginTop: 32,
                  background: "#fafbfa",
                  borderRadius: 12,
                  border: "1px solid #e0e0e0",
                  padding: "18px 18px 10px 18px"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 22, color: "#43a047" }}>📚</span>
                    <span style={{ fontWeight: 600, fontSize: "1.18rem", color: "#222" }}>Relevant Courses</span>
                  </div>
                  <div style={{ color: "#888", marginBottom: 18, fontSize: "1.05rem" }}>
                    Courses you found helpful or relevant during your internship:
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 24 }}>
                    {report.relevantCourses.map(course => (
                      <li key={course} style={{ fontSize: "1.08rem", marginBottom: 6 }}>{course}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  // Default: show all report cards
  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f5f5",
      padding: "40px 0"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "flex-end",
        maxWidth: 1100,
        margin: "0 auto 24px auto",
        paddingRight: "40px" // Move the button a bit to the left
      }}>
        <button
          style={{
            background: "#43a047",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "12px 28px",
            fontWeight: 600,
            fontSize: "1.08rem",
            cursor: "pointer"
          }}
          onClick={handleCreateReport}
        >
          Create Report
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
          justifyItems: "center",
          maxWidth: 1100,
          margin: "0 auto"
        }}
      >
        {reports.map((report, idx) => (
          <div
            key={idx}
            style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 2px 18px rgba(56,211,159,0.10)",
              padding: "18px 18px",
              minWidth: 250,
              maxWidth: 320,
              width: 300,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: "1.08rem", marginBottom: 2, lineHeight: 1.2 }}>
                  {report.title}
                </div>
                <div style={{ color: "#888", fontSize: "0.95rem", marginBottom: 8 }}>
                  Last updated: {report.updated}
                </div>
              </div>
            </div>
            <div style={{ color: "#4d6a7a", fontSize: "0.98rem", margin: "12px 0 14px 0" }}>
              {report.summary}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                style={{
                  background: "#f6f7fa",
                  color: "#222",
                  border: "none",
                  borderRadius: 8,
                  padding: "7px 12px",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4
                }}
                onClick={() => {
                  if (idx === 0) {
                    setEditReport(reports[0]);
                  }
                  setViewIdx(idx);
                }}
              >
                View
              </button>
              <button
                style={{
                  background: "#e53935",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "7px 12px",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4
                }}
                onClick={() => {
                  if (idx === 0) {
                    // Remove the first report
                    const updatedReports = reports.slice(1);
                    setReports(updatedReports);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InternshipReports;