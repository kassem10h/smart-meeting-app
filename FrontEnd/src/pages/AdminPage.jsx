import { useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { isAdmin } from "../services/auth";

export default function AdminPage() {
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [message, setMessage] = useState("");

  if (!isAdmin()) {
    return <div className="card" style={{ margin: 40 }}>⛔ Access denied. Admins only.</div>;
  }

  const createRoom = async () => {
    if (!roomName) return alert("Enter a room name");
    try {
      await api.post("/room", { name: roomName });
      setMessage(`✅ Room "${roomName}" created successfully!`);
    } catch (err) {
      setMessage("❌ Failed to create room: " + (err.response?.data || err.message));
    }
  };

  const updateRoom = async () => {
    if (!roomId || !roomName) return alert("Enter room ID and new name");
    try {
      await api.put(`/room/${roomId}`, { name: roomName });
      setMessage(`✏️ Room ${roomId} updated successfully!`);
    } catch (err) {
      setMessage("❌ Failed to update room: " + (err.response?.data || err.message));
    }
  };

  const deleteRoom = async () => {
    if (!roomId) return alert("Enter a room ID");
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/room/${roomId}`);
      setMessage(`🗑️ Room ${roomId} deleted successfully!`);
    } catch (err) {
      setMessage("❌ Failed to delete room: " + (err.response?.data || err.message));
    }
  };

  const createMeeting = async () => {
    try {
      await api.post("/meeting", {
        title: "New Meeting",
        description: "Created by admin panel",
        date: new Date().toISOString(),
      });
      setMessage("✅ Meeting created successfully!");
    } catch (err) {
      setMessage("❌ Failed to create meeting: " + (err.response?.data || err.message));
    }
  };

  const updateMeeting = async () => {
    if (!meetingId) return alert("Enter meeting ID");
    try {
      await api.put(`/meeting/${meetingId}`, { title: "Updated Meeting" });
      setMessage(`✏️ Meeting ${meetingId} updated successfully!`);
    } catch (err) {
      setMessage("❌ Failed to update meeting: " + (err.response?.data || err.message));
    }
  };

  const deleteMeeting = async () => {
    if (!meetingId) return alert("Enter meeting ID");
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/meeting/${meetingId}`);
      setMessage(`🗑️ Meeting ${meetingId} deleted successfully!`);
    } catch (err) {
      setMessage("❌ Failed to delete meeting: " + (err.response?.data || err.message));
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main className="content container">
        <h1>Admin Control Panel</h1>
        <p>Manage Rooms and Meetings here.</p>

        {message && <div className="card" style={{ marginBottom: 20 }}>{message}</div>}

        <div className="card" style={{ marginBottom: 30 }}>
          <h2>🏢 Room Management</h2>
          <input className="input" placeholder="Room Name" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
          <input className="input" placeholder="Room ID (for update/delete)" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            <button className="btn" onClick={createRoom}>Create Room</button>
            <button className="btn" onClick={updateRoom}>Update Room</button>
            <button className="btn" style={{ background: "#ef4444" }} onClick={deleteRoom}>Delete Room</button>
          </div>
        </div>

        <div className="card">
          <h2>📅 Meeting Management</h2>
          <input className="input" placeholder="Meeting ID (for update/delete)" value={meetingId} onChange={(e) => setMeetingId(e.target.value)} />
          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            <button className="btn" onClick={createMeeting}>Create Meeting</button>
            <button className="btn" onClick={updateMeeting}>Update Meeting</button>
            <button className="btn" style={{ background: "#ef4444" }} onClick={deleteMeeting}>Delete Meeting</button>
          </div>
        </div>
      </main>
    </div>
  );
}
