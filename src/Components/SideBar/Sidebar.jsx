import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <>
      {/* <div className={`sidebar ${isOpen ? "open" : ""}`}> */}
      <div>
        <ul>
          <li onClick={toggleSidebar}><Link to="/dashboard">dashboard</Link></li>
          <li onClick={toggleSidebar}><Link to="/staffmanagement">staffmanagement</Link></li>
          <li onClick={toggleSidebar}><Link to="/reports">reports</Link></li>
          <li onClick={toggleSidebar}><Link to="/nozzle">nozzle</Link></li>
        </ul>
      </div>

      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
}

export default Sidebar;
