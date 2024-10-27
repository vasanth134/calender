// Calendar.jsx
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventInputForm from "./EventInputForm";
import { v4 as uuidv4 } from "uuid"; // For unique event IDs if needed

function Calendar() {
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [editingEvent, setEditingEvent] = useState(null); // Holds event data if editing

  // Handle date click to open the event form for a new event
  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setEditingEvent(null); // Reset editing mode
    setShowEventForm(true);
  };

  // Handle event click to edit the existing event
  const handleEventClick = (clickInfo) => {
    const event = events.find((evt) => evt.id === clickInfo.event.id);
    setSelectedDate(event.start.split("T")[0]); // Set selected date for the form
    setEditingEvent(event); // Load event data for editing
    setShowEventForm(true); // Open the event form
  };

  // Add or update the event
  const addOrUpdateEvent = (eventData) => {
    if (eventData.id) {
      // Update existing event
      setEvents(events.map((evt) => (evt.id === eventData.id ? eventData : evt)));
    } else {
      // Add new event with a unique ID
      setEvents([
        ...events,
        { ...eventData, id: uuidv4() },
      ]);
    }
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
        dateClick={handleDateClick}
        eventClick={handleEventClick} // Trigger on event click
        events={events}
        height="98vh"
      />

      {/* Render the EventInputForm component conditionally */}
      {showEventForm && (
        <EventInputForm
          selectedDate={selectedDate}
          onAddEvent={addOrUpdateEvent} // Pass addOrUpdateEvent function
          onClose={() => setShowEventForm(false)}
          initialEventData={editingEvent} // Pass editing event data if in edit mode
        />
      )}
    </div>
  );
}

export default Calendar;
