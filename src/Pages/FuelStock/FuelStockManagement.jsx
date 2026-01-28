import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import "./FuelStock.css";

function FuelStockManagement() {
  const [showForm, setShowForm] = useState(false);
  const [fuelType, setFuelType] = useState("Petrol");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");

  // Lazy initialization for records
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem("fuelRecords");
    return saved ? JSON.parse(saved) : [];
  });

  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Initialize date
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("fuelRecords", JSON.stringify(records));
  }, [records]);

  const getUnit = (type) => (type === "CNG" ? "Kg" : "Liters");

  // Add or Update Stock
  const handleAddStock = () => {
    if (!quantity) {
      alert("Please enter quantity");
      return;
    }

    if (editId) {
      setRecords(
        records.map((r) =>
          r.id === editId
            ? { ...r, fuelType, quantity, unit: getUnit(fuelType), date }
            : r
        )
      );
    } else {
      const newRecord = {
        id: Date.now(),
        fuelType,
        quantity,
        unit: getUnit(fuelType),
        date,
      };
      setRecords([newRecord, ...records]);
    }

    setQuantity("");
    setFuelType("Petrol");
    setEditId(null);
    setShowForm(false);
  };

  // Delete record
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This record will be deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        setRecords(records.filter((r) => r.id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Record deleted successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // Edit record
  const handleEdit = (record) => {
    setFuelType(record.fuelType);
    setQuantity(record.quantity);
    setDate(record.date);
    setEditId(record.id);
    setShowForm(true);
  };

  // Filtered records
  const filteredRecords = records.filter((r) => {
    const term = searchTerm.toLowerCase();
    return (
      r.fuelType.toLowerCase().includes(term) ||
      r.quantity.toString().includes(term) ||
      r.date.includes(term)
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecords = filteredRecords.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="fuel-container">
      <h2 className="page-title">Fuel Stock Management</h2>

      {/* Top bar */}
      <div className="top-bar">
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search stock..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // reset page on search
            }}
            className="search-input"
          />
        </div>

        <button className="add-stock-btn" onClick={() => setShowForm(true)}>
          <FaPlus style={{ marginRight: "6px" }} /> Add Stock
        </button>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="fuel-table">
          <thead>
            <tr>
              <th>Fuel Type</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedRecords.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">
                  No records found
                </td>
              </tr>
            ) : (
              paginatedRecords.map((rec) => (
                <tr key={rec.id}>
                  <td>{rec.fuelType}</td>
                  <td>{rec.quantity}</td>
                  <td>{rec.unit}</td>
                  <td>{rec.date}</td>
                  <td>
                    <div className="action-icons">
                      <span
                        className="edit-icon"
                        title="Edit"
                        onClick={() => handleEdit(rec)}
                      >
                        <FaEdit />
                      </span>

                      <span
                        className="delete-icon"
                        title="Delete"
                        onClick={() => handleDelete(rec.id)}
                      >
                        <FaTrash />
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredRecords.length > itemsPerPage && (
        <div className="rt-pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            ««
          </button>

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            «
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            »
          </button>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            »»
          </button>
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editId ? "Edit Stock" : "Add New Stock"}</h3>

            <label>Fuel Type</label>
            <select
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
            >
              <option>Petrol</option>
              <option>Diesel</option>
              <option>CNG</option>
            </select>

            <label>Quantity ({getUnit(fuelType)})</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <div className="modal-actions">
              <button className="save-btn" onClick={handleAddStock}>
                Save
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowForm(false);
                  setEditId(null);
                  setQuantity("");
                  setFuelType("Petrol");
                  const today = new Date().toISOString().split("T")[0];
                  setDate(today);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FuelStockManagement;