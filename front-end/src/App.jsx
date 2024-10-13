import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import MyModule from 'MyModule'; 

const locales = {
  "en-US": enUS, // Use the imported locale
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
const events = [ 
  {
    title: "checking",
    allDay: true,
    start: new Date(2024, 10, 13),
    end: new Date(2024, 10, 13),
  },
];

export default function App() {
  return (
    <>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        className="calender h-[500px] m-[50px]"
      />
      <MyModule /> 
    </> 
  );
}
