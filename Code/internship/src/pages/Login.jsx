
import React from 'react';
import { useParams } from 'react-router-dom';

const Login = () => {
  const { role } = useParams(); // role = 'student' | 'company' | 'scad'

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Login as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
      {/* Render shared login form fields here */}
      <input type="email" placeholder="Email" /><br /><br />
      <input type="password" placeholder="Password" /><br /><br />
      <button>Login</button>
    </div>
  );
};

export default Login;
