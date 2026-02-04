import React, { useState,useEffect } from "react";
import "./StaffManagement.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AddEmp from "./AddEmp";
import Swal from "sweetalert2";
import { FaUserCircle, FaPen, FaTrash } from "react-icons/fa";


import {
  BsPeopleFill,
  // BsPersonLinesFill,
  BsPersonBadgeFill,
  BsPersonCheckFill,
  BsPersonFillCheck,
  BsSearch,
  // BsPencilSquare,
  // BsTrashFill
} from "react-icons/bs";


// import { FaUserCircle } from "react-icons/fa";

const EmployeeManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");


  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Load employees from localStorage
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem("employees");
    return saved ? JSON.parse(saved) : [];
  });

  // Save employees to localStorage
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  // Reset page on search
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Add Employee
  const handleAddEmployee = (employeeData) => {
    const newEmployee = { ...employeeData, id: Date.now() };
    setEmployees(prev => [newEmployee, ...prev]);
  };

  // Update Employee
  const handleUpdateEmployee = (updatedEmployee) => {
    setEmployees(prev =>
      prev.map(emp => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
    );
  };

  // Delete Employee
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
        setEmployees(prev => prev.filter(e => e.id !== empId));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Employee record deleted.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };
      
  const handleEdit = (emp) => {
  setSelectedEmployee(emp);
  setIsEdit(true);
  setShowModal(true);
     };

    //Search & Button Filter
    const filteredEmployees = employees
  .filter(emp =>
    emp.name?.toLowerCase().includes(search.toLowerCase()) ||
    emp.jobTitle?.toLowerCase().includes(search.toLowerCase()) ||
    emp.email?.toLowerCase().includes(search.toLowerCase())
  )
  .filter(emp => {
    if (activeFilter === "all") return true;
    if (activeFilter === "cashier") return emp.jobTitle === "Cashier";
    if (activeFilter === "manager") return emp.jobTitle === "Manager";
    if (activeFilter === "active") return emp.status === "Active";
    return true;
  });
  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

  // Fix: If current page becomes empty after delete, go to previous page
    useEffect(() => {
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  }
  if (totalPages === 0) {
    setCurrentPage(1);
  }
     }, [filteredEmployees.length, totalPages, currentPage]);




  return (
    <div className="container-fluid px-4 py-3 main-bg">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3 className="fw-bold mb-2">Employee Management</h3>
      </div>
     

      {/* Cards */}
      <div className="row g-4 mb-4">
        <Card icon={<BsPeopleFill />} title="All Employees" count={employees.length} color="#0F8A4B" />
        {/* <Card icon={<BsPersonLinesFill />} title="Attendants" count={employees.filter(e => e.jobTitle === "Attendant").length} color="#00B8E6" /> */}
        <Card icon={<BsPersonBadgeFill />} title="Cashiers" count={employees.filter(e => e.jobTitle === "Cashier").length} color="#FFC107" />
        <Card icon={<BsPersonCheckFill />} title="Managers" count={employees.filter(e => e.jobTitle === "Manager").length} color="#0D6EFD" />
        <Card icon={<BsPersonFillCheck />} title="Active Staff" count={employees.filter(e => e.status === "Active").length} color="#198754" />
      </div>

      {/* Manage Section */}
      <div className="manage-box mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
         <h4 className="fw-bold mb-3">Manage Employees</h4>
         </div>
{/* 🔘 Filters + Search + Add */}
<div className="emp-topbar">
  {/* Filters */}
  <div className="emp-filters">
    <button
      className={activeFilter === "all" ? "active" : ""}
      onClick={() => setActiveFilter("all")}
    >
      All
    </button>
    <button
      className={activeFilter === "cashier" ? "active" : ""}
      onClick={() => setActiveFilter("cashier")}
    >
      Cashier
    </button>
    <button
      className={activeFilter === "manager" ? "active" : ""}
      onClick={() => setActiveFilter("manager")}
    >
      Manager
    </button>
    <button
      className={activeFilter === "active" ? "active" : ""}
      onClick={() => setActiveFilter("active")}
    >
      Active
    </button>
  </div>

  {/* Search */}
  <div className="emp-search">
    <BsSearch className="emp-search-icon" />
    <input
      type="text"
      placeholder="Search employees..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    {search && (
      <span className="emp-clear" onClick={() => setSearch("")}>
        ✕
      </span>
    )}
  </div>

  {/* Add Button */}
  <button
    className="emp-add-btn"
    onClick={() => {
      setIsEdit(false);
      setSelectedEmployee(null);
      setShowModal(true);
    }} >
    + Add Employee
       </button>
          </div>

    {/* Employee Table */}
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
              <td className="action-td">
  <div className="action-icons">

    {/* EDIT */}
    <span
      className="edit-icon"
      onClick={() => handleEdit(emp)}
      title="Edit"
    >
      <FaPen size={16} />
    </span>

    {/* DELETE */}
    <span
      className="delete-icon"
      onClick={() => handleDelete(emp.id)}
      title="Delete">
      <FaTrash size={16} />
     </span>

          </div>
             </td>
            </td> </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No employee found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {filteredEmployees.length > itemsPerPage && (
        <div className="rt-pagination mb-4">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>««</button>
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>«</button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>»</button>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>»»</button>
        </div>
      )}

      {/* Add/Edit Modal */}
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

// Card Component
const Card = ({ icon, title, count, color }) => (
  <div className="col-12 col-sm-6 col-lg-3">
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