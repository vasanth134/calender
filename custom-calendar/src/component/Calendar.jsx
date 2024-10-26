import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function Calendar() {
  const [events, setEvents] = useState([]); // State to store calendar events
  const [showEventForm, setShowEventForm] = useState(false); // State to show/hide event form
  const [eventTitle, setEventTitle] = useState(""); // State for the event title input
  const [selectedDate, setSelectedDate] = useState(""); // State to store the selected date

  // Handle date click to open the event form
  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr); // Set the selected date
    setShowEventForm(true); // Show the event form
  };

  // Handle form submission to add the event
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (eventTitle) {
      const newEvent = {
        title: eventTitle,
        start: selectedDate,
        allDay: true,
      };
      setEvents([...events, newEvent]); // Add new event to the events array
      setEventTitle(""); // Clear the input field
      setShowEventForm(false); // Hide the form after submission
    }
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        dateClick={handleDateClick} // Trigger on date click
        events={events} // Pass events to display on the calendar
        height="98vh"
      />

      {/* Conditional rendering of the event input form */}
      {showEventForm && (
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
          </form>
        </div>
      )}
    </div>
  );
}

export default Calendar;
