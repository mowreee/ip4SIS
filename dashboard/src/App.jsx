import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import ManageStudent from "./pages/ManageStudent";

import "./App.css";
import TaskTracker from "./pages/TaskTracker";
//import Login from "./pages/Login";
import Users from "./pages/Users";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/AddStudent" element={<AddStudent />} />
        <Route path="/TaskTracker" element={<TaskTracker />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/ManageStudent" element={<ManageStudent />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
