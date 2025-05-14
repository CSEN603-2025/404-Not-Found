import React, { useState } from 'react';
import './EvaluateCompanies.css';

function EvaluateCompanies() {
  const [companyName, setCompanyName] = useState('');
  const [evaluation, setEvaluation] = useState('');
  const [recommend, setRecommend] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [role, setRole] = useState('');
  const [locationType, setLocationType] = useState('');
  const [ratings, setRatings] = useState({
    workEnv: 0,
    learning: 0,
    mentorship: 0,
    workLife: 0,
    compensation: 0,
    technical: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLastUpdated(new Date());
    setSubmitted(true);
  };

  const handleEdit = () => {
    setSubmitted(false);
  };

  const handleDelete = () => {
    setCompanyName('');
    setEvaluation('');
    setRecommend('');
    setStartDate('');
    setEndDate('');
    setRole('');
    setLocationType('');
    setRatings({
      workEnv: 0,
      learning: 0,
      mentorship: 0,
      workLife: 0,
      compensation: 0,
      technical: 0,
    });
    setSubmitted(false);
    setLastUpdated(null);
  };

  const handleRatingChange = (field, value) => {
    setRatings((prev) => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="ec-review-container">
        <h2 className="ec-review-title" style={{ color: "#43a047" }}>{companyName || "Company"}</h2>
        <div className="ec-review-desc">
          Your submitted evaluation for this company.
        </div>
        <div style={{ fontWeight: 600, marginTop: 24, marginBottom: 8 }}>Evaluation:</div>
        <div style={{ marginBottom: 24 }}>{evaluation}</div>
        <hr />
        <div style={{ fontWeight: 600, marginTop: 24, marginBottom: 8 }}>Recommendation:</div>
        <div style={{
          background: recommend === "yes" ? "#defbe6" : "#ffebee",
          color: recommend === "yes" ? "#218838" : "#c62828",
          borderRadius: 8,
          padding: "16px 20px",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 24
        }}>
          <span style={{ fontSize: 22 }}>
            {recommend === "yes" ? "👍" : "👎"}
          </span>
          {recommend === "yes"
            ? "Recommended to other students"
            : "Not recommended to other students"}
        </div>
        <hr />
        <div style={{ color: "#4d6a7a", fontSize: "1rem", marginTop: 18, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>📅</span>
          Last updated: {lastUpdated && lastUpdated.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
          <button
            className="ec-edit-btn"
            style={{
              background: "#f6f7fa",
              color: "#222",
              border: "none",
              borderRadius: 8,
              padding: "12px 28px",
              fontWeight: 500,
              fontSize: "1.08rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              borderBottom: "2px solid #e0e0e0"
            }}
            onClick={handleEdit}
          >
            <span style={{ fontSize: 18 }}>✏️</span>
            Edit Review
          </button>
          <button
            className="ec-delete-btn"
            style={{
              background: "#e53935",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "12px 28px",
              fontWeight: 500,
              fontSize: "1.08rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8
            }}
            onClick={handleDelete}
          >
            <span style={{ fontSize: 18 }}>🗑️</span>
            Delete Review
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ec-review-container">
      <h2 className="ec-review-title">Submit Your Review</h2>
      <div className="ec-review-desc">
        Share your experience with the company. Only one review is allowed.
      </div>
      <form onSubmit={handleSubmit}>
        <div className="ec-form-group">
          <label className="ec-form-label">
            Company Name
          </label>
          <input
            type="text"
            placeholder="e.g., Acme Corp"
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            className="ec-form-input"
            required
          />
        </div>
        <div className="ec-form-group" style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <label className="ec-form-label">Internship/Training Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="ec-form-input"
              placeholder="Pick a date"
              required
            />
          </div>
          <div style={{ flex: 1 }}>
            <label className="ec-form-label">Internship/Training End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="ec-form-input"
              placeholder="Pick a date"
              required
            />
          </div>
        </div>
        <div className="ec-form-group">
          <label className="ec-form-label">Department or Role</label>
          <input
            type="text"
            placeholder="e.g., Software Engineering Intern, Marketing Trainee"
            value={role}
            onChange={e => setRole(e.target.value)}
            className="ec-form-input"
            required
          />
        </div>
        <div className="ec-form-group">
          <label className="ec-form-label">Location Type</label>
          <select
            value={locationType}
            onChange={e => setLocationType(e.target.value)}
            className="ec-form-input"
            required
          >
            <option value="">Select location type</option>
            <option value="onsite">Onsite</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <div className="ec-rating-box">
          <h2 className="ec-rating-title">Rate Your Experience (1-5 Stars)</h2>
          <div className="ec-rating-grid">
            <div className="ec-rating-row">
              <span className="ec-rating-label">Work Environment</span>
              <div className="ec-rating-options">
                {[1,2,3,4,5].map(num => (
                  <label key={num} className="ec-rating-num">
                    <input
                      type="radio"
                      className="ec-rating-radio"
                      name="workEnv"
                      value={num}
                      checked={ratings.workEnv === num}
                      onChange={() => handleRatingChange("workEnv", num)}
                    />{num}
                  </label>
                ))}
              </div>
            </div>
            <div className="ec-rating-row">
              <span className="ec-rating-label">Learning Experience</span>
              <div className="ec-rating-options">
                {[1,2,3,4,5].map(num => (
                  <label key={num} className="ec-rating-num">
                    <input
                      type="radio"
                      className="ec-rating-radio"
                      name="learning"
                      value={num}
                      checked={ratings.learning === num}
                      onChange={() => handleRatingChange("learning", num)}
                    />{num}
                  </label>
                ))}
              </div>
            </div>
            <div className="ec-rating-row">
              <span className="ec-rating-label">Mentorship/Support</span>
              <div className="ec-rating-options">
                {[1,2,3,4,5].map(num => (
                  <label key={num} className="ec-rating-num">
                    <input
                      type="radio"
                      className="ec-rating-radio"
                      name="mentorship"
                      value={num}
                      checked={ratings.mentorship === num}
                      onChange={() => handleRatingChange("mentorship", num)}
                    />{num}
                  </label>
                ))}
              </div>
            </div>
            <div className="ec-rating-row">
              <span className="ec-rating-label">Work-Life Balance</span>
              <div className="ec-rating-options">
                {[1,2,3,4,5].map(num => (
                  <label key={num} className="ec-rating-num">
                    <input
                      type="radio"
                      className="ec-rating-radio"
                      name="workLife"
                      value={num}
                      checked={ratings.workLife === num}
                      onChange={() => handleRatingChange("workLife", num)}
                    />{num}
                  </label>
                ))}
              </div>
            </div>
            <div className="ec-rating-row">
              <span className="ec-rating-label">Compensation (if any)</span>
              <div className="ec-rating-options">
                {[1,2,3,4,5].map(num => (
                  <label key={num} className="ec-rating-num">
                    <input
                      type="radio"
                      className="ec-rating-radio"
                      name="compensation"
                      value={num}
                      checked={ratings.compensation === num}
                      onChange={() => handleRatingChange("compensation", num)}
                    />{num}
                  </label>
                ))}
              </div>
            </div>
            <div className="ec-rating-row">
              <span className="ec-rating-label">Technical Exposure</span>
              <div className="ec-rating-options">
                {[1,2,3,4,5].map(num => (
                  <label key={num} className="ec-rating-num">
                    <input
                      type="radio"
                      className="ec-rating-radio"
                      name="technical"
                      value={num}
                      checked={ratings.technical === num}
                      onChange={() => handleRatingChange("technical", num)}
                    />{num}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="ec-form-group">
          <label className="ec-form-label">
            Your Evaluation
          </label>
          <textarea
            placeholder="Share your thoughts about the company..."
            value={evaluation}
            onChange={e => setEvaluation(e.target.value)}
            className="ec-form-textarea"
            required
          />
        </div>
        <div className="ec-form-group">
          <label className="ec-form-label" style={{ marginBottom: 12 }}>
            Would you recommend this company to other students?
          </label>
          <div className="ec-radio-group">
            <label className="ec-radio-label">
              <input
                type="radio"
                name="recommend"
                value="yes"
                checked={recommend === "yes"}
                onChange={() => setRecommend("yes")}
                required
                style={{ accentColor: "#43a047" }}
              />
              Yes, I recommend it
            </label>
            <label className="ec-radio-label">
              <input
                type="radio"
                name="recommend"
                value="no"
                checked={recommend === "no"}
                onChange={() => setRecommend("no")}
                required
                style={{ accentColor: "#43a047" }}
              />
              No, I don't recommend it
            </label>
          </div>
        </div>
        <div className="ec-submit-row">
          <button
            type="submit"
            className="ec-submit-btn"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
}

export default EvaluateCompanies;