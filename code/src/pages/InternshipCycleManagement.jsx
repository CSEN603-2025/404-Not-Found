import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '../components/ui/popover';
import { CheckIcon } from '../components/ui/check';

import '../styles/InternshipCycleManagement.css'; // Import your CSS file

function InternshipCycleManagement() {
  const [startDate, setStartDate] = useState(null); // Initialize as null
  const [endDate, setEndDate] = useState(null); // Initialize as null
  const [confirmedDates, setConfirmedDates] = useState(null); // Initialize as null

  const handleConfirmDates = () => {
    if (!startDate || !endDate) {
      alert('Please select both a start and end date.');
      return;
    }
    setConfirmedDates({ startDate, endDate });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Internship Cycle</CardTitle>
        <div className="card-description">Select the start and end dates for the internship cycle.</div>
      </CardHeader>
      <CardContent>
        <div className="date-picker-row">
          {/* Start Date Picker */}
          <div className="date-picker">
            <label>Start Date</label>
            <Popover>
              <PopoverTrigger>
                <Button className="date-button">
                  <span className="calendar-icon">📅</span>
                  {startDate ? startDate.toLocaleDateString() : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  selected={startDate}
                  onSelect={(date) => setStartDate(date)} // Use onSelect as per the Calendar component API
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* End Date Picker */}
          <div className="date-picker">
            <label>End Date</label>
            <Popover>
              <PopoverTrigger>
                <Button className="date-button">
                  <span className="calendar-icon">📅</span>
                  {endDate ? endDate.toLocaleDateString() : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  selected={endDate}
                  onSelect={(date) => setEndDate(date)} // Use onSelect as per the Calendar component API
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Confirm Button */}
          <Button
            className="confirm-button"
            onClick={handleConfirmDates}
            disabled={!startDate || !endDate}
          >
            <CheckIcon className="action-icon" /> Confirm
          </Button>
        </div>

        {/* Display Confirmed Dates */}
        {confirmedDates && (
          <div className="confirmed-dates">
            Selected Cycle: {confirmedDates.startDate.toLocaleDateString()} - {confirmedDates.endDate.toLocaleDateString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default InternshipCycleManagement;