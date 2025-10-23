import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import AutoTable from "../components/AutoTable";

export default function Rooms() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
  api.get("/api/room") // This is the correct route
    .then(res => setRows(Array.isArray(res.data) ? res.data : [res.data]))
    .catch(err => setError(err.message));
}, []);

  return (
    <div style={{display:'flex'}}>
      <Sidebar />
      <main className="content container">
        <h2 style={{marginTop:0}}>Rooms</h2>
        {error ? <div className="card" style={{borderColor:'#ef4444'}}>Error: {error}</div> : <AutoTable rows={rows} />}
      </main>
    </div>
  );
}
