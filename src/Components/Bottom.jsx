   import React from 'react';  
   import '../Components/Bottom.css';

   import { NavLink } from "react-router-dom";
   import { FaTachometerAlt, FaUsers, FaChartBar } from "react-icons/fa";

   const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/Dashboard" className="nav-item">
        <FaTachometerAlt className="icon" />
        <span>Dashboard</span>
      </NavLink>

      <NavLink to="/StaffManagement" className="nav-item">
        <FaUsers className="icon" />
        <span>Staff Management</span>
      </NavLink>

      <NavLink to="/Reports" className="nav-item">
        <FaChartBar className="icon" />
        <span>Reports</span>
      </NavLink>
    </nav>
    );
   };

export default BottomNav;     