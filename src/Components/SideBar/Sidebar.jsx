import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <>
      <div className={`sidebar right ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar} aria-label="Close sidebar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        {/* <div className="sidebar-header">
          <div className="sidebar-avatar">PP</div>
          <div className="sidebar-title">Petrol Pump</div>
        </div> */}

        <div className="sidebar-content">
          <Link to="/dashboard" onClick={toggleSidebar}>Dashboard</Link>
          <Link to="/register" onClick={toggleSidebar}>Register</Link>
          <Link to="/nozzle" onClick={toggleSidebar}>Nozzle</Link>
          <Link to="/" onClick={toggleSidebar}>Logout</Link>
        </div>
      </div>

      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
}

export default Sidebar;
