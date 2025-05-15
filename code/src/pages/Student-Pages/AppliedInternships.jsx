import React, { useState } from 'react';

const STATUS_STYLES = {
  Interviewing: { background: "#f3e8ff", color: "#a259e6" },
  "Offer Received": { background: "#e6faf3", color: "#1abc9c" },
  Applied: { background: "#eaf1fb", color: "#3b82f6" },
  Accepted: { background: "#e6f9ee", color: "#16a34a" },
  Rejected: { background: "#fdeaea", color: "#e53935" },
  Completed: { background: "#e6f9ee", color: "#16a34a", border: "1px solid #b6e2c7" },
  Ongoing: { background: "#eaf1fb", color: "#3b82f6", border: "1px solid #b5d6f6" },
  Upcoming: { background: "#f3f3f3", color: "#888", border: "1px solid #e0e0e0" }
};

const dummyApplications = [
  {
    id: 1,
    company: "Tech Solutions Inc.",
    title: "Frontend Developer Intern",
    applicationDate: "5/1/2024",
    status: "Interviewing",
    industry: "Technology",
    duration: "3 Months",
    paid: "Paid"
  },
  {
    id: 2,
    company: "Data Insights Co.",
    title: "Data Science Intern",
    applicationDate: "4/15/2024",
    status: "Offer Received",
    industry: "Analytics",
    duration: "6 Months",
    paid: "Paid"
  },
  {
    id: 3,
    company: "Green Energy Ltd.",
    title: "Sustainability Analyst Intern",
    applicationDate: "5/10/2024",
    status: "Applied",
    industry: "Energy",
    duration: "3 Months",
    paid: "Unpaid"
  },
  {
    id: 4,
    company: "Innovate Hub",
    title: "UX/UI Design Intern",
    applicationDate: "3/20/2024",
    status: "Accepted",
    industry: "Design",
    duration: "6 Months",
    paid: "Paid"
  },
  {
    id: 5,
    company: "Global Ventures",
    title: "Marketing Intern",
    applicationDate: "4/1/2024",
    status: "Rejected",
    industry: "Marketing",
    duration: "3 Months",
    paid: "Unpaid"
  }
];

const availableInternships = [
  {
    id: 1,
    company: "Tech Solutions Inc.",
    title: "Frontend Developer Intern",
    duration: "3 Months",
    industry: "Technology",
    paid: "Paid"
  },
  {
    id: 2,
    company: "Data Insights Co.",
    title: "Data Science Intern",
    duration: "6 Months",
    industry: "Analytics",
    paid: "Paid"
  },
  {
    id: 3,
    company: "Green Energy Ltd.",
    title: "Sustainability Analyst Intern",
    duration: "3 Months",
    industry: "Energy",
    paid: "Unpaid"
  },
  {
    id: 4,
    company: "Innovate Hub",
    title: "UX/UI Design Intern",
    duration: "6 Months",
    industry: "Design",
    paid: "Paid"
  },
  {
    id: 5,
    company: "Global Ventures",
    title: "Marketing Intern",
    duration: "3 Months",
    industry: "Marketing",
    paid: "Unpaid"
  }
];

