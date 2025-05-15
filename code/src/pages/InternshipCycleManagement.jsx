import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '../components/ui/popover';

function InternshipCycleManagement() {
  const [phases, setPhases] = useState({
    applicationPeriod: { startDate: null, endDate: null },
    interviewPhase: { startDate: null, endDate: null },
    internshipProgram: { startDate: null, endDate: null },
  });

  const handleDateChange = (phase, type, date) => {
    setPhases((prev) => ({
      ...prev,
      [phase]: {
        ...prev[phase],
        [type]: date,
      },
    }));
  };

  const handleSaveChanges = () => {
    alert('Internship cycle dates saved successfully!');
  };

  const renderDatePicker = (label, phase, type) => (
    <Popover>
      <PopoverTrigger>
        <Button
          style={{
            padding: '8px 16px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            background: '#f6f7fa',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          <span style={{ marginRight: '8px' }}>📅</span>
          {phases[phase][type] ? phases[phase][type].toLocaleDateString() : label}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          selected={phases[phase][type]}
          onSelect={(date) => handleDateChange(phase, type, date)}
        />
      </PopoverContent>
    </Popover>
  );

  return (
    <div style={{ maxWidth: 1100, margin: '32px auto', padding: '16px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '16px' }}>
        CycleSync Dashboard
      </h1>
      <p style={{ textAlign: 'center', color: '#4d6a7a', marginBottom: '32px' }}>
        Manage your internship cycle dates with ease.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Internship Cycle Phases</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ flex: 1, fontWeight: 600, fontSize: '1rem', color: '#4d6a7a' }}>
              📋 Application Period
            </div>
            {renderDatePicker('Start Date', 'applicationPeriod', 'startDate')}
            <span style={{ margin: '0 8px' }}>to</span>
            {renderDatePicker('End Date', 'applicationPeriod', 'endDate')}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ flex: 1, fontWeight: 600, fontSize: '1rem', color: '#4d6a7a' }}>
              👥 Interview Phase
            </div>
            {renderDatePicker('Start Date', 'interviewPhase', 'startDate')}
            <span style={{ margin: '0 8px' }}>to</span>
            {renderDatePicker('End Date', 'interviewPhase', 'endDate')}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ flex: 1, fontWeight: 600, fontSize: '1rem', color: '#4d6a7a' }}>
              🎓 Internship Program
            </div>
            {renderDatePicker('Start Date', 'internshipProgram', 'startDate')}
            <span style={{ margin: '0 8px' }}>to</span>
            {renderDatePicker('End Date', 'internshipProgram', 'endDate')}
          </div>
        </CardContent>
      </Card>

      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <Button
          onClick={handleSaveChanges}
          style={{
            padding: '12px 24px',
            background: '#43a047',
            color: '#fff',
            fontSize: '1rem',
            fontWeight: 600,
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
          }}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}

export default InternshipCycleManagement;