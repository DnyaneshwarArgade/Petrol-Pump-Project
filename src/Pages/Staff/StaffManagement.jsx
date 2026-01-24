<<<<<<< HEAD
import React, { useState } from "react";
import "..pages/StaffManagement.css";
=======
import React, { useState, useEffect } from "react";
import "./StaffManagement.css";
>>>>>>> ca53b8f499dd44ccd7c8070f49a7d0fff9f39ef1
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AddEmp from "./AddEmp";
import Swal from "sweetalert2";

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
  const [isEdit, setIsEdit] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [search, setSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Load employees
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem("employees");
    return saved ? JSON.parse(saved) : [];
  });

  // Save employees
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  // Reset page on search
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Add employee
  const handleAddEmployee = (employeeData) => {
    const newEmployee = { ...employeeData, id: Date.now() };
    setEmployees(prev => [newEmployee, ...prev]);
  };

  // Update employee
  const handleUpdateEmployee = (updatedEmployee) => {
    setEmployees(prev =>
      prev.map(emp => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
    );
  };

  // Delete Record
  const handleDelete = (empId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This record will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setEmployees(prev =>
          prev.filter(e => e.id !== empId)
        );

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Employee record has been deleted.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };


  // 🔍 SEARCH ALL DATA (before pagination)
  const filteredData = employees.filter(emp =>
    emp.name?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination after search
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container-fluid px-4 py-3 main-bg">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Employee Management</h3>
      </div>

      {/* Cards */}
      <div className="row g-4 mb-4">
        <Card icon={<BsPeopleFill />} title="All Employees" count={employees.length} color="#0F8A4B" />
        <Card icon={<BsPersonLinesFill />} title="Attendants" count={employees.filter(e => e.jobTitle === "Attendant").length} color="#00B8E6" />
        <Card icon={<BsPersonBadgeFill />} title="Cashiers" count={employees.filter(e => e.jobTitle === "Cashier").length} color="#FFC107" />
        <Card icon={<BsPersonCheckFill />} title="Managers" count={employees.filter(e => e.jobTitle === "Manager").length} color="#0D6EFD" />
        <Card icon={<BsPersonFillCheck />} title="Active Staff" count={employees.filter(e => e.status === "Active").length} color="#0F8A4B" />
      </div>

      {/* Manage Section */}
      <div className="manage-box mb-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-3">
          <div className="flex-grow-1 w-100">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="fw-bold mb-0">Manage Employees</h4>
              <button className="btn-add d-none d-md-flex" onClick={() => { setIsEdit(false); setSelectedEmployee(null); setShowModal(true); }}>+</button>
            </div>

            {/* Search */}
            <div className="d-flex align-items-center gap-2 mt-3 w-100">
              <div className="search-box flex-grow-1 position-relative d-flex align-items-center">
                <BsSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search Employee..."
                  className="w-100 ps-4 pe-4"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <span className="input-clear" onClick={() => setSearch("")}>✕</span>
                )}
              </div>

              <button className="btn-add d-md-none" onClick={() => { setIsEdit(false); setSelectedEmployee(null); setShowModal(true); }}>+</button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr className="table-secondary">
                <th>Employee</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Shift</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map(emp => (
                  <tr key={emp.id}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <FaUserCircle className="user-icon" />
                        <div>
                          <div className="fw-bold">{emp.name}</div>
                          <small className="text-muted">{emp.jobTitle}</small>
                        </div>
                      </div>
                    </td>
                    <td>{emp.email}</td>
                    <td>{emp.phone}</td>
                    <td>{emp.shift}</td>
                    <td>{emp.status}</td>
                    <td>
                      <div className="action-icons">
                        <div className="icon-box edit-box" onClick={() => { setSelectedEmployee(emp); setIsEdit(true); setShowModal(true); }}>
                          <BsPencilSquare />
                        </div>

                        <div
                          className="icon-box delete-box"
                          onClick={() => handleDelete(emp.id)}
                        >
                          <BsTrashFill />
                        </div>


                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted">No employee found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mb-4">
        {filteredData.length > itemsPerPage && (
          <div className="rt-pagination">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>««</button>
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>«</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} className={currentPage === i + 1 ? "active" : ""} onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </button>
            ))}
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>»</button>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>»»</button>
          </div>
        )}
      </div>

      <AddEmp
        showModal={showModal}
        setShowModal={setShowModal}
        isEdit={isEdit}
        selectedEmployee={selectedEmployee}
        onAdd={handleAddEmployee}
        onUpdate={handleUpdateEmployee}
      />
    </div>
  );
};

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
