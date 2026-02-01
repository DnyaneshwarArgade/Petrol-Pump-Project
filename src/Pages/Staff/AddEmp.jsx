import React, { useEffect, useState } from "react";
import "./AddEmp.css";

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
  const [errors, setErrors] = useState({});

  // Fill / reset form
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
        setFormData(initialState);
      }
      setErrors({});
    }
  }, [showModal, isEdit, selectedEmployee]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validation
  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.jobTitle.trim())
      newErrors.jobTitle = "Job title is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter valid email";
    }

    if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!formData.shift) newErrors.shift = "Select shift";
    if (!formData.status) newErrors.status = "Select status";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (isEdit) {
      onUpdate({ ...formData, id: selectedEmployee.id });
    } else {
      onAdd(formData);
    }

    setShowModal(false);
    setFormData(initialState);
    setErrors({});
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData(initialState);
    setErrors({});
  };

  if (!showModal) return null;

  return (
    <div className="modal fade show modal-bg" style={{ display: "block" }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="emomodal-content shadow-lg rounded-3">
          {/* Header */}
              <div className="modal-header bg-primary text-white mb-0">
                       <h5 className="modal-title fw-bold">
                       {isEdit ? "Edit Employee" : "Add Employee"}
                    </h5>
                   <button
              className="btn-close btn-close-white"
                 onClick={closeModal}
                  />
                    </div>


          {/* Body */}
          <div className="modal-body">
            <form onSubmit={handleSubmit} noValidate>
              {/* Row 1 */}
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label">Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-control ${errors.name ? "is-invalid" : ""
                      }`}
                  />
                  <div className="error-space mb-0">
                    {errors.name && (
                      <div className="invalid-feedback d-block">
                        {errors.name}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-12 col-md-6 ">
                  <label className="form-label">Job Title</label>
                  <input
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className={`form-control ${errors.jobTitle ? "is-invalid" : ""
                      }`}
                  />
                  <div className="error-space">
                    {errors.jobTitle && (
                      <div className="invalid-feedback d-block">
                        {errors.jobTitle}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="row g-3 mb-0">
                <div className="col-12 col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-control ${errors.email ? "is-invalid" : ""
                      }`}
                  />
                  <div className="error-space">
                    {errors.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Phone</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-control ${errors.phone ? "is-invalid" : ""
                      }`}
                    placeholder="10 digit number"
                  />
                  <div className="error-space">
                    {errors.phone && (
                      <div className="invalid-feedback d-block">
                        {errors.phone}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Row 3 */}
              <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                  <label className="form-label">Shift</label>
                  <select
                    name="shift"
                    value={formData.shift}
                    onChange={handleChange}
                    className={`form-select ${errors.shift ? "is-invalid" : ""
                      }`}
                  >
                    <option value="">Select</option>
                    <option value="Day">Day</option>
                    <option value="Night">Night</option>
                  </select>
                  <div className="error-space">
                    {errors.shift && (
                      <div className="invalid-feedback d-block">
                        {errors.shift}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={`form-select ${errors.status ? "is-invalid" : ""
                      }`}
                  >
                    <option value="">Select</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <div className="error-space">
                    {errors.status && (
                      <div className="invalid-feedback d-block">
                        {errors.status}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-end gap-2">
                <button type="submit" className="btn btn-primary px-4">
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