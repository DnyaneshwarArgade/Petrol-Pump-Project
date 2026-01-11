import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Reports.css";

const Reports = () => {
  return (
    <>
      <div className="container-fluid p-3">
        <div className="top-bar">
          <h4 className="mb-0 fw-bold">Reports Page </h4>

          <div className="d-flex align-items-center gap-3">
            <div className="search-box">
              <input
                type="text"
                className="form-control"
                placeholder="Search"/>
            </div>

            <div className="icons">
              <span className="fs-5"><h2>🔔</h2></span>
              <div className="profile">
                <p><h2>&#128104;</h2></p>
              </div>
            </div>
          </div>
        </div>

        <div className="banner">
          <img
            src="https://static.vecteezy.com/system/resources/previews/023/890/504/non_2x/gas-station-3d-01-vector.jpg"
            alt="Gas Station"
          />
        </div>
      </div>

      <div className="container-fluid p-3">
        <div className="row">
          {/* Total Sales */}
          <div className="col-lg-4 col-md-6 mb-3">
            <div className="card stats-card">
              <div className="card-body d-flex align-items-center">
                <div className="icon-box icon-green me-3">
                 <h4><i className="bi bi-currency-rupee"></i></h4>
                </div>
                <div>
                  <div className="card-title">Total Sales</div>
                  <div className="card-value">₹ 4,85,720</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-3">
            <div className="card stats-card">
              <div className="card-body d-flex align-items-center">
                <div className="icon-box icon-orange me-3">
                 <h4><i className="bi bi-fuel-pump"></i></h4> 
                </div>
                <div>
                  <div className="card-title">Total Fuels Dispensed</div>
                  <div className="card-value">18,290 L</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 mb-3">
            <div className="card stats-card">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="icon-box icon-red me-3">
                   <h4><i className="bi bi-receipt"></i></h4> 
                  </div>
                  <div>
                    <div className="card-title">Total Expenses</div>
                    <div className="card-value">₹ 1,23,350</div>
                  </div>
                </div>
                <select className="week">
                  <option>This Week</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
<div className="card">
<div className="container py-4">
  <h4 className="mb-4 fw-bold">Fuel Sales Summary</h4>
  <div className="row g-4">

    <div className="col-md-4">
      <div className="summary-card">
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
      <div className="summary-card">
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
      <div className="summary-card">
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
</div>
 <div className="card p-4">
<div className="container-fluid mb-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
            <h5 className="mb-0 fw-bold">Recent Transactions</h5>
            <div className="search-box">
            <input 
                type="text" 
                className="form-control" 
                placeholder="Search"/>
            </div>
        </div>
         <div className="table-responsive">
            <table className="table  table-hover">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Pump ID</th>
                        <th>Fuel Type</th>
                        <th>Volume</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>23 Apr 2024</td>
                        <td><strong>PUMP-101</strong></td>
                        <td><strong>Petrol</strong></td>
                        <td><strong>1,800 L</strong></td>
                        <td><strong>₹ 16,650</strong></td>
                        <td><div>
                            <button type="button" className="btn btn-outline-secondary">
                            </button>
                            <button type="button" className="btn btn-outline-secondary"> 
                            </button>
                            <button type="button" className="btn btn-outline-secondary">
                            </button>
                        </div></td>
                    </tr>
                    <tr>
                        <td>23 Apr 2024</td>
                        <td><strong>PUMP-102</strong></td>
                        <td><strong>Diesel</strong></td>
                        <td><strong>900 L</strong></td>
                        <td><strong>₹ 62,290</strong></td>
                        <td><button className="status-btn">&#9654;</button></td>
                    </tr>
                    <tr>
                        <td>23 Apr 2024</td>
                        <td><strong>PUMP-103</strong></td>
                        <td><strong>CNG</strong></td>
                        <td><strong>70 kg</strong></td>
                        <td><strong>₹ 1,300</strong></td>
                        <td><button className="status-btn">&#9654;</button></td>
                    </tr>
                    <tr>
                        <td>23 Apr 2024</td>
                        <td><strong>PUMP-103</strong></td>
                        <td><strong>Diesel</strong></td>
                        <td><strong>1,200 L</strong></td>
                        <td><strong>₹ 33,180</strong></td>
                        <td><button className="status-btn">&#9654;</button></td>
                    </tr>
                    <tr>
                        <td>23 Apr 2024</td>
                        <td><strong>PUMP-101</strong></td>
                        <td><strong>Petrol</strong></td>
                        <td><strong>1,360 L</strong></td>
                        <td><strong>₹ 14,460</strong></td>
                        <td><button className="status-btn">&#9654;</button></td>
                    </tr>
                </tbody>
            </table>
         </div> 
         <div className="d-flex flex-wrap justify-content-between align-items-center m-0">
            <small>Showing 1 to 5 of 25 entries</small>
            <nav>
                <ul class="pagination pagination-sm mb-0">
                    <li><a className="page-link" href="#">‹</a></li>
                    <li><a className="page-link" href="#">1</a></li>
                    <li className="active"><a className="page-link" href="#">2</a></li>
                    <li><a className="page-link" href="#">3</a></li>
                    <li><a className="page-link" href="#">4</a></li>
                    <li className="page-item"><a className="page-link" href="#">›</a></li>
                </ul>
            </nav>
            <p class="Search">Search</p>
        </div>
    </div>
</div>


    </>
  );
};

export default Reports;