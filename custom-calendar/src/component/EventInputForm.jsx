// EventInputForm.jsx
import React, { useState } from "react";

function EventInputForm({ selectedDate, onAddEvent, onClose }) {
  const [eventTitle, setEventTitle] = useState(""); // Event title
  const [startDate, setStartDate] = useState(selectedDate); // Start date
  const [endDate, setEndDate] = useState(selectedDate); // End date
  const [startTime, setStartTime] = useState(""); // Start time
  const [endTime, setEndTime] = useState(""); // End time
  const [notificationTime, setNotificationTime] = useState(""); // Notification time

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (eventTitle && startDate && endDate) {
      onAddEvent({
        title: eventTitle,
        start: `${startDate}T${startTime || "00:00"}`, // Full start date and time
        end: `${endDate}T${endTime || "23:59"}`, // Full end date and time
        notification: notificationTime, // Store notification time
      });
      setEventTitle("");
      setStartTime("");
      setEndTime("");
      setNotificationTime("");
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Add Event for {selectedDate}</h3>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Event Title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          required
        />
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <label>Start Time:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          <label>End Time:</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <div>
          <label>Notification Time:</label>
          <input
            type="datetime-local"
            value={notificationTime}
            onChange={(e) => setNotificationTime(e.target.value)}
          />
        </div>
        <button type="submit">Add Event</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EventInputForm;
