import React from 'react';

function AppliedInternships({ appliedInternships, searchQuery, setSearchQuery, filterStatus, setFilterStatus }) {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredInternships = appliedInternships.filter((internship) => {
    const matchesSearch = internship.title.toLowerCase().includes(searchQuery) || internship.company.toLowerCase().includes(searchQuery);
    const matchesFilter = filterStatus === 'all' || (filterStatus === 'current' && internship.status === 'Accepted') || (filterStatus === 'completed' && internship.status === 'Completed');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="applied-internships-container">
      <h3>Applied Internships</h3>
      <div className="search-filter-container">
        <input type="text" placeholder="Search by title or company..." value={searchQuery} onChange={handleSearchChange} className="search-input" />
        <select value={filterStatus} onChange={handleFilterChange} className="filter-select">
          <option value="all">All</option>
          <option value="current">Current Intern</option>
          <option value="completed">Internship Complete</option>
        </select>
      </div>
      <div className="internship-table">
        {filteredInternships.map((internship) => (
          <div key={internship.id} className="table-row">
            <div className="table-cell">{internship.title}</div>
            <div className="table-cell">{internship.company}</div>
            <div className="table-cell">{internship.location}</div>
            <div className="table-cell">{internship.status}</div>
            <div className="table-cell">{internship.postedDate}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppliedInternships;