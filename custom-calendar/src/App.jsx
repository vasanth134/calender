import Calendar from "./component/Calendar";
import SignUp from "./component/SignUp";
import Login from "./component/Login";
import { Route, Router, Routes } from "react-router-dom";

function App() {
  return (
    <>
     
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      
    </>
  );
}
export default App;
