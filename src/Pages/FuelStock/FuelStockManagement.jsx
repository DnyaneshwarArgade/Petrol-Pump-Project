import React, { useState } from "react";
import "./FuelStock.css";

function FuelStockManagement() {
  const [fuelType, setFuelType] = useState("Petrol");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");

  const [stock, setStock] = useState({
    Petrol: 0,
    Diesel: 0,
    CNG: 0,
  });

  const handleAddStock = () => {
    if (!quantity || !date) {
      alert("Please enter quantity and date");
      return;
    }

    setStock((prev) => ({
      ...prev,
      [fuelType]: prev[fuelType] + Number(quantity),
    }));

    setQuantity("");
    setDate("");
  };

  return (
    <div className="fuel-container">
      <h2 className="page-title">Fuel Stock Management</h2>

      <div className="card-wrapper">
        {/* Fuel Type Card */}
        <div className="card">
          <h3>Fuel Type</h3>

          <div className="fuel-buttons">
            {["Petrol", "Diesel", "CNG"].map((type) => (
              <button
                key={type}
                className={fuelType === type ? "active" : ""}
                onClick={() => setFuelType(type)}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="stock-display">
            <p>
              <strong>Selected Fuel:</strong> {fuelType}
            </p>
            <p>
              <strong>Current Stock:</strong> {stock[fuelType]} Liters
            </p>
          </div>
        </div>

        {/* New Stock Entry Card */}
        <div className="card">
          <h3>New Stock Entry</h3>

          <div className="form-group">
            <label>Quantity Added (Liters)</label>
            <input
              type="number"
              placeholder="Enter Liters"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <button className="add-btn" onClick={handleAddStock}>
            Add Stock
          </button>
        </div>
      </div>
    </div>
  );
}

export default FuelStockManagement;