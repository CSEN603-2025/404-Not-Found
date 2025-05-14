import React from 'react';

function EvaluateCompanies({ companyEvaluations, handleAddEvaluation, handleEditEvaluation, handleDeleteEvaluation, handleSaveEvaluation, editingEvaluation }) {
  return (
    <div className="evaluation-list-container">
      <h3>Evaluate Companies</h3>
      <button className="add-evaluation-button" onClick={handleAddEvaluation}>Add New Evaluation</button>
      <ul className="evaluation-list">
        {companyEvaluations.map((evaluation) => (
          <li key={evaluation.id} className="evaluation-item">
            {editingEvaluation === evaluation.id ? (
              <div className="evaluation-edit-form">
                <input type="text" placeholder="Company Name" defaultValue={evaluation.companyName} />
                <button onClick={() => handleSaveEvaluation(evaluation.id, evaluation)}>Save</button>
              </div>
            ) : (
              <div className="evaluation-display">
                <h4>{evaluation.companyName}</h4>
                <button onClick={() => handleEditEvaluation(evaluation.id)}>Edit</button>
                <button onClick={() => handleDeleteEvaluation(evaluation.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EvaluateCompanies;