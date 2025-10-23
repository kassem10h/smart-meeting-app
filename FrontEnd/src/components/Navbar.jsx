import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{padding:'10px 16px', position:'sticky', top:0, zIndex:40}}>
      <div style={{display:'flex', alignItems:'center', gap:14}}>
        <span className="brand">Smart Meeting</span>
        <Link to="/dashboard" className="link">Dashboard</Link>
        <Link to="/meetings" className="link">Meetings</Link>
        <Link to="/employees" className="link">Employees</Link>
        <Link to="/rooms" className="link">Rooms</Link>
      </div>
    </nav>
  );
}
