import "antd/dist/reset.css";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from  "./pages/HomePage";
import ManageStaff from "./pages/ManageStaff";
import MarkAttendance from "./pages/MarkAttendance";
import Attendance from "./pages/Attendance";  


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<HomePage/>} />
      <Route path = "/managestaff" element = {<ManageStaff/>} />
      <Route path = "/markattendence" element = {<MarkAttendance/>} />
      <Route path = "/attendence" element = {<Attendance/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
