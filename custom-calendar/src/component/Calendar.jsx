import React from "react";
import FullCalendar from "@fullcalendar/react";
import DayGridPlugin from "@fullcalendar/daygrid";
import TimeGridPlugin from "@fullcalendar/timegrid";
import IntertactionPlugin from "@fullcalendar/interaction";
function Calendar() {
  
  const handleDateClick = (arg) =>{
    alert(arg.dateStr)
  }
  
  
  return (
    <>
      <FullCalendar
        plugins={[DayGridPlugin, TimeGridPlugin, IntertactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth, timeGridWeek, timeGridDay", 
        }
      }
      dateClick={handleDateClick}
        height={"98vh"}
      />
    </>
  );
}
export default Calendar;
