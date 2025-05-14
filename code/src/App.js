import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SelectType from './pages/SelectType';
import Login from './pages/Login';
import RegisterCompany from './pages/RegisterCompany';
import ScadOfficePage from './pages/ScadOfficePage';
import SuccessC from './pages/SuccessC';
import CompanyDash from './pages/CompanyDash';
import Student from './pages/Student-Pages/student';



import InternshipStatusPage from './pages/InternshipStatusPage';
import DecisionTable from './pages/DecisionTable';
import EvaluationListPage from './pages/EvaluationListPage';
import EvaluationFormPage from './pages/EvaluationFormPage';
import JobPostPage from './pages/JobPostPage';
import FacultyDash from './pages/FacultyDash';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SelectType />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register-company" element={<RegisterCompany />} />
      <Route path="/scad-office" element={<ScadOfficePage />} />
      <Route path="/success" element={<SuccessC />} />
      <Route path="/company-dashboard" element={<CompanyDash />} />
      <Route path="/student" element={<Student />} />
      <Route path="/decision-table" element={<DecisionTable />} />
      <Route path="/internship-status" element={<InternshipStatusPage />} />
      <Route path="/evaluation-list" element={<EvaluationListPage />} />
      <Route path="/evaluation-form" element={<EvaluationFormPage />} />
      <Route path="/evaluation-form/:id" element={<EvaluationFormPage />} />
      <Route path="/job-posts" element={<JobPostPage />} />

      <Route path = "/student" element={<Student />} />

      
      <Route path="/decision-table" element={<DecisionTable />} />
      <Route path="/internship-status" element={<InternshipStatusPage />} />
       <Route path="/evaluation-list" element={<EvaluationListPage />} />
        <Route path="/evaluation-form" element={<EvaluationFormPage />} />
        <Route path="/evaluation-form/:id" element={<EvaluationFormPage />} />
      <Route path="/job-posts" element={<JobPostPage />} />   
      <Route path="/faculty-dashboard" element={<FacultyDash />} />

    </Routes>
  );
}

export default App;
