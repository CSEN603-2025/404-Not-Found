import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SelectType from './pages/SelectType';
import Login from './pages/Login';
import RegisterCompany from './pages/RegisterCompany';
import ScadOfficePage from './pages/ScadOfficePage';
import SuccessC from './pages/SuccessC';
import CompanyDash from './pages/CompanyDash';
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
      
    </Routes>
  );
}

export default App;