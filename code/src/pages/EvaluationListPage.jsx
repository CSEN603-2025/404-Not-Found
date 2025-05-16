"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { ArrowLeft } from "lucide-react"; // Or use any left arrow icon you prefer
import "../styles/EvaluationListPage.css"; // CSS for styling

export default function EvaluationListPage() {
  const [evaluations, setEvaluations] = useState([
    {
      id: 1,
      studentName: "John Doe",
      performance: "Excellent",
      comments: "Great work during the internship.",
    },
    {
      id: 2,
      studentName: "Jane Smith",
      performance: "Good",
      comments: "Showed consistent improvement.",
    },
  ]);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    setEvaluations((prev) => prev.filter((evaluation) => evaluation.id !== id));
  };

  return (
    <div className="evaluation-list-container">
      <h1>Evaluation List</h1>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <button
          className="back-button"
          onClick={() => navigate("/company-dashboard")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 13,
            background: "#e6faf3",
            color: "#16a34a",
            border: "1.5px solid #b6f0d3",
            borderRadius: 8,
            padding: "8px 18px",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: "pointer"
          }}
        >
          <ArrowLeft size={18} /> Back
        </button>
        <button
          className="add-evaluation-button"
          onClick={() => navigate("/evaluation-form")}
        >
          Add New Evaluation
        </button>
      </div>
      <ul className="evaluation-list">
        {evaluations.map((evaluation) => (
          <li key={evaluation.id} className="evaluation-item">
            <h3>{evaluation.studentName}</h3>
            <p>Performance: {evaluation.performance}</p>
            <p>Comments: {evaluation.comments}</p>
            <div className="evaluation-actions">
              <button
                className="edit-button"
                onClick={() => navigate(`/evaluation-form/${evaluation.id}`, { state: evaluation })}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(evaluation.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}