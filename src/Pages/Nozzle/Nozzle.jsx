import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Nozzle.css";

const Nozzles = () => {
  const [data, setData] = useState([
    { id: "NZ-101", pump: "PUMP-101", fuel: "Petrol", price: 92.5, dispensed: "3525 L", status: "Active" },
    { id: "NZ-102", pump: "PUMP-102", fuel: "Diesel", price: 69.3, dispensed: "9900 L", status: "Active" },
    { id: "NZ-103", pump: "PUMP-101", fuel: "CNG", price: 52, dispensed: "2850 L", status: "Active" },
    { id: "NZ-104", pump: "PUMP-101", fuel: "Petrol", price: 92.5, dispensed: "3535 L", status: "Active" },
    { id: "NZ-105", pump: "PUMP-103", fuel: "CNG", price: 52, dispensed: "240 Kg", status: "Inactive" },
    { id: "NZ-106", pump: "PUMP-101", fuel: "Petrol", price: 92.5, dispensed: "3525 L", status: "Active" },
    { id: "NZ-107", pump: "PUMP-102", fuel: "Diesel", price: 69.3, dispensed: "9900 L", status: "Active" },
    { id: "NZ-108", pump: "PUMP-101", fuel: "CNG", price: 52, dispensed: "2850 L", status: "Active" },
    { id: "NZ-109", pump: "PUMP-101", fuel: "Petrol", price: 92.5, dispensed: "3535 L", status: "Active" },
    { id: "NZ-110", pump: "PUMP-103", fuel: "CNG", price: 52, dispensed: "240 Kg", status: "Inactive" },
    { id: "NZ-111", pump: "PUMP-101", fuel: "Petrol", price: 92.5, dispensed: "3525 L", status: "Active" },
    { id: "NZ-112", pump: "PUMP-102", fuel: "Diesel", price: 69.3, dispensed: "9900 L", status: "Active" },
    { id: "NZ-113", pump: "PUMP-101", fuel: "CNG", price: 52, dispensed: "2850 L", status: "Active" },
  ]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState("success"); // success / error
  const [messageText, setMessageText] = useState("");

  const [form, setForm] = useState({
    pump: "PUMP-101",
    id: "",
    fuel: "Petrol",
    price: "",
    status: "Active",
  });
  /* SEARCH */
  const filtered = data.filter((n) =>
    Object.values(n).join(" ").toLowerCase().includes(search.toLowerCase())
  );
  /* PAGINATION */
  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);
  /* SEARCH SUGGESTIONS */
  const getSuggestions = () => {
    if (!search) return [];
    const q = search.toLowerCase();
    const values = data.flatMap((item) => [
      item.id,
      item.pump,
      item.fuel,
      item.status,
      String(item.price),
    ]);
    return [...new Set(values.filter((v) => v.toLowerCase().includes(q)))];
  };
  /* Popup trigger function */
  const triggerMessage = (type, text) => {
    setMessageType(type);
    setMessageText(text);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 1000); // auto hide 3 sec
  };
  const handleAdd = () => {
  if (!form.id || !form.price)
    return triggerMessage("error", "Please fill all fields");

  const newItem = { ...form, dispensed: "0 L" };
  setData([newItem, ...data]);

  setForm({
    pump: "PUMP-101",
    id: "",
    fuel: "Petrol",
    price: "",
    status: "Active",
  });
  setSearch("");  
  setShowSuggestions(false);
  setShowModal(false);
  setPage(1);
  triggerMessage("success", "✅ Nozzle Data Added Successfully");
};
  /* EDIT */
  const handleEdit = (item, index) => {
    setForm(item);
    setEditIndex(start + index);
    setIsEdit(true);
    setShowModal(true);
  };
  /* SAVE */
  const handleSave = () => {
    const updated = [...data];
    updated[editIndex] = { ...form, dispensed: updated[editIndex].dispensed };
    setData(updated);
    setShowModal(false);
    setIsEdit(false);
    triggerMessage("success", "✅ Nozzle Data Updated Successfully");
  };
  /* DELETE */
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setData(data.filter((_, i) => i !== start + index));
      triggerMessage("error", "🗑 Deleted Successfully");
    }
  };

  return (
    <div className="container-fluid p-3 bg-light mb-3 min-vh-100">
      <div className="nozzle-header mb-3">
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-fuel-pump fs-4 text-primary"></i>
          <h5 className="mb-0 fw-bold">Nozzles</h5>
        </div>

        <div className="d-flex align-items-center gap-3 flex-wrap">
          <div className="search-box position-relative">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowSuggestions(true);
                setPage(1);
              }}
              onFocus={() => search && setShowSuggestions(true)}
            />
            {search && (
              <i
                className="bi bi-x-circle-fill clear"
                onClick={() => {
                  setSearch("");
                  setShowSuggestions(false);
                }}
              ></i>
            )}
            {showSuggestions && search && (
                   <div className="search-suggestions">
                      {getSuggestions().length > 0 &&
                      getSuggestions().slice(0, 6).map((item, i) => (
                        <div
                     key={i}
                     className="suggestion-item"
                     onClick={() => {
                     setSearch(item);
                     setShowSuggestions(false);
                    }}
                    >
                 {item}
                </div>
               ))}
             </div>
            )}
          </div>
             <button className="btn btn-primary add-btn" onClick={() => setShowModal(true)}>
            + Add Nozzle
          </button>
        </div>
      </div>
{/* PUMP STATUS CARDS */}
<div className="conatiner-fluid pump-status-wrapper mb-3">
  <h6 className="fw-bold mb-2">Pump Status</h6>

  <div className="pump-status-grid">
    <div className="pump-card">
      <div className="pump-card-header green">
        <i className="bi bi-currency-rupee"></i>
        <span>Pump 1</span>
      </div>
      <div className="pump-card-body">
        <div className="status green">
          <i className="bi bi-check-circle-fill"></i> On me
        </div>
        <div className="fuel">
          <i className="bi bi-fuel-pump"></i> Petrol
        </div>
      </div>
    </div>

    <div className="pump-card">
      <div className="pump-card-header orange">
        <i className="bi bi-check-circle"></i>
        <span>Pump 2</span>
      </div>
      <div className="pump-card-body">
        <div className="status orange">
          <i className="bi bi-check-circle-fill"></i> Open
        </div>
        <div className="fuel">
          <i className="bi bi-fuel-pump"></i> Diesel
        </div>
      </div>
    </div>

    <div className="pump-card">
      <div className="pump-card-header red">
        <i className="bi bi-exclamation-circle"></i>
        <span>Pump 3</span>
      </div>
      <div className="pump-card-body">
        <div className="status red">
          <i className="bi bi-clock-fill"></i> In Use
        </div>
        <div className="fuel">
           <i className="bi bi-fuel-pump"></i> AD NF
        </div>
      </div>
    </div>

    <div className="pump-card">
      <div className="pump-card-header green">
        <i className="bi bi-check-circle"></i>
        <span>Pump 4</span>
      </div>
      <div className="pump-card-body">
        <div className="status green">
          <i className="bi bi-check-circle-fill"></i> Open
        </div>
        <div className="fuel">
          <i className="bi bi-fuel-pump"></i> Petrol
        </div>
      </div>
    </div>

    <div className="pump-card">
      <div className="pump-card-header orange">
        <i className="bi bi-clock-history"></i>
        <span>Pump 5</span>
      </div>
      <div className="pump-card-body">
        <div className="status orange">
          <i className="bi bi-clock-fill"></i> In Use
        </div>
        <div className="fuel">
           <i className="bi bi-fuel-pump"></i> AD NF
        </div>
      </div>
    </div>

    <div className="pump-card">
      <div className="pump-card-header red">
        <i className="bi bi-power"></i>
        <span>Offline</span>
      </div>
      <div className="pump-card-body">
        <div className="status red">
          <i className="bi bi-x-circle-fill"></i> On me
        </div>
        <div className="fuel">
          <i className="bi bi-fuel-pump"></i> Petrol
        </div>
      </div>
    </div>
  </div>
