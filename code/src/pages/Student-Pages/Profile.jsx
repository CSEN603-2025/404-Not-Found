import React, { useState } from 'react';

function Profile({ uploadedFiles, setUploadedFiles, selectedMajor, setSelectedMajor, selectedSemester, setSelectedSemester }) {
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  return (
    <form className="profile-form" onSubmit={handleProfileSubmit}>
      {/* Profile form fields */}
      <div className="form-group">
        <label htmlFor="jobInterests">Job Interests</label>
        <input type="text" id="jobInterests" name="jobInterests" placeholder="Describe your job interests..." />
      </div>
      <div className="form-group">
        <label htmlFor="extraDocuments">Upload Extra Documents</label>
        <input type="file" id="extraDocuments" name="extraDocuments" multiple onChange={handleFileUpload} />
      </div>
      <div className="form-group">
        <label htmlFor="majorSelect">Select Major</label>
        <select id="majorSelect" value={selectedMajor} onChange={(e) => setSelectedMajor(e.target.value)}>
          <option value="">-- Select a Major --</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="semesterInput">Enter Semester</label>
        <input type="number" id="semesterInput" value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)} min="1" max="8" placeholder="Enter semester number" />
      </div>
      <button type="submit" className="profile-submit-button">Update Profile</button>
    </form>
  );
}

export default Profile;