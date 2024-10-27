// Calendar.jsx
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventInputForm from "./EventInputForm"; // Import the event input form

function Calendar() {
  const [events, setEvents] = useState([]); // State to store calendar events
  const [showEventForm, setShowEventForm] = useState(false); // State to show/hide event form
  const [selectedDate, setSelectedDate] = useState(""); // State to store the selected date

  // Handle date click to open the event form
  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr); // Set the selected date
    setShowEventForm(true); // Show the event form
  };

  // Function to add a new event
  const addEvent = (title) => {
    const newEvent = {
      title,
      start: selectedDate,
      allDay: true,
    };
    setEvents([...events, newEvent]); // Add new event to the events array
    setShowEventForm(false); // Hide the form after submission
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

      {/* Render the EventInputForm component conditionally */}
      {showEventForm && (
        <EventInputForm
          selectedDate={selectedDate}
          onAddEvent={addEvent} // Pass addEvent function as a prop
          onClose={() => setShowEventForm(false)} // Close form on cancel
        />
      )}
    </div>
  );
}

export default Calendar;