function AppliedInternships({ applicationsProp }) {
  // Search/filter state for available internships
  const [search, setSearch] = useState('');
  const [availIndustry, setAvailIndustry] = useState('');
  const [availDuration, setAvailDuration] = useState('');
  const [availPaid, setAvailPaid] = useState(false);
  const [availUnpaid, setAvailUnpaid] = useState(false);
  const [selectedAvailable, setSelectedAvailable] = useState(null);
  const [applyError, setApplyError] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Add New Application form state
  const steps = [
    "Personal Info",
    "Academic Info",
    "Preferences",
    "Availability",
    "Documents",
    "Experience",
    "Declaration"
  ];

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    // 1. Personal Info
    fullName: "",
    studentId: "",
    email: "",
    phone: "",
    nationality: "",
    // 2. Academic Info
    university: "SCAD",
    faculty: "",
    year: "",
    gpa: "",
    courses: [],
    // 3. Preferences
    preferredCompanies: [],
    preferredCountry: "",
    internshipDuration: { start: "", end: "" },
    preferredDepartment: "",
    remote: "",
    // 4. Availability
    availStart: "",
    availEnd: "",
    weeklyHours: 20,
    // 5. Documents
    resume: null,
    transcript: null,
    coverLetter: null,
    // 6. Experience
    prevInternship: "",
    portfolio: "",
    motivation: "",
    skillsToGain: "",
    // 7. Declaration
    agree: false,
    signature: ""
  });

  // Helper for updating fields
  const update = (field, value) => setForm(f => ({ ...f, [field]: value }));

  // Unique values for available internships filters
  const availIndustries = [...new Set(availableInternships.map(i => i.industry))];
  const availDurations = [...new Set(availableInternships.map(i => i.duration))];

  // Filtered available internships
  const filteredAvailable = availableInternships.filter(i => {
    const matchesSearch =
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.company.toLowerCase().includes(search.toLowerCase());
    const matchesIndustry = !availIndustry || i.industry === availIndustry;
    const matchesDuration = !availDuration || i.duration === availDuration;
    const matchesPaid =
      (!availPaid && !availUnpaid) ||
      (availPaid && i.paid === "Paid") ||
      (availUnpaid && i.paid === "Unpaid");
    return matchesSearch && matchesIndustry && matchesDuration && matchesPaid;
  });

  // Filters for applications
  const [industryFilter, setIndustryFilter] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [paidChecked, setPaidChecked] = useState(false);
  const [unpaidChecked, setUnpaidChecked] = useState(false);

  // For demo, use dummyApplications if no prop
  const applications = applicationsProp || dummyApplications;

  // Filter logic
  const filteredApplications = applications.filter(app => {
    const matchesIndustry = !industryFilter || app.industry === industryFilter;
    const matchesDuration = !durationFilter || app.duration === durationFilter;
    const matchesPaid =
      (!paidChecked && !unpaidChecked) ||
      (paidChecked && app.paid === "Paid") ||
      (unpaidChecked && app.paid === "Unpaid");
    return matchesIndustry && matchesDuration && matchesPaid;
  });

  // Unique values for filter dropdowns
  const industries = [...new Set(applications.map(a => a.industry))];
  const durations = [...new Set(applications.map(a => a.duration))];

  // Handler for selecting an internship (only one allowed)
  const handleAvailableSelect = (id) => {
    if (selectedAvailable === id) {
      setSelectedAvailable(null);
      setApplyError('');
    } else {
      setSelectedAvailable(id);
      setApplyError('');
    }
  };

  // Handler for Apply button
  const handleApply = () => {
    if (!selectedAvailable) {
      setApplyError('Please select one internship to apply.');
      return;
    }
    // Prefill form with selected internship
    const selected = filteredAvailable.find(i => i.id === selectedAvailable);
    setForm({
      ...form,
      company: selected.company,
      title: selected.title,
      applicationDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: 'Applied',
      logo: '',
      notes: ''
    });
    setShowModal(true);
    setApplyError('');
  };

  // Handler for modal save
  const handleSaveApplication = () => {
    // Here you would add the new application to your state or backend
    setShowModal(false);
    setSelectedAvailable(null);
    setApplyError('');
    alert('Application saved!');
  };

  // Handler for modal cancel
  const handleCancel = () => {
    setShowModal(false);
    setApplyError('');
  };

  const [internshipSearch, setInternshipSearch] = useState('');
  const [internshipStatus, setInternshipStatus] = useState('all');
  const [selectedCompleted, setSelectedCompleted] = useState(null);

  // Data for "My Internships" table
  const myInternships = [
    {
      id: 1,
      company: "Innovatech Solutions",
      title: "Software Engineer Intern",
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      status: "Internship Complete"
    },
    {
      id: 2,
      company: "FutureAI Corp",
      title: "Machine Learning Intern",
      startDate: "2024-01-15",
      endDate: "2024-05-15",
      status: "Internship Complete"
    },
    {
      id: 3,
      company: "Eco Sustainables",
      title: "Data Analyst Intern",
      startDate: "2024-06-01",
      endDate: "",
      status: "Current Intern"
    },
    {
      id: 4,
      company: "HealthWell Dynamics",
      title: "Frontend Developer Intern",
      startDate: "2024-09-01",
      endDate: "",
      status: "Current Intern"
    }
  ];

  function formatDate(date) {
    if (!date) return "Present";
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  const filteredMyInternships = myInternships.filter((intern) => {
    const matchesSearch =
      (intern.title || '').toLowerCase().includes(internshipSearch.toLowerCase()) ||
      (intern.company || '').toLowerCase().includes(internshipSearch.toLowerCase());
    const matchesStatus =
      internshipStatus === 'all' ||
      (internshipStatus === 'current' && intern.status === 'Current Intern') ||
      (internshipStatus === 'complete' && intern.status === 'Internship Complete');
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{
      background: "#f7fafc",
      minHeight: "100vh",
      padding: "40px 0"
    }}>
      {/* Modal */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(0,0,0,0.18)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{
            background: "#fff",
            borderRadius: 14,
            boxShadow: "0 4px 32px rgba(0,0,0,0.13)",
            width: 480,
            maxWidth: "95vw",
            padding: "32px 32px 24px 32px",
            position: "relative"
          }}>
            <button
              onClick={handleCancel}
              style={{
                position: "absolute",
                right: 18,
                top: 18,
                background: "none",
                border: "none",
                fontSize: 22,
                color: "#888",
                cursor: "pointer"
              }}
              aria-label="Close"
            >×</button>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span role="img" aria-label="edit" style={{ fontSize: 22, color: "#43a047" }}>📝</span>
              <span style={{ fontWeight: 700, fontSize: "1.35rem" }}>Add New Application</span>
            </div>
            <div style={{ color: "#7b8a9a", marginBottom: 18 }}>
              Fill in the details of your new internship application. Click save when you're done.
            </div>
            {/* Progress bar */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {steps.map((s, i) => (
                  <div key={s} style={{
                    flex: 1,
                    height: 6,
                    borderRadius: 3,
                    background: i <= step ? "#43a047" : "#e0e0e0"
                  }} />
                ))}
              </div>
              <div style={{ textAlign: "center", marginTop: 8, fontWeight: 600 }}>{steps[step]}</div>
            </div>
            {/* Multi-step form */}
            <form onSubmit={e => { e.preventDefault(); if (step < steps.length - 1) setStep(step + 1); else handleSaveApplication(); }}>
              {step === 0 && (
                <>
                  <label>Full Name</label>
                  <input value={form.fullName} onChange={e => update("fullName", e.target.value)} required style={{ width: "100%", marginBottom: 12 }} />
                  <label>Student ID</label>
                  <input value={form.studentId} onChange={e => update("studentId", e.target.value)} required style={{ width: "100%", marginBottom: 12 }} />
                  <label>Email (University)</label>
                  <input type="email" value={form.email} onChange={e => update("email", e.target.value)} required style={{ width: "100%", marginBottom: 12 }} />
                  <label>Phone Number</label>
                  <input value={form.phone} onChange={e => update("phone", e.target.value)} required style={{ width: "100%", marginBottom: 12 }} />
                  <label>Nationality</label>
                  <input value={form.nationality} onChange={e => update("nationality", e.target.value)} required style={{ width: "100%", marginBottom: 12 }} />
                </>
              )}
              {step === 1 && (
                <>
                  <label>University</label>
                  <input value={form.university} readOnly style={{ width: "100%", marginBottom: 12 }} />
                  <label>Faculty</label>
                  <input value={form.faculty} onChange={e => update("faculty", e.target.value)} required style={{ width: "100%", marginBottom: 12 }} />
                  <label>Year/Semester</label>
                  <input value={form.year} onChange={e => update("year", e.target.value)} required style={{ width: "100%", marginBottom: 12 }} />
                  <label>GPA</label>
                  <input type="number" step="0.01" value={form.gpa} onChange={e => update("gpa", e.target.value)} required style={{ width: "100%", marginBottom: 12 }} />
                  <label>Relevant Courses Taken</label>
                  <input value={form.courses.join(", ")} onChange={e => update("courses", e.target.value.split(",").map(s => s.trim()))} placeholder="#AI, #WebDev" style={{ width: "100%", marginBottom: 12 }} />
                </>
              )}
              {step === 2 && (
                <>
                  <label>Preferred Companies</label>
                  <input value={form.preferredCompanies.join(", ")} onChange={e => update("preferredCompanies", e.target.value.split(",").map(s => s.trim()))} style={{ width: "100%", marginBottom: 12 }} />
                  <label>Preferred Country</label>
                  <input value={form.preferredCountry} onChange={e => update("preferredCountry", e.target.value)} style={{ width: "100%", marginBottom: 12 }} />
                  <label>Internship Duration</label>
                  <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                    <input type="date" value={form.internshipDuration.start} onChange={e => update("internshipDuration", { ...form.internshipDuration, start: e.target.value })} style={{ flex: 1 }} />
                    <input type="date" value={form.internshipDuration.end} onChange={e => update("internshipDuration", { ...form.internshipDuration, end: e.target.value })} style={{ flex: 1 }} />
                  </div>
                  <label>Preferred Department</label>
                  <input value={form.preferredDepartment} onChange={e => update("preferredDepartment", e.target.value)} style={{ width: "100%", marginBottom: 12 }} />
                  <label>Remote / On-site</label>
                  <select value={form.remote} onChange={e => update("remote", e.target.value)} style={{ width: "100%", marginBottom: 12 }}>
                    <option value="">Select</option>
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </>
              )}
              {step === 3 && (
                <>
                  <label>Availability Start Date</label>
                  <input type="date" value={form.availStart} onChange={e => update("availStart", e.target.value)} style={{ width: "100%", marginBottom: 12 }} />
                  <label>Availability End Date</label>
                  <input type="date" value={form.availEnd} onChange={e => update("availEnd", e.target.value)} style={{ width: "100%", marginBottom: 12 }} />
                  <label>Weekly Availability (hours)</label>
                  <input type="number" min={1} max={40} value={form.weeklyHours} onChange={e => update("weeklyHours", e.target.value)} style={{ width: "100%", marginBottom: 12 }} />
                </>
              )}
              {step === 4 && (
                <>
                  <label>Upload Resume (PDF/Doc)</label>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={e => update("resume", e.target.files[0])} style={{ width: "100%", marginBottom: 12 }} />
                  <label>Upload Transcript (optional)</label>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={e => update("transcript", e.target.files[0])} style={{ width: "100%", marginBottom: 12 }} />
                  <label>Upload Cover Letter (optional)</label>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={e => update("coverLetter", e.target.files[0])} style={{ width: "100%", marginBottom: 12 }} />
                </>
              )}
              {step === 5 && (
                <>
                  <label>Previous Internship Experience</label>
                  <textarea value={form.prevInternship} onChange={e => update("prevInternship", e.target.value)} style={{ width: "100%", marginBottom: 12 }} />
                  <label>Personal Projects or Portfolios</label>
                  <input value={form.portfolio} onChange={e => update("portfolio", e.target.value)} placeholder="https://..." style={{ width: "100%", marginBottom: 12 }} />
                  <label>Why do you want this internship?</label>
                  <textarea value={form.motivation} onChange={e => update("motivation", e.target.value)} style={{ width: "100%", marginBottom: 12 }} />
                  <label>What skills do you hope to gain?</label>
                  <textarea value={form.skillsToGain} onChange={e => update("skillsToGain", e.target.value)} style={{ width: "100%", marginBottom: 12 }} />
                </>
              )}
              {step === 6 && (
                <>
                  <label>
                    <input type="checkbox" checked={form.agree} onChange={e => update("agree", e.target.checked)} required />
                    {" "}I agree to the Terms & Conditions
                  </label>
                  <label>Signature (type your full name)</label>
                  <input value={form.signature} onChange={e => update("signature", e.target.value)} required style={{ width: "100%", marginBottom: 12 }} />
                </>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
                {step > 0 && (
                  <button type="button" onClick={() => setStep(step - 1)} style={{ padding: "10px 24px" }}>
                    Back
                  </button>
                )}
                <button type="submit" style={{
                  background: "#43a047",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 24px",
                  fontWeight: 600,
                  fontSize: "1.08rem",
                  cursor: "pointer"
                }}>
                  {step === steps.length - 1 ? "Submit Application" : "Next"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Available Internships Listing */}
      <div style={{
        maxWidth: 900,
        margin: "0 auto",
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 18px rgba(56,211,159,0.07)",
        padding: "32px 28px",
        marginBottom: 36,
        position: "relative"
      }}>
        <div style={{ fontWeight: 700, fontSize: "2rem", marginBottom: 4 }}>Available Internships</div>
        <div style={{ color: "#7b8a9a", fontSize: "1.13rem", marginBottom: 24 }}>
          View and search all available internships in SCAD.
        </div>
        <input
          type="text"
          placeholder="Search by job title or company name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #e0e0e0",
            marginBottom: 18,
            fontSize: "1.08rem"
          }}
        />
        <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
          <select value={availIndustry} onChange={e => setAvailIndustry(e.target.value)} style={{ padding: 8, borderRadius: 8, border: '1px solid #e0e0e0' }}>
            <option value="">All Industries</option>
            {availIndustries.map(ind => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
          <select value={availDuration} onChange={e => setAvailDuration(e.target.value)} style={{ padding: 8, borderRadius: 8, border: '1px solid #e0e0e0' }}>
            <option value="">All Durations</option>
            {availDurations.map(dur => (
              <option key={dur} value={dur}>{dur}</option>
            ))}
          </select>
          <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <input
              type="checkbox"
              checked={availPaid}
              onChange={() => setAvailPaid(v => !v)}
              style={{ accentColor: "#43a047" }}
            />
            <span>Paid</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <input
              type="checkbox"
              checked={availUnpaid}
              onChange={() => setAvailUnpaid(v => !v)}
              style={{ accentColor: "#43a047" }}
            />
            <span>Unpaid</span>
          </label>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "40px 2fr 2fr 1fr",
          color: "#7b8a9a",
          fontWeight: 600,
          fontSize: "1.08rem",
          borderBottom: "1px solid #e5e7eb",
          paddingBottom: 10,
          marginBottom: 10
        }}>
          <div></div>
          <div>Company</div>
          <div>Job Title</div>
          <div>Duration</div>
        </div>
        {filteredAvailable.map((intern) => (
          <label key={intern.id} style={{
            display: "grid",
            gridTemplateColumns: "40px 2fr 2fr 1fr",
            alignItems: "center",
            borderBottom: "1px solid #f1f1f1",
            padding: "14px 0",
            cursor: "pointer",
            gap: 0
          }}>
            <input
              type="checkbox"
              checked={selectedAvailable === intern.id}
              onChange={() => handleAvailableSelect(intern.id)}
              style={{
                width: 18,
                height: 18,
                accentColor: "#43a047",
                marginRight: 0
              }}
              tabIndex={0}
            />
            <div style={{ fontWeight: 600, color: "#222" }}>{intern.company}</div>
            <div style={{ color: "#222" }}>{intern.title}</div>
            <div style={{ color: "#222" }}>{intern.duration}</div>
          </label>
        ))}
        <div style={{ color: "#7b8a9a", fontSize: "1.01rem", marginTop: 18 }}>
          Showing {filteredAvailable.length} internship(s).
        </div>
        {/* Apply button and error message */}
        {selectedAvailable && (
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
            <button
              onClick={handleApply}
              style={{
                background: "#43a047",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "12px 32px",
                fontWeight: 600,
                fontSize: "1.13rem",
                cursor: "pointer"
              }}
            >
              Apply
            </button>
          </div>
        )}
        {applyError && (
          <div style={{ color: "#e53935", marginTop: 12, textAlign: "right", fontWeight: 500 }}>
            {applyError}
          </div>
        )}
      </div>
      {/* Applications Box */}
      <div style={{
        maxWidth: 900,
        margin: "0 auto",
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 18px rgba(56,211,159,0.07)",
        padding: "32px 28px"
      }}>
        <div style={{ fontWeight: 700, fontSize: "2rem", marginBottom: 4 }}>My Applications</div>
        <div style={{ color: "#7b8a9a", fontSize: "1.13rem", marginBottom: 28 }}>
          A detailed list of your internship applications.
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 2fr 1.2fr 1fr",
          color: "#7b8a9a",
          fontWeight: 600,
          fontSize: "1.08rem",
          borderBottom: "1px solid #e5e7eb",
          paddingBottom: 10,
          marginBottom: 10
        }}>
          <div>Company</div>
          <div>Job Title</div>
          <div>Application Date</div>
          <div>Status</div>
        </div>
        {filteredApplications.map((app, idx) => {
          const status = STATUS_STYLES[app.status] || STATUS_STYLES.Applied;
          return (
            <div key={app.id || idx} style={{
              display: "grid",
              gridTemplateColumns: "2fr 2fr 1.2fr 1fr",
              alignItems: "center",
              borderBottom: "1px solid #f1f1f1",
              padding: "14px 0"
            }}>
              <div style={{ fontWeight: 600, color: "#222" }}>{app.company}</div>
              <div style={{ color: "#222" }}>{app.title}</div>
              <div style={{ color: "#222" }}>{app.applicationDate}</div>
              <div>
                <span style={{
                  background: status.background,
                  color: status.color,
                  borderRadius: 16,
                  padding: "6px 18px",
                  fontWeight: 600,
                  fontSize: "1.01rem",
                  display: "inline-block",
                  border: status.border || "none"
                }}>
                  {app.status}
                </span>
              </div>
            </div>
          );
        })}
        <div style={{ color: "#7b8a9a", fontSize: "1.01rem", marginTop: 18 }}>
          Showing {filteredApplications.length} application(s).
        </div>
      </div>
      {/* My Internships Table Section */}
      <div style={{
        marginTop: 32,
        background: "#f7fafc",
        borderRadius: 16,
        padding: "24px 0"
      }}>
        <div style={{
          maxWidth: 900,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 18px rgba(56,211,159,0.07)",
          padding: "32px 28px"
        }}>
          <div style={{ fontWeight: 700, fontSize: "2rem", marginBottom: 4 }}>My Internships</div>
          <div style={{ color: "#7b8a9a", fontSize: "1.13rem", marginBottom: 24 }}>
            Search and filter your internship records.
          </div>
          <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
            <input
              type="text"
              placeholder="Search by job title or company name"
              value={internshipSearch}
              onChange={e => setInternshipSearch(e.target.value)}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: 6,
                border: '1px solid #ccc',
                fontSize: '1rem'
              }}
            />
            <select
              value={internshipStatus}
              onChange={e => setInternshipStatus(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: 6,
                border: '1px solid #ccc',
                fontSize: '1rem'
              }}
            >
              <option value="all">All</option>
              <option value="current">Current Intern</option>
              <option value="complete">Internship Complete</option>
            </select>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 2fr 1.5fr 1.2fr",
            color: "#7b8a9a",
            fontWeight: 600,
            fontSize: "1.08rem",
            borderBottom: "1px solid #e5e7eb",
            paddingBottom: 10,
            marginBottom: 10
          }}>
            <div>Company</div>
            <div>Job Title</div>
            <div>Dates</div>
            <div>Status</div>
          </div>
          {filteredMyInternships.length === 0 ? (
            <div style={{ textAlign: "center", padding: "24px 0", color: "#888" }}>No internships found.</div>
          ) : (
            filteredMyInternships.map((intern) => {
              const isCompleted = intern.status === "Internship Complete";
              return (
                <div
                  key={intern.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 2fr 1.5fr 1.2fr",
                    alignItems: "center",
                    borderBottom: "1px solid #f1f1f1",
                    padding: "14px 0",
                    cursor: isCompleted ? "pointer" : "not-allowed",
                    opacity: isCompleted ? 1 : 0.6,
                    background: selectedCompleted === intern.id ? "#e6f9ee" : "transparent"
                  }}
                  onClick={() => {
                    if (isCompleted) setSelectedCompleted(intern.id);
                  }}
                  tabIndex={isCompleted ? 0 : -1}
                  aria-disabled={!isCompleted}
                >
                  <div style={{ fontWeight: 600, color: "#222" }}>{intern.company}</div>
                  <div style={{ color: "#222" }}>{intern.title}</div>
                  <div style={{ color: "#222" }}>
                    {formatDate(intern.startDate)} - {formatDate(intern.endDate)}
                  </div>
                  <div>
                    <span style={{
                      background: intern.status === "Current Intern" ? "#eaf1fb" : "#e6f9ee",
                      color: intern.status === "Current Intern" ? "#3b82f6" : "#16a34a",
                      borderRadius: 16,
                      padding: "6px 18px",
                      fontWeight: 600,
                      fontSize: "1.01rem",
                      display: "inline-block"
                    }}>
                      {intern.status}
                    </span>
                  </div>
                </div>
              );
            })
          )}
          {/* Show details for selected completed internship */}
          {selectedCompleted && (() => {
            const selected = myInternships.find(i => i.id === selectedCompleted);
            if (!selected) return null;
            return (
              <div style={{
                marginTop: 24,
                background: "#f8fff6",
                border: "1px solid #b6e2c7",
                borderRadius: 12,
                padding: 24,
                maxWidth: 700,
                marginLeft: "auto",
                marginRight: "auto"
              }}>
                <h3 style={{ marginTop: 0, color: "#16a34a" }}>Completed Internship Details</h3>
                <div><b>Company:</b> {selected.company}</div>
                <div><b>Job Title:</b> {selected.title}</div>
                <div><b>Start Date:</b> {formatDate(selected.startDate)}</div>
                <div><b>End Date:</b> {formatDate(selected.endDate)}</div>
                <div><b>Status:</b> {selected.status}</div>
                {/* Add more details here if available */}
                <button
                  style={{
                    marginTop: 18,
                    background: "#43a047",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "8px 24px",
                    fontWeight: 600,
                    fontSize: "1rem",
                    cursor: "pointer"
                  }}
                  onClick={() => setSelectedCompleted(null)}
                >
                  Close
                </button>
              </div>
            );
          })()}
          <div style={{ color: "#7b8a9a", fontSize: "1.01rem", marginTop: 18 }}>
            Showing {filteredMyInternships.length} internship record(s).
          </div>
        </div>
      </div>
      {/* End My Internships Table Section */}
    </div>
  );
}

export default AppliedInternships;