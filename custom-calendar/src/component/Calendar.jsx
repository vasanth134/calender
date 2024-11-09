import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useLocation, useNavigate } from "react-router-dom";
import EventInputForm from "./EventInputForm";
import { v4 as uuidv4 } from "uuid";

function Calendar() {
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const [taskCompletionStatus, setTaskCompletionStatus] = useState({});

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
    const newEvents = [];
    const startDate = new Date(eventData.start);
    const endDate = new Date(eventData.end);
    const daysBetween =
      Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    for (let i = 0; i < daysBetween; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const dayEvent = {
        ...eventData,
        id: uuidv4(),
        start: `${currentDate.toISOString().split("T")[0]}T${
          eventData.start.split("T")[1]
        }`,
        end: `${currentDate.toISOString().split("T")[0]}T${
          eventData.end.split("T")[1]
        }`,
        allDay: true,
        extendedProps: {
          enableTaskCompletionCheckbox: eventData.enableDailyNotifications,
        },
      };
      newEvents.push(dayEvent);
    }

    if (eventData.id) {
      setEvents(
        events.filter((evt) => evt.id !== eventData.id).concat(newEvents)
      );
    } else {
      setEvents(events.concat(newEvents));
    }

    setShowEventForm(false);
  };

  const toggleTaskCompletion = (eventId, date) => {
    setTaskCompletionStatus((prevStatus) => ({
      ...prevStatus,
      [`${eventId}-${date}`]: !prevStatus[`${eventId}-${date}`],
    }));
  };

  const renderEventContent = (eventInfo) => {
    const date = eventInfo.event.startStr.split("T")[0];

  const location = useLocation()  


                                                                                           // return
    return (
      <div>

        <h1>Have a Great Day {location.state.id}</h1>

        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
        {eventInfo.event.extendedProps.enableTaskCompletionCheckbox && (
          <div>
            <input
              type="checkbox"
              checked={
                taskCompletionStatus[`${eventInfo.event.id}-${date}`] || false
              }
              onChange={() => toggleTaskCompletion(eventInfo.event.id, date)}
            />
            <label>Task Completed</label>
          </div>
        )}
      </div>
    );
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
        eventContent={renderEventContent}
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
