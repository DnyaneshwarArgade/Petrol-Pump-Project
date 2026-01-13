import React, { useState } from "react";
import Swal from "sweetalert2";
import PumpImage from "../assets/PumpImage.jpeg";
import "./register.css";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    pumpName: "",
    pumpId: "",
    address: "",
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      icon: "success",
      title: "Registered Successfully!",
      text: "Your account has been created 🎉",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false
    });

    setFormData({
      fullName: "",
      email: "",
      mobile: "",
      pumpName: "",
      pumpId: "",
      address: "",
      username: "",
      password: ""
    });
  };

  return (
    <div className="register-container">
      <div className="register-card">

        {/* IMAGE */}
        <div
          className="register-header"
          style={{ backgroundImage: `url(${PumpImage})` }}
        ></div>

        <div className="register-title">Sign Up</div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");
              setFormData({ ...formData, mobile: value });
            }}
            required
          />

          <input
            type="text"
            name="pumpName"
            placeholder="Petrol Pump Name"
            value={formData.pumpName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="pumpId"
            placeholder="Pump ID"
            value={formData.pumpId}
            onChange={handleChange}
            required
          />

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="register-btn">
            Sign Up
          </button>

          <div className="login-text">
            Do you have an account? <span>Sign in</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;