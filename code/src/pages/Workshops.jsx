import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { EyeIcon } from '../components/ui/eye';
import EditIcon from '../components/ui/editIcon';
import DeleteIcon from '../components/ui/deleteIcon';
import { mockWorkshops, mockUpcomingWorkshops } from '../data/mock-data';
import '../styles/Workshops.css';

function Workshops() {
  const [workshops, setWorkshops] = useState(mockWorkshops);
  const [upcomingWorkshops, setUpcomingWorkshops] = useState(mockUpcomingWorkshops);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [selectedWorkshopForView, setSelectedWorkshopForView] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddWorkshop = () => {
    setSelectedWorkshop(null); // Clear the selected workshop
    setIsPopupOpen(true); // Open the popup for adding a new workshop
  };

  const handleEditWorkshop = (workshop, isUpcoming = false) => {
    setSelectedWorkshop(workshop); // Set the selected workshop for editing
    setIsPopupOpen(true); // Open the popup
  };

  const handleDeleteWorkshop = (id, isUpcoming = false) => {
    if (window.confirm('Are you sure you want to delete this workshop?')) {
      if (isUpcoming) {
        setUpcomingWorkshops(upcomingWorkshops.filter((workshop) => workshop.id !== id));
      } else {
        setWorkshops(workshops.filter((workshop) => workshop.id !== id));
      }
    }
  };

  const handleSaveWorkshop = (workshop) => {
    if (selectedWorkshop) {
      // Update existing workshop
      setWorkshops(
        workshops.map((w) => (w.id === selectedWorkshop.id ? { ...selectedWorkshop, ...workshop } : w))
      );
    } else {
      // Add new workshop
      setWorkshops([...workshops, { id: Date.now(), ...workshop }]);
    }
    setIsPopupOpen(false); // Close the popup
  };

  return (
    <div className="workshops-container">
      <div className="workshops-header">
        <h2 className="centered-title">Workshops</h2>
        <Button className="add-workshop-button" onClick={handleAddWorkshop}>
          Add Workshop
        </Button>
      </div>

      {/* Current Workshops Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workshops.map((workshop) => (
            <TableRow key={workshop.id}>
              <TableCell>{workshop.name}</TableCell>
              <TableCell>{workshop.startDate}</TableCell>
              <TableCell>{workshop.endDate}</TableCell>
              <TableCell>{workshop.startTime}</TableCell>
              <TableCell>{workshop.endTime}</TableCell>
              <TableCell>
                <div className="actions-container">
                  <Button
                    className="icon-button"
                    onClick={() => setSelectedWorkshopForView(workshop)}
                  >
                    <EyeIcon className="action-icon" />
                  </Button>
                  <Button
                    className="icon-button"
                    onClick={() => handleEditWorkshop(workshop)}
                  >
                    <EditIcon className="action-icon" />
                  </Button>
                  <Button
                    className="icon-button"
                    onClick={() => handleDeleteWorkshop(workshop.id)}
                  >
                    <DeleteIcon className="action-icon" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Upcoming Workshops Table */}
      <h3 className="centered-title">Upcoming Workshops</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {upcomingWorkshops.map((workshop) => (
            <TableRow key={workshop.id}>
              <TableCell>{workshop.name}</TableCell>
              <TableCell>{workshop.startDate}</TableCell>
              <TableCell>{workshop.endDate}</TableCell>
              <TableCell>{workshop.startTime}</TableCell>
              <TableCell>{workshop.endTime}</TableCell>
              <TableCell>
                <div className="actions-container">
                  <Button
                    className="icon-button"
                    onClick={() => setSelectedWorkshopForView(workshop)}
                  >
                    <EyeIcon className="action-icon" />
                  </Button>
                  <Button
                    className="icon-button"
                    onClick={() => handleEditWorkshop(workshop, true)}
                  >
                    <EditIcon className="action-icon" />
                  </Button>
                  <Button
                    className="icon-button"
                    onClick={() => handleDeleteWorkshop(workshop.id, true)}
                  >
                    <DeleteIcon className="action-icon" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedWorkshopForView && (
        <div className="pop-overlay">
          <div className="pop">
            <h2>Workshop Details</h2>
            <p><strong>Name:</strong> {selectedWorkshopForView.name}</p>
            <p><strong>Start Date:</strong> {selectedWorkshopForView.startDate}</p>
            <p><strong>End Date:</strong> {selectedWorkshopForView.endDate}</p>
            <p><strong>Start Time:</strong> {selectedWorkshopForView.startTime}</p>
            <p><strong>End Time:</strong> {selectedWorkshopForView.endTime}</p>
            <p><strong>Description:</strong> {selectedWorkshopForView.description}</p>
            <p><strong>Speaker:</strong> {selectedWorkshopForView.speaker}</p>
            <p><strong>Agenda:</strong> {selectedWorkshopForView.agenda}</p>
            <div className="popup-actions">
              <button
                className="close-button"
                onClick={() => setSelectedWorkshopForView(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isPopupOpen && (
        <WorkshopPopup
          workshop={selectedWorkshop}
          onSave={handleSaveWorkshop}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
}

function WorkshopPopup({ workshop, onSave, onClose }) {
  const [formData, setFormData] = useState(
    workshop || {
      name: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      description: '',
      speaker: '',
      agenda: '',
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>{workshop ? 'Edit Workshop' : 'Add Workshop'}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Workshop Name"
            required
          />
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            placeholder="Start Date"
            required
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            placeholder="End Date"
            required
          />
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            placeholder="Start Time"
            required
          />
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            placeholder="End Time"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Short Description"
            required
          />
          <input
            type="text"
            name="speaker"
            value={formData.speaker}
            onChange={handleChange}
            placeholder="Speaker Bio"
            required
          />
          <textarea
            name="agenda"
            value={formData.agenda}
            onChange={handleChange}
            placeholder="Workshop Agenda"
            required
          />
          <div className="popup-actions">
            <Button type="submit">Save</Button>
            <Button onClick={onClose}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Workshops;