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
  const [showWorkshopModal, setShowWorkshopModal] = useState(false);

  const handleAddWorkshop = () => {
    setSelectedWorkshop(null);
    setShowWorkshopModal(true);
  };

  const handleEditWorkshop = (workshop, isUpcoming = false) => {
    setSelectedWorkshop(workshop);
    setShowWorkshopModal(true);
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
      setWorkshops(
        workshops.map((w) => (w.id === selectedWorkshop.id ? { ...selectedWorkshop, ...workshop } : w))
      );
    } else {
      setWorkshops([...workshops, { id: Date.now(), ...workshop }]);
    }
    setShowWorkshopModal(false);
  };

  return (
    <div className="workshops-container">
      <div className="workshops-header">
        <h2 className="centered-title">Workshops</h2>
        <Button className="add-workshop-button" onClick={handleAddWorkshop}>
          Add Workshop
        </Button>
      </div>

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

      {showWorkshopModal && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(0,0,0,0.18)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{
            background: "#fff",
            borderRadius: 14,
            boxShadow: "0 4px 32px rgba(0,0,0,0.13)",
            width: 480,
            maxWidth: "95vw",
            padding: "32px 32px 24px 32px",
            position: "relative"
          }}>
            <button
              onClick={() => setShowWorkshopModal(false)}
              style={{
                position: "absolute",
                right: 18,
                top: 18,
                background: "none",
                border: "none",
                fontSize: 22,
                color: "#888",
                cursor: "pointer"
              }}
              aria-label="Close"
            >×</button>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span role="img" aria-label="edit" style={{ fontSize: 22, color: "#43a047" }}>📝</span>
              <span style={{ fontWeight: 700, fontSize: "1.35rem" }}>
                {selectedWorkshop ? "Edit Workshop" : "Add Workshop"}
              </span>
            </div>
            <div style={{ color: "#7b8a9a", marginBottom: 18 }}>
              {selectedWorkshop
                ? "Edit the details of this workshop."
                : "Please fill in the details to add a new workshop."}
            </div>
            <WorkshopModalForm
              initialData={selectedWorkshop}
              onSave={data => {
                handleSaveWorkshop(data);
                setShowWorkshopModal(false);
              }}
              onCancel={() => setShowWorkshopModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function WorkshopModalForm({ initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState(
    initialData || {
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
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Workshop Name"
        required
        style={{ width: "100%", marginBottom: 12 }}
      />
      <label>Start Date</label>
      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        placeholder="Start Date"
        required
        style={{ width: "100%", marginBottom: 12 }}
      />
      <label>End Date</label>
      <input
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        placeholder="End Date"
        required
        style={{ width: "100%", marginBottom: 12 }}
      />
      <label>Start Time</label>
      <input
        type="time"
        name="startTime"
        value={formData.startTime}
        onChange={handleChange}
        placeholder="Start Time"
        required
        style={{ width: "100%", marginBottom: 12 }}
      />
      <label>End Time</label>
      <input
        type="time"
        name="endTime"
        value={formData.endTime}
        onChange={handleChange}
        placeholder="End Time"
        required
        style={{ width: "100%", marginBottom: 12 }}
      />
      <label>Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Short Description"
        required
        style={{ width: "100%", marginBottom: 12 }}
      />
      <label>Speaker</label>
      <input
        type="text"
        name="speaker"
        value={formData.speaker}
        onChange={handleChange}
        placeholder="Speaker Bio"
        required
        style={{ width: "100%", marginBottom: 12 }}
      />
      <label>Agenda</label>
      <textarea
        name="agenda"
        value={formData.agenda}
        onChange={handleChange}
        placeholder="Workshop Agenda"
        required
        style={{ width: "100%", marginBottom: 12 }}
      />
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24, gap: 10 }}>
        <button
          type="submit"
          style={{
            background: "#43a047",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 24px",
            fontWeight: 600,
            fontSize: "1.08rem",
            cursor: "pointer"
          }}
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            background: "#e0e0e0",
            color: "#333",
            border: "none",
            borderRadius: 8,
            padding: "10px 24px",
            fontWeight: 600,
            fontSize: "1.08rem",
            cursor: "pointer"
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default Workshops;