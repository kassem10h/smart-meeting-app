import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Calendar, Users, DoorOpen } from "lucide-react";
import api from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    meetings: "—",
    employees: "—",
    rooms: "—",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch all data in parallel for better performance
        const [meetingsRes, employeesRes, roomsRes] = await Promise.all([
          api.get("/api/meeting"),
          api.get("/api/employee"),
          api.get("/api/room"),
        ]);

        // Update state with the length of the returned arrays
        setStats({
          meetings: meetingsRes.data.length,
          employees: employeesRes.data.length,
          rooms: roomsRes.data.length,
        });
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Could not load dashboard data. Please try again later.");
      }
    };

    fetchDashboardData();
  }, []); // The empty array ensures this runs only once when the component mounts

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main className="content container">
        <div style={{ marginBottom: "var(--spacing-2xl)" }}>
          <h1 style={{ marginTop: 0, marginBottom: "var(--spacing-xs)" }}>
            Dashboard
          </h1>
          <p
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "0.9375rem",
              margin: 0,
            }}
          >
            Overview of your meetings, employees, and rooms
          </p>
        </div>

        {error && (
          <div className="card" style={{ borderColor: "var(--color-error)", marginBottom: "var(--spacing-lg)" }}>
            <p style={{ color: "var(--color-error)" }}>{error}</p>
          </div>
        )}

        <div className="grid grid3">
          {/* Total Meetings Card */}
          <div className="card">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "var(--radius-lg)",
                  background: "var(--color-primary-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid var(--color-primary)",
                }}
              >
                <Calendar size={22} style={{ color: "var(--color-primary)" }} />
              </div>
              <h3 style={{ margin: 0, fontSize: "0.8125rem" }}>
                Total Meetings
              </h3>
            </div>
            <p style={{ fontSize: "2.25rem" }}>{stats.meetings}</p>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--color-text-tertiary)",
                marginTop: "8px",
              }}
            >
              Scheduled this month
            </p>
          </div>

          {/* Total Employees Card */}
          <div className="card">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "var(--radius-lg)",
                  background: "var(--color-success-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid var(--color-success)",
                }}
              >
                <Users size={22} style={{ color: "var(--color-success)" }} />
              </div>
              <h3 style={{ margin: 0, fontSize: "0.8125rem" }}>
                Total Employees
              </h3>
            </div>
            <p style={{ fontSize: "2.25rem" }}>{stats.employees}</p>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--color-text-tertiary)",
                marginTop: "8px",
              }}
            >
              Active team members
            </p>
          </div>

          {/* Available Rooms Card */}
          <div className="card">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "var(--radius-lg)",
                  background: "var(--color-warning-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid var(--color-warning)",
                }}
              >
                <DoorOpen size={22} style={{ color: "var(--color-warning)" }} />
              </div>
              <h3 style={{ margin: 0, fontSize: "0.8125rem" }}>
                Available Rooms
              </h3>
            </div>
            <p style={{ fontSize: "2.25rem" }}>{stats.rooms}</p>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--color-text-tertiary)",
                marginTop: "8px",
              }}
            >
              Ready for booking
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}