</div>
      {/* TABLE */}
      <div className="table-wrapper table-responsive">
        <table className="table align-middle table-hover">
          <thead className="heads">
            <tr>
              <th>Nozzle ID</th>
              <th>Pump ID</th>
              <th>Fuel</th>
              <th>Unit Price</th>
              <th>Dispensed</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((n, i) => (
                <tr key={i}>
                  <td>{n.id}</td>
                  <td>{n.pump}</td>
                  <td>{n.fuel}</td>
                  <td>₹ {n.price}</td>
                  <td>{n.dispensed}</td>
                  <td>
                    <span className={`badge ${n.status === "Active" ? "bg-success" : "bg-danger"}`}>
                      {n.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <i className="bi bi-pencil-square action edit" onClick={() => handleEdit(n, i)} />
                    <i className="bi bi-trash action delete" onClick={() => handleDelete(i)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No data found
                </td>
              </tr>
            )
            }
          </tbody>
        </table>
      </div>
            <div className="pagination-bar mb-5">
                    <button
                          disabled={page === 1}
                          onClick={() => setPage(1)}
                           >
                           &laquo;&laquo;
                    </button>
                    <button
                   disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                           >
                           &lsaquo;
                      </button>
               {/* PAGE NUMBERS */}
                     {[...Array(totalPages)].map((_, i) => (
                         <button
                         key={i}
                         className={page === i + 1 ? "active" : ""}
                         onClick={() => setPage(i + 1)}
                            >
                         {i + 1}
                         </button>
                          ))}
                    <button
                      disabled={page === totalPages}
                      onClick={() => setPage(page + 1)}
                         >
                      &rsaquo;
                    </button>
                  <button
                        disabled={page === totalPages}
                        onClick={() => setPage(totalPages)}
                         >
                   &raquo;&raquo;
                 </button>
             </div>
      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="custom-modal">
          <div className="modal-box">
            <h6>{isEdit ? "Edit Nozzle" : "Add New Nozzle"}</h6>
            <input
              className="form-control mb-2"
              list="pumpList"
              placeholder="Pump ID (e.g. PUMP-104)"
              value={form.pump}
              disabled={isEdit}
              onChange={(e) => setForm({ ...form, pump: e.target.value })}
            />
            <datalist id="pumpList">
              {[...new Set(data.map(d => d.pump))].map((p, i) => (
                <option key={i} value={p} />
              ))}
            </datalist>

            <input
              className="form-control mb-2"
              placeholder="Nozzle ID"
              value={form.id}
              onChange={(e) => setForm({ ...form, id: e.target.value })}
            />
            <select className="form-select mb-2" value={form.fuel}
              onChange={(e) => setForm({ ...form, fuel: e.target.value })}>
              <option>Petrol</option>
              <option>Diesel</option>
              <option>CNG</option>
            </select>

            <input
              className="form-control mb-2"
              placeholder="Unit Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <select className="form-select mb-3" value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <button className="btn btn-primary w-100 mb-2" onClick={isEdit ? handleSave : handleAdd}>
              {isEdit ? "Save Changes" : "Add Nozzle"}
            </button>

            <button className="btn btn-secondary w-100" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* Centered Popup */}
      {showMessage && (
        <div className="overlay">
          <div className={`message-card text-center ${messageType}`}>
            <i
              className={`bi ${
                messageType === "success" ? "bi-check-circle-fill" : "bi-x-circle-fill"
              } message-icon`}
            ></i>
            <h2>{messageText}</h2>
          </div>
        </div>
      )}
    </div>
  );
};
export default Nozzles;


