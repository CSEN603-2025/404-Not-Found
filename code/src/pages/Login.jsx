import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import avatar from '../assets/avatar.svg';
import bg from '../assets/bg.svg';
import wave from '../assets/wave.png';

function Login() {
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleFocus = (setter) => () => setter(true);
  const handleBlur = (setter, value) => () => {
    if (!value) setter(false);
  };

const handleSubmit = (e) => {
  e.preventDefault();

  // SCAD Office Login
  if (username === 'scad' && password === 'admin') {
    localStorage.setItem('userType', 'scad');
    navigate('/scad-office');
  } 
  if (username === 'pro' && password === 'admin') {
    localStorage.setItem('userType', 'pro');
    navigate('/pro'); // Redirect to the student dashboard
  } 
  // Company Login
  else if (username === 'company' && password === 'admin') {
    localStorage.setItem('userType', 'company');
    navigate('/company-dashboard'); // Redirect to the company dashboard
  } 
  // Student Login
  else if (username === 'student' && password === 'admin') {
    localStorage.setItem('userType', 'student');
    navigate('/student'); // Redirect to the student page
  } 
  // Faculty Login
  else if (username === 'faculty' && password === 'admin') {
    localStorage.setItem('userType', 'faculty');
    navigate('/faculty-dashboard'); // Make sure this route exists
  }
  // Invalid Credentials
  else {
    alert('Invalid username or password');
  }
};

  return (
    <div className="relative min-h-screen bg-gray-100 font-poppins overflow-hidden">
      <img src={wave} className="wave" alt="Wave Background" />
      <div className="container">
        <div className="img">
          <img src={bg} alt="Background Illustration" />
        </div>
        <div className="login-content">
          <div className="form-wrapper">
            <img src={avatar} alt="Avatar" className="avatar" />
            <h2 className="title">Welcome</h2>

            <div className={`input-div one ${usernameFocused ? 'focus' : ''}`}>
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>Username</h5>
                <input
                  type="text"
                  className="input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={handleFocus(setUsernameFocused)}
                  onBlur={handleBlur(setUsernameFocused, username)}
                />
              </div>
            </div>

            <div className={`input-div pass ${passwordFocused ? 'focus' : ''}`}>
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <h5>Password</h5>
                <input
                  type="password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={handleFocus(setPasswordFocused)}
                  onBlur={handleBlur(setPasswordFocused, password)}
                />
              </div>
            </div>

            <button
              className="forgot-password"
              onClick={() => {
                // TODO: add forgot password logic here
              }}
            >
              Forgot Password?
            </button>

            <button onClick={handleSubmit} className="btn">
              Login
            </button>

            {/* Register link below */}
            <p className="register-link">
              For company {' '}
              <span
                className="underline-link"
                onClick={() => navigate('/register-company')}
              >
                Register here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
