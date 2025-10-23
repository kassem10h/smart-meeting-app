"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

export default function Register() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("User")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const body = { email, password, firstName, lastName, role }
      await api.post("/Auth/register", body)
      alert("✅ Registration successful! You can now log in.")
      navigate("/")
    } catch (err) {
      console.error(err)
      alert("❌ Registration failed: " + (err.response?.data || err.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: "100vh",
        background: "var(--color-background)",
      }}
    >
      <form className="card" style={{ width: 400, maxWidth: "90vw" }} onSubmit={handleSubmit}>
        <div style={{ textAlign: "center", marginBottom: "var(--spacing-xl)" }}>
          <h2 style={{ marginTop: 0, marginBottom: "var(--spacing-xs)" }}>Create an Account</h2>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9375rem" }}>
            Join Smart Meeting to manage your meetings efficiently
          </p>
        </div>
        <div style={{ display: "grid", gap: "var(--spacing-md)" }}>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "var(--spacing-xs)",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--color-text-secondary)",
              }}
            >
              First Name
            </label>
            <input
              className="input"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "var(--spacing-xs)",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--color-text-secondary)",
              }}
            >
              Last Name
            </label>
            <input
              className="input"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "var(--spacing-xs)",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--color-text-secondary)",
              }}
            >
              Email
            </label>
            <input
              className="input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "var(--spacing-xs)",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--color-text-secondary)",
              }}
            >
              Password
            </label>
            <input
              className="input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "var(--spacing-xs)",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--color-text-secondary)",
              }}
            >
              Role
            </label>
            <select className="select" value={role} onChange={(e) => setRole(e.target.value)}>
              <option>User</option>
              <option>Employee</option>
              <option>Admin</option>
            </select>
          </div>
          <button className="btn" type="submit" disabled={loading} style={{ marginTop: "var(--spacing-sm)" }}>
            {loading ? "Creating account..." : "Register"}
          </button>
          <p
            style={{
              textAlign: "center",
              marginTop: "var(--spacing-md)",
              color: "var(--color-text-secondary)",
              fontSize: "0.9375rem",
            }}
          >
            Already have an account? <a href="/">Log in</a>
          </p>
        </div>
      </form>
    </div>
  )
}
