import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaTimes } from "react-icons/fa";
import "./FuelStock.css";

function FuelStockManagement() {
  const [showForm, setShowForm] = useState(false);
  const [fuelType, setFuelType] = useState("Petrol");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");

  // Detect localhost
  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem("fuelRecords");
    return saved ? JSON.parse(saved) : [];
  });

  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  useEffect(() => {
    localStorage.setItem("fuelRecords", JSON.stringify(records));
  }, [records]);

  const getUnit = (type) => (type === "CNG" ? "Kg" : "Liters");

  // ✅ Add / Update Stock (final logic)
  const handleAddStock = () => {
    if (!quantity) {
      if (!isLocalhost) {
        Swal.fire({
          icon: "warning",
          title: "Validation Error",
          text: "Please enter quantity",
        });
      }
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
      setCurrentPage(1); // new record → go to first page
    }

    setQuantity("");
    setFuelType("Petrol");
    setEditId(null);
    setShowForm(false);
  };

  // ✅ Delete record (pagination-safe)
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
        const updatedRecords = records.filter((r) => r.id !== id);
        setRecords(updatedRecords);

        // 🔥 FIX: handle empty page after delete
        const newTotalPages = Math.ceil(
          updatedRecords.length / itemsPerPage
        );

        if (currentPage > newTotalPages) {
          setCurrentPage(newTotalPages || 1);
        }
      }
    });
  };

  const handleEdit = (record) => {
    setFuelType(record.fuelType);
    setQuantity(record.quantity);
    setDate(record.date);
    setEditId(record.id);
    setShowForm(true);
  };

  const filteredRecords = records.filter((r) => {
    const term = searchTerm.toLowerCase();
    return (
      r.fuelType.toLowerCase().includes(term) ||
      r.quantity.toString().includes(term) ||
      r.date.includes(term)
    );
  });

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecords = filteredRecords.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="fuel-container">
      <h2 className="page-title">Fuel Stock Management</h2>

      <div className="top-bar">
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search stock..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />
          {searchTerm && (
            <FaTimes
              className="clear-icon"
              onClick={() => {
                setSearchTerm("");
                setCurrentPage(1);
              }}
            />
          )}
        </div>

        <button className="add-stock-btn" onClick={() => setShowForm(true)}>
          <FaPlus /> Add Stock
        </button>
      </div>

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
                        onClick={() => handleEdit(rec)}
                      >
                        <FaEdit />
                      </span>
                      <span
                        className="delete-icon"
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
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editId ? "Edit Stock" : "Add New Stock"}</h3>
              <FaTimes
                className="modal-close"
                onClick={() => setShowForm(false)}
              />
            </div>

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

            <div className="modal-actions right">
              <button className="save-btn" onClick={handleAddStock}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FuelStockManagement;
