import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import DatePicker from "react-datepicker";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";
// import { newDate } from "react-datepicker/dist/date_utils";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
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
    start: newDate(2024, 10, 13),
    end: newDate(2024, 10, 13),
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
    </>
  );
}
