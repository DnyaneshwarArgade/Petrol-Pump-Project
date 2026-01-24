import React from "react";
import Swal from "sweetalert2";
import { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Reports.css";

const data = [
  { date: "23 Apr 2024", pumpId: "PUMP-101", fuelType: "Petrol", volume: "1,800 L", amount: "₹16,650" },
  { date: "23 Apr 2024", pumpId: "PUMP-102", fuelType: "Diesel", volume: "900 L", amount: "₹62,230" },
  { date: "23 Apr 2024", pumpId: "PUMP-103", fuelType: "CNG", volume: "70 kg", amount: "₹1,300" },
  { date: "23 Apr 2024", pumpId: "PUMP-103", fuelType: "Diesel", volume: "1,200 L", amount: "₹33,180" },
  { date: "23 Apr 2024", pumpId: "PUMP-101", fuelType: "Petrol", volume: "1,800 L", amount: "₹16,650" },
  { date: "23 Apr 2024", pumpId: "PUMP-102", fuelType: "Diesel", volume: "900 L", amount: "₹62,230" },
  { date: "23 Apr 2024", pumpId: "PUMP-103", fuelType: "CNG", volume: "70 kg", amount: "₹1,300" },
  { date: "23 Apr 2024", pumpId: "PUMP-103", fuelType: "Diesel", volume: "1,200 L", amount: "₹33,180" },
  { date: "23 Apr 2024", pumpId: "PUMP-101", fuelType: "Petrol", volume: "1,800 L", amount: "₹16,650" },
  { date: "23 Apr 2024", pumpId: "PUMP-103", fuelType: "Diesel", volume: "1,200 L", amount: "₹33,180" },
  { date: "23 Apr 2024", pumpId: "PUMP-103", fuelType: "Diesel", volume: "1,200 L", amount: "₹33,180" },
];
const itemsPerPage = 10;

const Reports = () => {
  const inputRef = useRef(null);

  const [showClear, setShowClear] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  /* SEARCH */
  const handleSearch = () => {
    const value = inputRef.current.value;
    setSearchText(value);
    setShowClear(value.length > 0);

    if (value.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const matched = [
      ...new Set(
        data
          .flatMap(item => Object.values(item))
          .map(v => v.toString())
          .filter(v =>
            v.toLowerCase().includes(value.toLowerCase())
          )
      )
    ].slice(0, 6);

    setSuggestions(matched);
    setShowSuggestions(true);
  };
  const handleSuggestionClick = (text) => {
    inputRef.current.value = text;
    setSearchText(text);
    setShowSuggestions(false);
    setShowClear(true);
  };
  const clearSearch = () => {
    inputRef.current.value = "";
    setSearchText("");
    setShowClear(false);
    setShowSuggestions(false);
    inputRef.current.focus();
  };
  /* FILTER */
  const filteredData = data.filter(item =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );
  /* PAGINATION */
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <>
      <div className="container-fluid p-2">
        <div className="d-flex align-items-center  justify-content-between">
          <h4 className="mb-0 fw-bold">Report Management</h4>
        </div>
        <div className="banner mt-2">
          <img src="src/assets/report_banner_cropped.jpg"
            alt="Gas Station"
            className="img-fluid rounded"
          />
        </div>
      </div>
      <div className="container-fluid p-1">
        <div className="row g-2">
          <div className="col-lg-4 col-md-6">
            <div className="card stats-card">
              <div className="card-body d-flex align-items-center">
                <div className="icon-box icon-green me-3 ">
                  <h2 className="m-4"><i className="bi bi-currency-rupee"></i></h2>
                </div>
                <div>
                  <div className="card-title">Total Sales</div>
                  <div className="card-value">₹ 4,85,720</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card stats-card">
              <div className="card-body d-flex align-items-center">
                <div className="icon-box icon-orange me-3">
                  <h4 className="m-4"><i className="bi bi-fuel-pump"></i></h4>
                </div>
                <div>
                  <div className="card-title">Total Fuels Dispensed</div>
                  <div className="card-value"> ₹ 18,290 L</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="card stats-card">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="icon-box icon-red me-3">
                    <h4 className="m-4"><i className="bi bi-receipt"></i></h4>
                  </div>
                  <div>
                    <div className="card-title">Total Expenses</div>
                    <div className="card-value">₹ 1,23,350</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid px-3 mt-2 mb-3">
        <h4 className="fw-bold mb-3">Fuel Sales Summary</h4>
        <div className="row g-3">
          <div className="col-md-4">
            <div className="summary-card m-1">
              <div className="card-header-custom petrol">
                {/* <h1>⛽Petrol</h1> */}
                <h1><i className="bi bi-fuel-pump m-3"></i>Petrol</h1>
              </div>
              <div className="card-body-custom">
                <div className="fuel-value">12,540  L</div>
                <div className="fuel-amount">₹ 1,15,920</div>
                <div className="earned">Earned</div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="summary-card m-1">
              <div className="card-header-custom diesel">
                {/* <h1>⛽Diesel</h1> */}
                <h1><i className="bi bi-fuel-pump m-3"></i>Petrol</h1>
              </div>
              <div className="card-body-custom">
                <div className="fuel-value">5,200 L</div>
                <div className="fuel-amount">₹ 3,59,600</div>
                <div className="earned">Earned</div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="summary-card m-1">
              <div className="card-header-custom cng">
                {/* <h1> 🏭CNG </h1> */}
                <h1><i className="bi bi-fuel-pump m-3"></i>CNG</h1>
              </div>
              <div className="card-body-custom">
                <div className="fuel-value">550 kg Sold</div>
                <div className="fuel-amount">₹ 10,200</div>
                <div className="earned">Earned</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Transactions */}
      <div className="rt-container">
        {/* HEADER */}
        <div className="rt-header">
          <h5 className="rt-title">Recent Transactions</h5>
          <div className="rt-search mb-4">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search"
              onChange={handleSearch}
            />
            <span
              className="position-absolute top-50 translate-middle-y"
              style={{ left: "15px" }}
            >
              <i className="bi bi-search search-icon"></i>
            </span>
            {showClear && (
              <span className="rt-clear" onClick={clearSearch}>✕</span>
            )}
            {showSuggestions && suggestions.length > 0 && (
              <ul className="rt-suggestions">
                {suggestions.map((item, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(item)}>
                    <i className="bi bi-search search-icon"></i>  {item}
                  </li>
                ))}
              </ul>
            )}
            {/* 🔍  */}
          </div>
        </div>
        {/* SEARCH TEXT SHOW */}
        {searchText && (
          <div className="rt-search-info">
            Showing results for <b>"{searchText}"</b>
          </div>
        )}
        {/* TABLE */}
        <div className="rt-table-wrapper">
          {/* <table className="rt-table table-hover"> */}
          <table className="rt-table table table-hover">
            <thead className="heads">
              <tr>
                <th>Date</th>
                <th>Pump ID</th>
                <th>Fuel Type</th>
                <th>Volume</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
           {paginatedData.length > 0 ? (
           paginatedData.map((row, index) => (
      <tr key={index}>
        <td>{row.date}</td>
        <td>{row.pumpId}</td>
        <td>{row.fuelType}</td>
        <td>{row.volume}</td>
        <td>{row.amount}</td>
      </tr>
    ))
  ) : (
    <tr className="no-data-row">
      <td colSpan="7" className="text-center rt-no-data">
        No data found!
      </td>
     </tr>
      )}
    </tbody>
          </table>
        </div>
        {/* PAGINATION */}
        {filteredData.length > itemsPerPage && (
          <div className="rt-pagination mb-5">
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
      </div>
    </>
  );
};
export default Reports;