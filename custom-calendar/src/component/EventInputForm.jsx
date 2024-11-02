// EventInputForm.jsx
import React, { useState, useEffect } from "react";
import "../style/eventInput.css";
function EventInputForm({ selectedDate, onAddEvent, onClose, initialEventData }) {
  const [eventTitle, setEventTitle] = useState("");
  const [startDate, setStartDate] = useState(selectedDate);
  const [endDate, setEndDate] = useState(selectedDate);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [notificationTime, setNotificationTime] = useState("");
  const [enableDailyNotifications, setEnableDailyNotifications] = useState(false); // New state for daily notifications

  useEffect(() => {
    if (initialEventData) {
      setEventTitle(initialEventData.title);
      setStartDate(initialEventData.start.split("T")[0]);
      setStartTime(initialEventData.start.split("T")[1] || "");
      setEndDate(initialEventData.end.split("T")[0]);
      setEndTime(initialEventData.end.split("T")[1] || "");
      setNotificationTime(initialEventData.notification || "");
      setEnableDailyNotifications(initialEventData.enableDailyNotifications || false);
    }
  }, [initialEventData]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (eventTitle && startDate && endDate) {
      onAddEvent({
        id: initialEventData?.id,
        title: eventTitle,
        start: `${startDate}T${startTime || "00:00"}`,
        end: `${endDate}T${endTime || "23:59"}`,
        notification: notificationTime,
        enableDailyNotifications, // Pass daily notifications setting
      });
      setEventTitle("");
      setStartTime("");
      setEndTime("");
      setNotificationTime("");
      setEnableDailyNotifications(false);
    }
  };

  return (
    <div className="boxEvent">
      <h3>{initialEventData ? "Edit Event" : "Add Event"} for {selectedDate}</h3>
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
            type="time"
            value={notificationTime}
            onChange={(e) => setNotificationTime(e.target.value)}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={enableDailyNotifications}
              onChange={(e) => setEnableDailyNotifications(e.target.checked)}
            />
            Enable Daily Notifications Until Event End
          </label>
        </div>
        <button type="submit">{initialEventData ? "Update Event" : "Add Event"}</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default EventInputForm;
