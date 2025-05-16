import React, { useState } from 'react';
import './Courses.css'; // Import the CSS file for styling

function Courses() {
  const [selectedMajor, setSelectedMajor] = useState('All Majors'); // Default to "All Majors"
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCredits, setFilterCredits] = useState('Any Credits');
  const [filterInstructor, setFilterInstructor] = useState('Any Instructor');
  const [selectedCourse, setSelectedCourse] = useState(null); // State for selected course

  const courses = [
    {
      id: 'CS101',
      title: 'Introduction to Programming',
      credits: 3,
      description:
        'A foundational course on programming principles using Python. Covers variables, control flow, data structures, and algorithms.',
      instructor: 'Dr. Ada Lovelace',
      instructorEmail: 'ada@example.com',
      instructorOffice: 'Logic Lane 101',
      schedule: 'Monday, 09:00 - 10:30 @ Room A101',
      prerequisites: [],
      Major: 'AI',
      semester: 1, // <-- Add this line
    },
    {
      id: 'CS201',
      title: 'Data Structures and Algorithms',
      credits: 4,
      description:
        'In-depth study of data structures like trees, graphs, and hash tables, along with algorithm analysis.',
      instructor: 'Prof. Alan Turing',
      instructorEmail: 'alan@example.com',
      instructorOffice: 'Logic Lane 202',
      schedule: 'Tuesday, 10:00 - 11:30 @ Room B202\nThursday, 10:00 - 11:30 @ Room B202',
      prerequisites: ['CS101: Introduction to Programming'],
      Major: 'Computer Science',
      semester: 2, // <-- Add this line
    },
    {
      id: 'CS202',
      title: 'Advanced Algorithms',
      credits: 3,
      description:
        'In-depth study of data structures like trees, graphs, and hash tables, along with algorithm analysis.',
      instructor: 'Prof. Alan Turing',
      instructorEmail: 'alan@example.com',
      instructorOffice: 'Logic Lane 202',
      schedule: 'Tuesday, 10:00 - 11:30 @ Room B202\nThursday, 10:00 - 11:30 @ Room B202',
      prerequisites: ['CS101: Introduction to Programming'],
      Major: 'Computer Science',
      semester: 3, // <-- Add this line
    },
    {
      id: 'MATH101',
      title: 'Calculus I',
      credits: 4,
      description:
        'An introduction to differential and integral calculus. Topics include limits, derivatives, and integrals.',
      instructor: 'Prof. Alan Turing',
      instructorEmail: 'alan@example.com',
      instructorOffice: 'Logic Lane 202',
      schedule: 'Tuesday, 10:00 - 11:30 @ Room B202\nThursday, 10:00 - 11:30 @ Room B202',
      prerequisites: [],
      Major: 'Mathematics',
      semester: 1, // <-- Add this line
    },
  ];

  // Filtered courses based on search, credits, instructor, and major
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCredits =
      filterCredits === 'Any Credits' || course.credits === parseInt(filterCredits);
    const matchesInstructor =
      filterInstructor === 'Any Instructor' || course.instructor === filterInstructor;
    const matchesMajor =
      selectedMajor === 'All Majors' || course.Major === selectedMajor;

    return matchesSearch && matchesCredits && matchesInstructor && matchesMajor;
  });

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {!selectedCourse ? (
        <>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '16px' }}>
            📘 Explore Courses
          </h1>

          {/* Major Selection */}
          <div style={{ marginBottom: '24px' }}>
            <select
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
                background: '#f6f7fa',
              }}
            >
              <option>All Majors</option>
              <option>Computer Science</option>
              <option>Mathematics</option>
              <option>AI</option>
            </select>
          </div>

          {/* Filters */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '24px',
            }}
          >
            <input
              type="text"
              placeholder="Search by code or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
              }}
            />
            <select
              value={filterCredits}
              onChange={(e) => setFilterCredits(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
              }}
            >
              <option>Any Credits</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
            <select
              value={filterInstructor}
              onChange={(e) => setFilterInstructor(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
              }}
            >
              <option>Any Instructor</option>
              <option>Dr. Ada Lovelace</option>
              <option>Prof. Alan Turing</option>
            </select>
          </div>

          {/* Course Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px',
            }}
          >
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="course-card" // Add a class for styling
              >
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#007bff' }}>
                  {course.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#6c757d', marginBottom: '8px' }}>
                  <strong>{course.id}</strong> • {course.credits} Credits • Semester {course.semester}
                </p>
                <p style={{ fontSize: '0.9rem', color: '#4d6a7a', marginBottom: '8px' }}>
                  {course.description}
                </p>
                <button
                  onClick={() => setSelectedCourse(course)}
                  style={{
                    padding: '8px 16px',
                    background: '#43a047',
                    color: '#fff',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  View Details →
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={{ padding: '24px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#007bff', marginBottom: '16px' }}>
            {selectedCourse.title}
          </h2>
          <p style={{ fontSize: '1rem', color: '#6c757d', marginBottom: '16px' }}>
            <strong>{selectedCourse.id}</strong> • {selectedCourse.credits} Credits • Semester {selectedCourse.semester}
          </p>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>📄 Description</h3>
          <p style={{ fontSize: '1rem', color: '#4d6a7a', marginBottom: '16px' }}>
            {selectedCourse.description}
          </p>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>👨‍🏫 Instructors</h3>
          <p style={{ fontSize: '1rem', color: '#6c757d', marginBottom: '16px' }}>
            {selectedCourse.instructor} ({selectedCourse.instructorEmail})<br />
            Office: {selectedCourse.instructorOffice}
          </p>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>📅 Schedule</h3>
          <p style={{ fontSize: '1rem', color: '#6c757d', marginBottom: '16px' }}>
            {selectedCourse.schedule}
          </p>
          {selectedCourse.prerequisites.length > 0 && (
            <>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>📘 Prerequisites</h3>
              <ul>
                {selectedCourse.prerequisites.map((prerequisite, index) => (
                  <li key={index} style={{ fontSize: '1rem', color: '#007bff' }}>
                    {prerequisite}
                  </li>
                ))}
              </ul>
            </>
          )}
          <button
            onClick={() => setSelectedCourse(null)}
            style={{
              marginTop: '24px',
              padding: '8px 16px',
              background: '#007bff',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Back to Courses
          </button>
        </div>
      )}
    </div>
  );
}

export default Courses;