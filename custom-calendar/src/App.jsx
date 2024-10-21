import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import { FaShareAlt } from 'react-icons/fa';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventInput, setEventInput] = useState('');
  const [taskInput, setTaskInput] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [teamMembers, setTeamMembers] = useState(['John', 'Doe', 'Alice']);
  const [acknowledged, setAcknowledged] = useState({});

  const addEvent = () => {
    const newEvent = {
      date: selectedDate.toDateString(),
      event: eventInput,
      time: timeInput,
      acknowledged: [],
    };
    setEvents([...events, newEvent]);
    setEventInput('');
    setTimeInput('');
  };

  const addTask = () => {
    const newTask = {
      date: selectedDate.toDateString(),
      task: taskInput,
    };
    setEvents([...events, newTask]);
    setTaskInput('');
  };

  const shareEvent = (event) => {
    const newAcknowledged = { ...acknowledged };
    teamMembers.forEach(member => {
      newAcknowledged[event.event] = newAcknowledged[event.event] || [];
      newAcknowledged[event.event].push(member);
    });
    setAcknowledged(newAcknowledged);
  };

  const acknowledgeEvent = (event, member) => {
    const newAcknowledged = { ...acknowledged };
    if (!newAcknowledged[event.event].includes(member)) {
      newAcknowledged[event.event].push(member);
      setAcknowledged(newAcknowledged);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Custom Calendar</h1>

      <div className="flex justify-center">
        <Calendar onChange={setSelectedDate} value={selectedDate} />
      </div>

      <div className="mt-6">
        <h2 className="text-2xl mb-4">Selected Date: {selectedDate.toDateString()}</h2>

        <div className="flex flex-col mb-4">
          <input
            type="text"
            placeholder="Add Event"
            value={eventInput}
            onChange={(e) => setEventInput(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="time"
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          <button
            onClick={addEvent}
            className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
          >
            Add Event
          </button>
        </div>

        <div className="flex flex-col mb-4">
          <input
            type="text"
            placeholder="Add Task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <button
            onClick={addTask}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Add Task
          </button>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Events on {selectedDate.toDateString()}</h3>
          <ul className="list-disc pl-6">
            {events
              .filter(event => event.date === selectedDate.toDateString())
              .map((event, index) => (
                <li key={index} className="mb-2">
                  {event.event} at {event.time}
                  <button
                    onClick={() => shareEvent(event)}
                    className="ml-4 bg-purple-500 text-white py-1 px-2 rounded flex items-center"
                  >
                    <FaShareAlt className="mr-1" /> Share
                  </button>
                  <div className="mt-2">
                    {teamMembers.map((member, i) => (
                      <button
                        key={i}
                        onClick={() => acknowledgeEvent(event, member)}
                        className={`mr-2 py-1 px-2 ${
                          acknowledged[event.event]?.includes(member)
                            ? 'bg-green-400'
                            : 'bg-gray-400'
                        } text-white rounded`}
                      >
                        {member} {acknowledged[event.event]?.includes(member) ? '✓' : ''}
                      </button>
                    ))}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
