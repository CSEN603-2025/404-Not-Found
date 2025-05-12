"use client";

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // For navigation and state
import "../styles/EvaluationFormPage.css"; // CSS for styling

export default function EvaluationFormPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    id: null,
    studentName: "",
    performance: "",
    comments: "",
  });

  useEffect(() => {
    if (location.state) {
      setFormData(location.state);
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    navigate("/evaluation-list"); // Redirect back to the list page
  };

  return (
    <div className="evaluation-form-container">
      <h1>{formData.id ? "Edit Evaluation" : "Add New Evaluation"}</h1>
      <form onSubmit={handleSubmit} className="evaluation-form">
        <label>
          Student Name:
          <input
            type="text"
            value={formData.studentName}
            onChange={(e) =>
              setFormData({ ...formData, studentName: e.target.value })
            }
            required
          />
        </label>
        <label>
          Performance:
          <select
            value={formData.performance}
            onChange={(e) =>
              setFormData({ ...formData, performance: e.target.value })
            }
            required
          >
            <option value="">Select</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Average">Average</option>
            <option value="Poor">Poor</option>
          </select>
        </label>
        <label>
          Comments:
          <textarea
            value={formData.comments}
            onChange={(e) =>
              setFormData({ ...formData, comments: e.target.value })
            }
            required
          />
        </label>
        <div className="form-actions">
          <button type="submit" className="submit-button">
            Save
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/evaluation-list")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}