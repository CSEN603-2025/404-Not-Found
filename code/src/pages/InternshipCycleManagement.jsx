import React, { useState } from 'react';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '../components/ui/popover';

function InternshipCycleManagement() {
  const [cycleName, setCycleName] = useState('');
  const [cycleDesc, setCycleDesc] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [appDeadline, setAppDeadline] = useState(null);

  const [showAppDeadline, setShowAppDeadline] = useState(false);
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

  const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: 6,
    border: 'none',
    outline: '1.5px solid #e3e7eb',
    fontSize: '1.08rem',
    background: '#f3f6f8',
    color: '#222',
    marginBottom: 0,
    boxSizing: 'border-box'
  };

  const labelStyle = {
    fontWeight: 700,
    display: 'block',
    marginBottom: 8,
    fontSize: '1.05rem'
  };

  // Date button style
  const dateBtnStyle = {
  width: '100%',
  padding: '16px 16px 16px 48px',
  border: 'none',
  background: 'transparent',
  fontSize: '1.08rem',
  color: '#4d6a7a',
  textAlign: 'left',
  position: 'relative',
  boxShadow: 'none',
  minHeight: 56
  };

  const calendarIcon = (
    <span style={{
      position: 'absolute',
      left: 18,
      top: '50%',
      transform: 'translateY(-50%)'
    }}>
      <svg width="22" height="22" fill="#43a047" viewBox="0 0 20 20">
        <rect x="3" y="6" width="14" height="11" rx="2" fill="#eaf6ed"/>
        <rect x="3" y="6" width="14" height="11" rx="2" stroke="#43a047" strokeWidth="1.2"/>
        <rect x="7" y="10" width="6" height="2" rx="1" fill="#43a047"/>
        <rect x="6" y="2" width="2" height="4" rx="1" fill="#43a047"/>
        <rect x="12" y="2" width="2" height="4" rx="1" fill="#43a047"/>
      </svg>
    </span>
  );

  return (
    <div style={{
      background: '#f4f7fa',
      minHeight: '100vh',
      padding: '32px 0'
    }}>
      <div style={{
        maxWidth: 700,
        margin: '32px auto',
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
        padding: '0 0 32px 0',
        border: '1px solid #e3e7eb'
      }}>
        {/* Header */}
        <div style={{ padding: '28px 24px 12px 24px' }}>
          <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 2 }}>Set Cycle Details</div>
          <div style={{ color: '#4d6a7a', fontSize: '1.08rem' }}>
            Enter the name, description, and key dates for the internship cycle.
          </div>
        </div>
        <div style={{
          borderBottom: '1px solid #e3e7eb',
          margin: '0 0 24px 0'
        }} />
        {/* Form */}
        <form style={{ padding: '0 24px' }} onSubmit={e => { e.preventDefault(); alert('Cycle details confirmed!'); }}>
          <div style={{ marginBottom: 22 }}>
            <label style={labelStyle}>Cycle Name / Title</label>
            <input
              type="text"
              placeholder="e.g., Summer Internship 2025"
              value={cycleName}
              onChange={e => setCycleName(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: 22 }}>
            <label style={labelStyle}>Description of the Cycle</label>
            <textarea
              placeholder="A short paragraph explaining what this internship cycle is about."
              value={cycleDesc}
              onChange={e => setCycleDesc(e.target.value)}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>
          {/* Start Date */}
          <div style={{ marginBottom: 22 }}>
            <label style={labelStyle}>Start Date</label>
            <input
              type="date"
              ref={ref => (window.startDateInput = ref)}
              style={{ display: 'none' }}
              value={startDate ? startDate.toISOString().split('T')[0] : ''}
              onChange={e => setStartDate(e.target.value ? new Date(e.target.value) : null)}
            />
            <button
              type="button"
              style={dateBtnStyle}
              onClick={() => window.startDateInput && window.startDateInput.click()}
            >
              {calendarIcon}
              {startDate ? startDate.toLocaleDateString() : <span style={{ color: '#7b8a9a' }}>Pick a date</span>}
            </button>
          </div>
          {/* End Date */}
          <div style={{ marginBottom: 22 }}>
            <label style={labelStyle}>End Date</label>
            <input
              type="date"
              ref={ref => (window.endDateInput = ref)}
              style={{ display: 'none' }}
              value={endDate ? endDate.toISOString().split('T')[0] : ''}
              onChange={e => setEndDate(e.target.value ? new Date(e.target.value) : null)}
              min={startDate ? startDate.toISOString().split('T')[0] : undefined}
            />
            <button
              type="button"
              style={dateBtnStyle}
              onClick={() => window.endDateInput && window.endDateInput.click()}
            >
              {calendarIcon}
              {endDate ? endDate.toLocaleDateString() : <span style={{ color: '#7b8a9a' }}>Pick a date</span>}
            </button>
          </div>
          {/* Application Deadline */}
          <div style={{ marginBottom: 32 }}>
            <label style={labelStyle}>Application Deadline</label>
            <input
              type="date"
              ref={ref => (window.appDeadlineInput = ref)}
              style={{ display: 'none' }}
              value={appDeadline ? appDeadline.toISOString().split('T')[0] : ''}
              onChange={e => setAppDeadline(e.target.value ? new Date(e.target.value) : null)}
              min={startDate ? startDate.toISOString().split('T')[0] : undefined}
            />
            <button
              type="button"
              style={dateBtnStyle}
              onClick={() => window.appDeadlineInput && window.appDeadlineInput.click()}
            >
              {calendarIcon}
              {appDeadline ? appDeadline.toLocaleDateString() : <span style={{ color: '#7b8a9a' }}>Set deadline</span>}
            </button>
          </div>
          {/* Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '16px',
              background: '#43a047',
              color: '#fff',
              fontSize: '1.18rem',
              fontWeight: 600,
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10
            }}
          >
            {/* Lock SVG */}
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="4" y="9" width="12" height="7" rx="2" fill="#fff" fillOpacity="0.18"/><rect x="4" y="9" width="12" height="7" rx="2" stroke="#fff" strokeWidth="1.2"/><rect x="7" y="6" width="6" height="3" rx="1.5" fill="#fff"/><rect x="8.5" y="12" width="3" height="3" rx="1.5" fill="#43a047"/><rect x="8.5" y="12" width="3" height="3" rx="1.5" stroke="#fff" strokeWidth="1.2"/></svg>
            Confirm Details
          </button>
        </form>
      </div>
    </div>
  );
}

export default InternshipCycleManagement;