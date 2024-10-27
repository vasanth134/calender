// EventInputForm.jsx
import React, { useState } from "react";

function EventInputForm({ selectedDate, onAddEvent, onClose }) {
  const [eventTitle, setEventTitle] = useState(""); // State for event title

  // Handle form submission to add the event
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (eventTitle) {
      onAddEvent(eventTitle); // Pass the event title to the parent component
      setEventTitle(""); // Clear the input field
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
        <button type="submit">Add Event</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EventInputForm;
