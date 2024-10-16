import { Component } from "react";
import {
  BasicCalendar,
  ControlCalendar,
  CustomizingCalendar,
  AdvancedCalendar,
} from "./Components";

export default function App() {
  return (
    <>
      <div style={{ height: "95vh" }}>
        <BasicCalendar />
        {/* <AdvancedCalendar /> */}
        {/* <ControlCalendar />
    <CustomizingCalendar /> */}
      </div>
    </>
  );
}
