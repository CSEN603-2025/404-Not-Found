import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SelectType from './pages/SelectType';
import Login from './pages/Login';
import RegisterCompany from './pages/RegisterCompany';
import ScadOfficePage from './pages/ScadOfficePage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SelectType />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register-company" element={<RegisterCompany />} />
    </Routes>
  );
}

export default App;