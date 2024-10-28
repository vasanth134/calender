// Calendar.jsx
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventInputForm from "./EventInputForm";
import { v4 as uuidv4 } from "uuid";

function Calendar() {
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setEditingEvent(null);
    setShowEventForm(true);
  };

  const handleEventClick = (clickInfo) => {
    const event = events.find((evt) => evt.id === clickInfo.event.id);
    setSelectedDate(event.start.split("T")[0]);
    setEditingEvent(event);
    setShowEventForm(true);
  };

  const addOrUpdateEvent = (eventData) => {
    if (eventData.id) {
      setEvents(events.map((evt) => (evt.id === eventData.id ? eventData : evt)));
    } else {
      setEvents([
        ...events,
        { ...eventData, id: uuidv4() },
      ]);
    }
    setShowEventForm(false);
    if (eventData.notification && eventData.enableDailyNotifications) {
      scheduleDailyNotifications(eventData);
    }
  };

  // Schedule daily notifications until the end date
  const scheduleDailyNotifications = (event) => {
    const notificationTime = new Date(event.notification);
    const endDate = new Date(event.end.split("T")[0]);
    const now = new Date();

    while (notificationTime <= endDate) {
      if (notificationTime >= now) {
        const delay = notificationTime - now;
        setTimeout(() => {
          alert(`Reminder: ${event.title} is scheduled for ${event.start}`);
        }, delay);
      }
      notificationTime.setDate(notificationTime.getDate() + 1); // Move to the next day
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
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        events={events}
        height="98vh"
      />

      {showEventForm && (
        <EventInputForm
          selectedDate={selectedDate}
          onAddEvent={addOrUpdateEvent}
          onClose={() => setShowEventForm(false)}
          initialEventData={editingEvent}
        />
      )}
    </div>
  );
}

export default Calendar;
