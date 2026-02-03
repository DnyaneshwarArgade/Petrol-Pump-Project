import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Nozzle.css";
import { BsSearch } from "react-icons/bs";

const itemsPerPage = 10;
const pumpData = [
  { id: 1, name: "Pump 1", status: "OD me", fuel: "Petrol", color: "success" },
  { id: 2, name: "Pump 2", status: "Open", fuel: "Diesel", color: "warning" },
  { id: 3, name: "Pump 3", status: "In Use", fuel: "AD NF", color: "danger" },
  { id: 4, name: "Pump 4", status: "Open", fuel: "Petrol", color: "success" },
  { id: 5, name: "Pump 5", status: "In Use", fuel: "AD NF", color: "warning" },
  { id: 6, name: "Offline", status: "On me", fuel: "Petrol", color: "danger" },
];

   const Nozzle = () => {
   const [data, setData] = useState(() => {
    const saved = localStorage.getItem("nozzles");
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [fuelFilter, setFuelFilter] = useState("ALL");

  const [form, setForm] = useState({
    pumpId: "",
    nozzleId: "",
    fuelType: "Petrol",
    price: "",
    status: "Active",
  });

  useEffect(() => {
    localStorage.setItem("nozzles", JSON.stringify(data));
  }, [data]);

  const filteredData = data.filter((item) => {
    const matchesSearch = Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());

      const matchesFuel =
      fuelFilter === "ALL" || item.fuelType === fuelFilter;
       return matchesSearch && matchesFuel;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openAdd = () => {
    setIsEdit(false);
    setForm({
      pumpId: "",
      nozzleId: "",
      fuelType: "Petrol",
      price: "",
      status: "Active",
    });
    setShowModal(true);
  };

  const openEdit = (item, index) => {
    setIsEdit(true);
    setForm(item);
    setEditIndex(index);
    setShowModal(true);
  };

  const submitForm = () => {
    if (!form.pumpId || !form.nozzleId || !form.price) {
      Swal.fire("Error", "Please fill all required fields", "error");
      return;
    }

    if (!isEdit && data.some(d => d.nozzleId === form.nozzleId)) {
      Swal.fire("Error", "Nozzle ID already exists", "error");
      return;
    }
    if (isEdit) {
      const updated = [...data];
      updated[editIndex] = form;
      setData(updated);
      Swal.fire({ icon: "success", title: "Updated Successfully", timer: 1500, showConfirmButton: false });
    } else {
      setData([form, ...data]);
      Swal.fire({ icon: "success", title: "Added Successfully", timer: 1500, showConfirmButton: false });
      setCurrentPage(1);
    }
    setShowModal(false);
  };

  const deleteNozzle = (nozzleId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This data will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        setData(prev => {
          const updatedData = prev.filter(d => d.nozzleId !== nozzleId);
          const newTotalPages = Math.ceil(updatedData.length / itemsPerPage);
          if (currentPage > newTotalPages && newTotalPages > 0) {
            setCurrentPage(newTotalPages);
          }
          return updatedData;
        });

        Swal.fire({
          icon: "success",
          title: "Deleted Successfully",
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  return (
    <div className="container-fluid">
      <h5 className="mb-3 fw-bold m-2">Pump Status</h5>
      <div className="row g-3 pump-row">
        {pumpData.map((pump) => (
          <div
            key={pump.id}
            className="col-4 col-md-2 pump-col"
          >
            <div className={`pump-card ${pump.color}`}>
              <div className="pump-header">
                <i className="bi bi-fuel-pump"></i>
                <span>{pump.name}</span>
              </div>
              <div className="pump-body">
                <div className="status">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>{pump.status}</span>
                </div>
                <div className="fuel">
                  <i className="bi bi-droplet-fill"></i>
                  <span>{pump.fuel}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-4 p-3 w-100">
        <div className="d-flex justify-content-between mb-2">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-fuel-pump fs-4 text-primary mb-1"></i>
            <h4 className="fw-bold">Nozzles</h4>
          </div>
          <button className="btn btn-primary fw-bold fs-7 p-2" onClick={openAdd}> Add Nozzle</button>
        </div>
        <div className="search-box w-100 position-relative mb-2">
          <BsSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search Nozzle..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && <span className="input-clear" onClick={() => setSearch("")}>✕</span>}
        </div>

        <div className="d-flex gap-2 mb-2 flex-wrap filters-buttons">
          <button
            className={`btn btn-md ${fuelFilter === "ALL" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => {
              setFuelFilter("ALL");
              setCurrentPage(1);
            }}
          >
            All Data
          </button>
          <button
            className={`btn btn-md ${fuelFilter === "Petrol" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => {
              setFuelFilter("Petrol");
              setCurrentPage(1);
            }}
          >
            Petrol
          </button>
          <button
            className={`btn btn-md ${fuelFilter === "CNG" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => {
              setFuelFilter("CNG");
              setCurrentPage(1);
            }}
          >
            CNG
          </button>

          <button
            className={`btn btn-md ${fuelFilter === "Diesel" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => {
              setFuelFilter("Diesel");
              setCurrentPage(1);
            }}
          >
            Diesel
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>Pump ID</th>
                <th>Nozzle ID</th>
                <th>Fuel</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-4 text-center">No data found</td>
                </tr>
              ) : (
                paginatedData.map((item, index) => (
                  <tr key={item.nozzleId}>
                    <td>{item.pumpId}</td>
                    <td>{item.nozzleId}</td>
                    <td>{item.fuelType}</td>
                    <td>₹ {item.price}</td>
                    <td>{item.status}</td>
                    <td>
                      <i className="bi bi-pencil-fill text-primary me-3" style={{ cursor: "pointer" }} onClick={() => openEdit(item, (currentPage - 1) * itemsPerPage + index)}></i>
                      <i className="bi bi-trash-fill text-danger" style={{ cursor: "pointer" }} onClick={() => deleteNozzle(item.nozzleId)}></i>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="rt-pagination mt-2 mb-5">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>««</button>
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>«</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} className={currentPage === i + 1 ? "active" : ""} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>»</button>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>»»</button>
        </div>
      )}

      {showModal && (
        <div className="modal-backdrop-custom">
          <div className="modal-card m-3">
            <div className="modal-header-custom">
              <h5>{isEdit ? "Edit Nozzle" : "Add New Nozzle"}</h5>
              <span onClick={() => setShowModal(false)}>×</span>
            </div>
            <div className="row g-3 m-2">
              <div className="col-md-6">
                <label className="form-label">Pump ID</label>
                <input className="form-control" value={form.pumpId} onChange={(e) => setForm({ ...form, pumpId: e.target.value })} disabled={isEdit} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Nozzle ID</label>
                <input className="form-control" value={form.nozzleId} onChange={(e) => setForm({ ...form, nozzleId: e.target.value })} disabled={isEdit} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Fuel Type</label>
                <select className="form-control" value={form.fuelType} onChange={(e) => setForm({ ...form, fuelType: e.target.value })}>
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>CNG</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Unit Price</label>
                <input className="form-control" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Status</label>
                <select className="form-control" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            <div className="d-flex justify-content-end px-3 pb-3">
              <button
                className="btn btn-primary NozzButton"
                onClick={submitForm}
              >
                {isEdit ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Nozzle;