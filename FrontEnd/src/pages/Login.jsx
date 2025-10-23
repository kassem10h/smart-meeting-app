import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const onSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    // ✅ this must include /api
    const res = await api.post("/api/auth/login", { email, password });
    if (res.data?.token) {
      const token = res.data.token;
      localStorage.setItem("token", token);

      // Decode JWT role
      const payload = JSON.parse(atob(token.split(".")[1]));
      const role =
        payload["role"] ||
        payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      if (role === "Admin") navigate("/admin");
      else navigate("/employee");
    } else {
      alert("✅ Login succeeded but no token returned. Check backend response shape.");
    }
  } catch (err) {
    console.error(err);
    alert("❌ Login failed. Check credentials or API route (/api/Auth/login).");
  } finally {
    setLoading(false);
  }
};

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: "100vh",
        background: "#f9fafb",
      }}
    >
      <form
        className="card"
        style={{
          width: 380,
          padding: 30,
          borderRadius: 12,
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          background: "#fff",
        }}
        onSubmit={onSubmit}
      >
        <h2 style={{ marginTop: 0, textAlign: "center" }}>Smart Meeting Login</h2>

        <div style={{ display: "grid", gap: 15, marginTop: 20 }}>
          <input
            className="input"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: 10,
              borderRadius: 6,
              border: "1px solid #ddd",
              fontSize: "1rem",
            }}
          />

          <input
            className="input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: 10,
              borderRadius: 6,
              border: "1px solid #ddd",
              fontSize: "1rem",
            }}
          />

          <button
            type="submit"
            className="btn"
            disabled={loading}
            style={{
              background: "#2563eb",
              color: "#fff",
              padding: 10,
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: 15,
            color: "#555",
            fontSize: "0.9rem",
          }}
        >
          Don’t have an account?{" "}
          <a href="/register" style={{ color: "#2563eb", fontWeight: 600 }}>
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}
