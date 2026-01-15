import React from "react";
import "../Pages/StaffManagement.css";


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  BsPeopleFill,
  BsPersonLinesFill,
  BsPersonBadgeFill,
  BsPersonCheckFill,
  BsBellFill,
  BsSearch
} from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const EmployeeManagement = () => {
  return (
    <div className="container-fluid px-4 py-3 main-bg">

      {/* ===== HEADER ===== */}
      <div className="d-flex justify-content-between align-items-center mb-4 header-bar">
        <div>
          <h3 className="fw-bold">Employee Management</h3>
          <p className="text-muted mb-0">Home / Employee Management</p>
        </div>

        <div className="d-flex align-items-center gap-3">
          <span className="text-muted d-none d-md-block">
            Tuesday, April 25, 2024 | 08:25 AM
          </span>
          <div className="icon-circle"><BsBellFill /></div>
          <div className="icon-circle"><MdEmail /></div>
          <div className="icon-circle"><FaUserCircle /></div>
        </div>
      </div>

      {/* ===== TOP CARDS ===== */}
      <div className="row g-4 mb-4">
        <Card icon={<BsPeopleFill />} title="All Employees" count="12" color="#0F8A4B" />
        <Card icon={<BsPersonLinesFill />} title="Attendants" count="6" color="#00B8E6" />
        <Card icon={<BsPersonBadgeFill />} title="Cashiers" count="2" color="#FFC107" />
        <Card icon={<BsPersonCheckFill />} title="Managers" count="1" color="#0D6EFD" />
        <Card icon={<BsBellFill />} title="Pending Requests" count="3" color="#0F8A4B" bg="#E9F7EF" />
      </div>

      {/* ===== MANAGE EMPLOYEES ===== */}
      <div className="manage-box">

        {/* Title + Search */}
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <h5 className="fw-bold mb-0">Manage Employees</h5>

          <div className="search-box">
            <BsSearch />
            <input type="text" placeholder="Search" />
          </div>
        </div>

        {/* ===== FILTER ROW ===== */}
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">

          {/* Left Filters */}
          <div className="d-flex gap-3 flex-wrap">
            <select className="form-select filter-select">
              <option>All Departments</option>
            </select>

            <select className="form-select filter-select">
              <option>Filter by Status</option>
            </select>
          </div>

          {/* Right Settings + Export */}
          <div className="d-flex gap-2">
            <button className="btn btn-light filter-icon-btn">⚙️</button>

            <div className="dropdown">
              <button
                className="btn btn-success btn-sm dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                ⬇ Export
              </button>

              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#">📄 PDF</a></li>
                <li><a className="dropdown-item" href="#">📊 Excel</a></li>
                <li><a className="dropdown-item" href="#">📑 CSV</a></li>
              </ul>
            </div>
          </div>

        </div>

        {/* ===== TABLE ===== */}
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>Employee</th>
                <th>Job Title</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Shift</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td><input type="checkbox" /></td>

                <td>
                  <div className="d-flex align-items-center gap-2">
                    <FaUserCircle className="user-icon" />
                    <div>
                      <div className="fw-bold">David Miller</div>
                      <small className="text-muted">Attendant</small>
                    </div>
                  </div>
                </td>

                <td>Attendant</td>
                <td>david.miller@gmail.com</td>
                <td>9858755565</td>
                <td>
                  {/* <span className="shift-day">Day</span> */}

                  
                  <select className="form-select shift-select">
                 <option>Day</option>
               <option>Evening</option>
                 <option>Night</option>
                 <option>Afternoon</option>
            </select>

                
                </td>
                <td><span className="status-active">Active</span></td>
                <td>
                  <button className="btn btn-light btn-sm">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
          <button className="btn btn-light btn-sm">Delete Selected</button>
          <small className="text-muted">Showing 1 of 1</small>
          <div className="pagination-box">
            <button className="page-btn active">1</button>
          </div>
        </div>

      </div>
    </div>
  );
};

/* Card Component */
const Card = ({ icon, title, count, color, bg }) => (
  <div className="col-12 col-sm-6 col-md-4 col-lg-2 flex-grow-1">
    <div className="emp-card" style={{ background: bg || "#fff" }}>
      <div className="emp-icon" style={{ background: color }}>{icon}</div>
      <div>
        <p className="mb-1 text-muted">{title}</p>
        <h4 className="fw-bold mb-0">{count}</h4>
      </div>
    </div>
  </div>
);

export default EmployeeManagement;
