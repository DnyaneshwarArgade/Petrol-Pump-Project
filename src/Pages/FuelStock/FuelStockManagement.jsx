import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaPlus, FaTrash, FaSearch, FaTimes, FaPen } from "react-icons/fa";
import "./FuelStock.css";

function FuelStockManagement() {
  const [showForm, setShowForm] = useState(false);
  const [fuelType, setFuelType] = useState("Petrol");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [quantityError, setQuantityError] = useState("");

  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem("fuelRecords");
    return saved ? JSON.parse(saved) : [];
  });

  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setDate(new Date().toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    localStorage.setItem("fuelRecords", JSON.stringify(records));
  }, [records]);

  const getUnit = (type) => (type === "CNG" ? "Kg" : "Liters");

  const resetForm = () => {
    setFuelType("Petrol");
    setQuantity("");
    setDate(new Date().toISOString().split("T")[0]);
    setEditId(null);
    setQuantityError("");
  };

  const handleAddStock = () => {
    if (!quantity || Number(quantity) <= 0) {
      setQuantityError("Please enter valid quantity");
      return;
    }

    setQuantityError("");

    // EDIT MODE
    if (editId) {
      Swal.fire({
        title: "Do you want to edit this stock?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#2961ef",
        cancelButtonColor: "#6c757d",
      }).then((result) => {
        if (result.isConfirmed) {
          setRecords((prev) =>
            prev.map((r) =>
              r.id === editId
                ? { ...r, fuelType, quantity, unit: getUnit(fuelType), date }
                : r
            )
          );

          resetForm();
          setShowForm(false);

          Swal.fire({
            icon: "success",
            title: "Edited Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
      return;
    }

    // ADD MODE
    const newRecord = {
      id: Date.now(),
      fuelType,
      quantity,
      unit: getUnit(fuelType),
      date,
    };

    setRecords([newRecord, ...records]);
    setCurrentPage(1);

    resetForm();
    setShowForm(false);

    Swal.fire({
      icon: "success",
      title: "Stock Added Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This record will be deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = records.filter((r) => r.id !== id);
        setRecords(updated);

        const pages = Math.ceil(updated.length / itemsPerPage);
        if (currentPage > pages) setCurrentPage(pages || 1);

        Swal.fire({
          icon: "success",
          title: "Deleted Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleEdit = (record) => {
    setFuelType(record.fuelType);
    setQuantity(record.quantity);
    setDate(record.date);
    setEditId(record.id);
    setQuantityError("");
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
        <button
          className="add-stock-btn"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <FaPlus /> Add Stock
        </button>

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
                        <FaPen size={16} color="#2f80ed" />
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

      {filteredRecords.length > itemsPerPage && (
        <div className="rt-pagination mb-5 mt-1">
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

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ textAlign: "center" }}>
                {editId ? "Edit Stock" : "Add New Stock"}
              </h3>
              <FaTimes
                className="modal-close"
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
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
              onChange={(e) => {
                setQuantity(e.target.value);
                setQuantityError("");
              }}
            />
            {quantityError && <p className="error-text">{quantityError}</p>}

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
