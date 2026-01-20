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
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const handleChange = () => {
    setShowClear(inputRef.current.value.length > 0);
  };
  const clearSearch = () => {
    inputRef.current.value = "";
    setShowClear(false);
    inputRef.current.focus();
  };
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <> 
<div className="container-fluid p-2">
      <div className="d-flex align-items-center  justify-content-between">
        <h5 className="mb-0 fw-bold">Report Management</h5>
      </div>
 <div className="banner mt-2  h-25">
    <img src="https://img.freepik.com/premium-photo/electric-cha…ith-eco-friendly-clean-energy_564714-3.jpg"
    //  src="https://img.freepik.com/premium-photo/chonburi-12-may-2017-ptt-gas-station-chonburi-thailand-ptt-is-largest-oil-company-thailand_49882-414.jpg"
     alt="Gas Station"
     className="img-fluid rounded"
    />
 </div>
 </div>
<div className="container-fluid p-1">
        <div className="row g-1">
          <div className="col-lg-4 col-md-6">
            <div className="card stats-card m-2">
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
             <div className="card stats-card m-2">
               <div className="card-body d-flex align-items-center">
                 <div className="icon-box icon-orange me-3">
                  <h4  className="m-4"><i className="bi bi-fuel-pump"></i></h4> 
                 </div>
                 <div>
                    <div className="card-title">Total Fuels Dispensed</div>
                   <div className="card-value"> ₹ 18,290 L</div>
                 </div>
               </div>
             </div>
          </div>
 <div className="col-lg-4 col-md-12">
             <div className="card stats-card m-2">
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
      <div className="dropdown-container">
           <select  id="timeFilter" className="filter-dropdown" onchange="updateData(this.value)">
           <option value="thisWeek">This Week</option>
           <option value="monthly">Monthly</option>
           <option value="yearly">Yearly</option>
        </select>
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
             <div className="summary-card m-2">
               <div className="card-header-custom petrol">
                 <h1>⛽Petrol</h1>
               </div>
               <div className="card-body-custom">
                 <div className="fuel-value">12,540  L</div>
                 <div className="fuel-amount">₹ 1,15,920</div>
                 <div className="earned">Earned</div>
               </div>
          </div>
      </div>
<div className="col-md-4">
        <div className="summary-card m-2">
               <div className="card-header-custom diesel">
                 <h1>⛽Diesel</h1>
               </div>
               <div className="card-body-custom">
                 <div className="fuel-value">5,200 L</div>
                 <div className="fuel-amount">₹ 3,59,600</div>
                 <div className="earned">Earned</div>
               </div>
             </div>
           </div>
<div className="col-md-4">
    <div className="summary-card m-2">
      <div className="card-header-custom cng">
        <h1> 🏭CNG </h1>
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
  <div className="container-fluid px-3 mt-4 mb-5">
  <div className="d-flex justify-content-between">
  <h5 className="fw-bold m-2">Recent Transactions</h5>
   <div className="position-relative m-3" style={{ width: "310px" }}>
          <input
            ref={inputRef}
            type="text"
            className="form-control ps-5 pe-5 rounded-pill"
            placeholder="Search"
            onChange={handleChange}
          />
          <span
            className="position-absolute top-50 translate-middle-y"
            style={{ left: "15px"}}
          >
            <i className="bi bi-search search-icon"></i>
          </span>
          {showClear && (
            <span
              className="position-absolute top-50 translate-middle-y"
              style={{ right: "15px", cursor: "pointer" }}
              onClick={clearSearch}
            >
              ✕
            </span>
          )}
        </div>
        </div>
      
  <div className="table-scroll">
    <table className="table table-bordered table-hover table-striped">
      <thead className="table-light">
        <tr>
          <th>Date</th>
          <th>Pump ID</th>
          <th>Fuel Type</th>
          <th>Volume</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {paginatedData.map((row, index) => (
          <tr key={index}>
            <td>{row.date}</td>
            <td>{row.pumpId}</td>
            <td>{row.fuelType}</td>
            <td>{row.volume}</td>
            <td>{row.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
{/* pagination */}
      {data.length > itemsPerPage && (
           <nav className="d-flex justify-content-center mt-3">
             <ul className="pagination gap-2">
               <li className="page-item">
                 <button
                   className="page-link rounded-pill"
                   onClick={() => handlePageChange(1)}
                   disabled={currentPage === 1}
                 >
                   ««
                 </button>
               </li>           
               <li className="page-item">
                 <button
                   className="page-link rounded-pill"
                   onClick={() => handlePageChange(currentPage - 1)}
                   disabled={currentPage === 1}
                 >
                   «
                 </button>
               </li>
               {Array.from({ length: totalPages }, (_, i) => (
                 <li key={i} className="page-item">
                   <button
                     className={`page-link rounded-pill ${currentPage === i + 1 ? "active bg-primary text-white" : ""
                       }`}
                     onClick={() => handlePageChange(i + 1)}
                   >
                     {i + 1}
                   </button>
                 </li>
               ))}
               <li className="page-item">
                 <button
                   className="page-link rounded-pill"
                   onClick={() => handlePageChange(currentPage + 1)}
                   disabled={currentPage === totalPages}
                 >
                   »
                  </button>
               </li>
               <li className="page-item">
                 <button
                   className="page-link rounded-pill"
                   onClick={() => handlePageChange(totalPages)}
                   disabled={currentPage === totalPages}
                 >
                   »»
                 </button>
               </li>
             </ul>
           </nav>
         )}
    </div>
    </>
  );
};
export default Reports;

