import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Swal from "sweetalert2";
import "./StaffManagement.css";

import {
  BsPeopleFill,
  BsPersonLinesFill,
  BsPersonBadgeFill,
  BsPersonCheckFill,
  BsPersonFillCheck,
  BsSearch,
  BsPencilSquare,
  BsTrashFill
} from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

const EmployeeManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [employeeStatus, setEmployeeStatus] = useState("Active");

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This employee will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Delete!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Employee has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  };

  const handleSaveEmployee = (e) => {
    e.preventDefault();
    console.log("Employee Saved!");
    setShowModal(false);
  };

  const handleUpdateEmployee = (e) => {
    e.preventDefault();
    console.log("Employee Updated!");
    setShowEditModal(false);
  };

  return (
    <div className="container-fluid px-4 py-3 main-bg">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h3 className="fw-bold">Employee Management</h3>
        <div className="date-time">
          Thursday, April 25, 2024 | 8:25 AM
        </div>
      </div>

      {/* Cards */}
      <div className="row g-4 mb-4">
        <Card icon={<BsPeopleFill />} title="All Employees" count="12" color="#0F8A4B" />
        <Card icon={<BsPersonLinesFill />} title="Attendants" count="6" color="#00B8E6" />
        <Card icon={<BsPersonBadgeFill />} title="Cashiers" count="2" color="#FFC107" />
        <Card icon={<BsPersonCheckFill />} title="Managers" count="1" color="#0D6EFD" />
        <Card icon={<BsPersonFillCheck />} title="Present Staff" count="8" color="#0F8A4B" />
      </div>

      {/* Manage Section */}
      <div className="manage-box">
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-3 gap-4">
          <div>
            <h4 className="fw-bold mb-2">Manage Employees</h4>
            <div className="search-box">
              <BsSearch />
              <input type="text" placeholder="Search Employee..." />
            </div>
          </div>

          {/* Add & Export */}
          <div className="d-flex gap-2">
            <button className="btn-add" onClick={() => setShowModal(true)}>
              + Add
            </button>

            <div className="dropdown">
              <button className="btn-export dropdown-toggle" data-bs-toggle="dropdown">
                ⬇ Export
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#">📄 PDF</a></li>
                <li><a className="dropdown-item" href="#">📊 Excel</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Employee Table */}
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
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
                <td>
                  <div className="d-flex align-items-center gap-3">
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
                  <select className="form-select shift-select">
                    <option>Day</option>
                    <option>Night</option>
                  </select>
                </td>
                <td>
                  <select
                    className="status-select"
                    value={employeeStatus}
                    onChange={(e) => setEmployeeStatus(e.target.value)}
                    style={{
                      background: employeeStatus === "Active" ? "#d1f5dd" : "#ffd6d6",
                      color: employeeStatus === "Active" ? "#0F8A4B" : "#dc3545",
                    }}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </td>
                <td>
                  <div className="action-icons">
                    <BsPencilSquare className="edit-icon" onClick={() => setShowEditModal(true)} />
                    <BsTrashFill className="delete-icon" onClick={handleDelete} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD EMPLOYEE MODAL */}
      {showModal && (
        <div className="modal fade show modal-bg" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content add-modal">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">Add New Employee</h5>
                <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
              </div>

              <div className="modal-body">
                <form onSubmit={handleSaveEmployee}>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Employee Name</label>
                      <input className="form-control custom-input" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Job Title</label>
                      <input className="form-control custom-input" required />
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Email Address</label>
                      <input type="email" className="form-control custom-input" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Contact Number</label>
                      <input type="tel" className="form-control custom-input" required />
                    </div>
                  </div>

                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label">Shift</label>
                      <select className="form-control custom-input" required>
                        <option>Select Shift</option>
                        <option>Day</option>
                        <option>Night</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Status</label>
                      <select className="form-control custom-input" required>
                        <option>Select Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end gap-3">
                    <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn-save">
                      Save Employee
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT EMPLOYEE MODAL */}
      {showEditModal && (
        <div className="modal fade show modal-bg" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content add-modal">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">Edit Employee</h5>
                <button className="close-btn" onClick={() => setShowEditModal(false)}>×</button>
              </div>

              <div className="modal-body">
                <form onSubmit={handleUpdateEmployee}>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Employee Name</label>
                      <input className="form-control custom-input" defaultValue="David Miller" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Job Title</label>
                      <input className="form-control custom-input" defaultValue="Attendant" required />
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Email Address</label>
                      <input className="form-control custom-input" defaultValue="david.miller@gmail.com" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Contact Number</label>
                      <input className="form-control custom-input" defaultValue="9858755565" required />
                    </div>
                  </div>

                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label">Shift</label>
                      <select className="form-control custom-input" required>
                        <option>Day</option>
                        <option>Night</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Status</label>
                      <select className="form-control custom-input" required>
                        <option selected>Active</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end gap-3">
                    <button type="button" className="btn-cancel" onClick={() => setShowEditModal(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn-save">
                      Update Employee
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// Card Component
const Card = ({ icon, title, count, color }) => (
  <div className="col">
    <div className="emp-card">
      <div className="emp-icon" style={{ background: color }}>{icon}</div>
      <div>
        <p className="mb-1">{title}</p>
        <h4 className="fw-bold">{count}</h4>
      </div>
    </div>
  </div>
);

export default EmployeeManagement;
