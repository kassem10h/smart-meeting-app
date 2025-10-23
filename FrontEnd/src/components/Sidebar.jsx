import { NavLink, useNavigate } from "react-router-dom"
import { isAdmin } from "../services/auth"
import { LayoutDashboard, Calendar, DoorOpen, Settings, LogOut } from "lucide-react"

export default function Sidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <aside className="sidebar">
      <div style={{ flex: 1 }}>
        <h2 className="brand">Smart Meeting</h2>

        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "link active" : "link")}>
          <LayoutDashboard size={18} style={{ marginRight: "12px" }} />
          Dashboard
        </NavLink>

        <NavLink to="/meetings" className={({ isActive }) => (isActive ? "link active" : "link")}>
          <Calendar size={18} style={{ marginRight: "12px" }} />
          Meetings
        </NavLink>

        <NavLink to="/rooms" className={({ isActive }) => (isActive ? "link active" : "link")}>
          <DoorOpen size={18} style={{ marginRight: "12px" }} />
          Rooms
        </NavLink>

        {isAdmin() && (
          <button
            onClick={() => navigate("/admin")}
            className="link"
            style={{
              marginTop: "var(--spacing-lg)",
              width: "calc(100% - var(--spacing-md) * 2)",
              background: "var(--color-primary-light)",
              border: "1px solid var(--color-primary)",
              color: "var(--color-primary)",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <Settings size={18} />
            Admin Panel
          </button>
        )}
      </div>

      <button
        onClick={handleLogout}
        style={{
          margin: "0 var(--spacing-sm)",
          background: "var(--color-surface-elevated)",
          color: "var(--color-text-secondary)",
          padding: "var(--spacing-sm) var(--spacing-lg)",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--color-border)",
          cursor: "pointer",
          fontWeight: "500",
          fontSize: "0.9375rem",
          transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--color-error-light)"
          e.currentTarget.style.borderColor = "var(--color-error)"
          e.currentTarget.style.color = "var(--color-error)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "var(--color-surface-elevated)"
          e.currentTarget.style.borderColor = "var(--color-border)"
          e.currentTarget.style.color = "var(--color-text-secondary)"
        }}
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  )
}
