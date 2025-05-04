
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const SelectLoginType = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Choose your login type</h1>
      <Button label="Student" onClick={() => navigate('/login/student')} />
      <Button label="Company" onClick={() => navigate('/login/company')} style={{ margin: '10px' }} />
      <Button label="SCAD Office" onClick={() => navigate('/login/scad')} />
    </div>
  );
};

export default SelectLoginType;
