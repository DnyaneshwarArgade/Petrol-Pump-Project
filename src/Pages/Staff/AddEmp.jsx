import React, { useEffect, useState } from "react";

function AddEmp({
  showModal,
  setShowModal,
  isEdit,
  selectedEmployee,
  onAdd,
  onUpdate,
}) {
  const initialState = {
    name: "",
    jobTitle: "",
    email: "",
    phone: "",
    shift: "",
    status: "",
  };

  const [formData, setFormData] = useState(initialState);

  // 🔥 Reset / Fill form when modal opens
  useEffect(() => {
    if (showModal) {
      if (isEdit && selectedEmployee) {
        setFormData({
          name: selectedEmployee.name || "",
          jobTitle: selectedEmployee.jobTitle || "",
          email: selectedEmployee.email || "",
          phone: selectedEmployee.phone || "",
          shift: selectedEmployee.shift || "",
          status: selectedEmployee.status || "",
        });
      } else {
        // 🟢 Add new employee → EMPTY FORM
        setFormData(initialState);
      }
    }
  }, [showModal, isEdit, selectedEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      onUpdate({ ...formData, id: selectedEmployee.id });
    } else {
      onAdd(formData);
    }

    setShowModal(false); // close modal
    setFormData(initialState); // reset after submit
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData(initialState); // reset on cancel
  };

  if (!showModal) return null;

  return (
    <div className="modal fade show modal-bg" style={{ display: "block" }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">
              {isEdit ? "Edit Employee" : "Add Employee"}
            </h5>
            <button className="btn-close" onClick={closeModal}></button>
          </div>

          {/* Body */}
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col">
                  <label className="form-label">Job Title</label>
                  <input
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col">
                  <label className="form-label">Phone</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="row mb-4">
                <div className="col">
                  <label className="form-label">Shift</label>
                  <select
                    name="shift"
                    value={formData.shift}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Day">Day</option>
                    <option value="Night">Night</option>
                  </select>
                </div>

                <div className="col">
                  <label className="form-label">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="text-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn btn-secondary me-2"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {isEdit ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmp;
