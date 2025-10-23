import Sidebar from "../components/Sidebar";
import { isAdmin } from "../services/auth";

export default function EmployeePage() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main className="content container">
        <h1>Employee Dashboard</h1>
        <p>Welcome! You can view meetings and notifications.</p>

        {!isAdmin() && (
          <div className="grid grid3">
            <a href="/meetings" className="card">View Meetings</a>
            <a href="/rooms" className="card">Available Rooms</a>
          </div>
        )}
      </main>
    </div>
  );
}
