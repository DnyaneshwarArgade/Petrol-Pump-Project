import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Nozzle.css";
import {
  BsSearch,
} from "react-icons/bs";

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

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

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

  const filteredData = data.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

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

  const openEdit = (item) => {
    setIsEdit(true);
    setForm(item);
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
      setData(prev =>
        prev.map(d => d.nozzleId === form.nozzleId ? form : d)
      );
      // Swal.fire("Updated", "Nozzle updated successfully", "success");
      Swal.fire({
        icon: "success",
        title: "Successfully Added",
        showConfirmButton: false,
        timer: 1500,
      });

    }
    else {
      setData(prev => [form, ...prev]);
      // Swal.fire("Added", "Nozzle added successfully", "success");
      Swal.fire({
        icon: "success",
        title: "Successfully Added",
        showConfirmButton: false,
        timer: 1500,
      });

      setCurrentPage(1);
    }

    setShowModal(false);
  };
  const deleteNozzle = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This data will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prev) => {
          const updatedData = prev.filter((d) => d.nozzleId !== id);

          const newTotalPages = Math.ceil(
            updatedData.length / itemsPerPage
          );

          if (currentPage > newTotalPages) {
            setCurrentPage(newTotalPages || 1);
          }

          return updatedData;
        });

        Swal.fire({
          icon: "success",
          title: "Deleted Successfully",
          showConfirmButton: false,
          timer: 1500,
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

      <div className="card">
        <div className="container-fluid mt-1">
          <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2 nav">
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-fuel-pump fs-4 text-primary m-1"></i>
              <h4 className="fw-bold">Nozzles</h4>
            </div>

            <button className="btn btn-primary m-1" onClick={openAdd}>
              <h5 className="fw-bold m-0">Add Nozzle</h5>
            </button>
          </div>

          <div className="search-box w-100 position-relative">
            <BsSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search Nozzle..."
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <span className="input-clear" onClick={() => setSearch("")}>
                ✕
              </span>
            )}
          </div>

          <div className="table-responsive-wrapper">
            <div className="table-responsive">
              <table className="table table-hover text-center align-middle">
                <thead className="table-light">
                  <tr className="table-secondary">
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
                      <td colSpan="6" className="py-4 text-center">
                        No data found
                      </td>
                    </tr>
                  ) : (
                    paginatedData.map(item => (
                      <tr key={item.nozzleId}>
                        <td>{item.pumpId}</td>
                        <td>{item.nozzleId}</td>
                        <td>{item.fuelType}</td>
                        <td>₹ {item.price}</td>
                        <td>{item.status}</td>
                        <td>
                          <i
                            className="bi bi-pencil-square text-primary me-3"
                            onClick={() => openEdit(item)}
                            style={{ cursor: "pointer" }}
                          ></i>
                          <i
                            className="bi bi-trash text-danger"
                            onClick={() => deleteNozzle(item.nozzleId)}
                            style={{ cursor: "pointer" }}
                          ></i>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {filteredData.length > itemsPerPage && (
              <div className="rt-pagination mt-1">
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
        </div>

        {showModal && (
          <div className="modal-backdrop-custom">
            <div className="modal-card m-3">
              <div className="modal-header-custom">
                <h5>{isEdit ? "Edit Nozzle" : "Add New Nozzle"}</h5>
                <span onClick={() => setShowModal(false)}>×</span>
              </div>

              <div className="row g-3 mt-2">
                <div className="col-md-6">
                  <label className="form-label">Pump ID</label>
                  <input
                    className="form-control"
                    value={form.pumpId}
                    onChange={(e) =>
                      setForm({ ...form, pumpId: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Nozzle ID</label>
                  <input
                    className="form-control"
                    value={form.nozzleId}
                    disabled={isEdit}
                    onChange={(e) =>
                      setForm({ ...form, nozzleId: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Fuel Type</label>
                  <select
                    className="form-control"
                    value={form.fuelType}
                    onChange={(e) =>
                      setForm({ ...form, fuelType: e.target.value })
                    }
                  >
                    <option>Petrol</option>
                    <option>Diesel</option>
                    <option>CNG</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Unit Price</label>
                  <input
                    className="form-control"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Status</label>
                  <select
                    className="form-control"
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <button
                className="btn btn-primary w-100 mt-4"
                onClick={submitForm}
              >
                {isEdit ? "Update Nozzle" : "Add Nozzle"}
              </button>
            </div>
          </div>

        )}
      </div>
    </div>
  );
};
export default Nozzle;


