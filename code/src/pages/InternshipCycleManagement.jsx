import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '../components/ui/popover';
import { CheckIcon } from '../components/icons/check';
import { CalendarIcon } from '../components/icons/calendar';
import './InternshipCycleManagement.css';

function InternshipCycleManagement() {
  const [cycle, setCycle] = useState({ startDate: null, endDate: null });

  useEffect(() => {
    const savedStartDate = localStorage.getItem('internshipCycleStartDate');
    const savedEndDate = localStorage.getItem('internshipCycleEndDate');
    if (savedStartDate) setCycle(prev => ({ ...prev, startDate: new Date(savedStartDate) }));
    if (savedEndDate) setCycle(prev => ({ ...prev, endDate: new Date(savedEndDate) }));
  }, []);

  const handleStartDateSelect = (date) => {
    if (date && cycle.endDate && date > cycle.endDate) {
      alert('Start date cannot be after the end date.');
      return;
    }
    setCycle({ ...cycle, startDate: date });
  };

  const handleEndDateSelect = (date) => {
    if (date && cycle.startDate && date < cycle.startDate) {
      alert('End date cannot be before the start date.');
      return;
    }
    setCycle({ ...cycle, endDate: date });
  };

  const handleSetCycle = () => {
    if (!cycle.startDate || !cycle.endDate) {
      alert('Please select both a start and end date for the cycle.');
      return;
    }
    localStorage.setItem('internshipCycleStartDate', cycle.startDate.toISOString());
    localStorage.setItem('internshipCycleEndDate', cycle.endDate.toISOString());
    alert(`Cycle set from ${cycle.startDate.toLocaleDateString()} to ${cycle.endDate.toLocaleDateString()}.`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Internship Cycle</CardTitle>
        <div className="card-description">Set the start and end dates for the current internship cycle.</div>
      </CardHeader>
      <CardContent>
        <div className="date-picker-row">
          <div className="date-picker">
            <label>Start Date</label>
            <Popover>
              <PopoverTrigger>
                <Button>
                  <CalendarIcon className="calendar-icon" />
                  {cycle.startDate ? cycle.startDate.toLocaleDateString() : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={cycle.startDate}
                  onSelect={handleStartDateSelect}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="date-picker">
            <label>End Date</label>
            <Popover>
              <PopoverTrigger>
                <Button>
                  <CalendarIcon className="calendar-icon" />
                  {cycle.endDate ? cycle.endDate.toLocaleDateString() : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={cycle.endDate}
                  onSelect={handleEndDateSelect}
                  disabled={(date) => cycle.startDate && date < cycle.startDate}
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button onClick={handleSetCycle} disabled={!cycle.startDate || !cycle.endDate}>
            <CheckIcon className="action-icon" /> Set Cycle
          </Button>
        </div>
        {cycle.startDate && cycle.endDate && (
          <div className="cycle-info">Current cycle: {cycle.startDate.toLocaleDateString()} - {cycle.endDate.toLocaleDateString()}</div>
        )}
      </CardContent>
    </Card>
  );
}

export default InternshipCycleManagement;