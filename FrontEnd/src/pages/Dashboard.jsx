import Sidebar from "../components/Sidebar"
import { Calendar, Users, DoorOpen } from "lucide-react"

export default function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main className="content container">
        <h1 style={{ marginTop: 0, marginBottom: "var(--spacing-xl)" }}>Dashboard</h1>
        <div className="grid grid3">
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-primary-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Calendar size={20} style={{ color: "var(--color-primary)" }} />
              </div>
              <h3 style={{ margin: 0 }}>Total Meetings</h3>
            </div>
            <p>—</p>
          </div>
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "var(--radius-md)",
                  background: "rgba(16, 185, 129, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Users size={20} style={{ color: "var(--color-success)" }} />
              </div>
              <h3 style={{ margin: 0 }}>Total Employees</h3>
            </div>
            <p>—</p>
          </div>
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "var(--radius-md)",
                  background: "rgba(245, 158, 11, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DoorOpen size={20} style={{ color: "var(--color-warning)" }} />
              </div>
              <h3 style={{ margin: 0 }}>Rooms</h3>
            </div>
            <p>—</p>
          </div>
        </div>
      </main>
    </div>
  )
}
