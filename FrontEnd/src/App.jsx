import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Meetings from "./pages/Meetings";
import Employees from "./pages/Employees";
import Rooms from "./pages/Rooms";
import Attendees from "./pages/Attendees";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import AdminPage from "./pages/AdminPage";
import EmployeePage from "./pages/EmployeePage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/meetings" element={<ProtectedRoute><Meetings /></ProtectedRoute>} />
        <Route path="/employees" element={<ProtectedRoute><Employees /></ProtectedRoute>} />
        <Route path="/rooms" element={<ProtectedRoute><Rooms /></ProtectedRoute>} />
        <Route path="/attendees" element={<ProtectedRoute><Attendees /></ProtectedRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        <Route path="/employee" element={<ProtectedRoute><EmployeePage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
