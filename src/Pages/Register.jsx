import React, { useState } from "react";
import { Link } from "react-router-dom";
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

    if (formData.mobile.length !== 10) {
      Swal.fire({
        icon: "error",
        title: "Invalid Mobile Number",
        text: "Mobile number must be exactly 10 digits"
      });
      return;
    }

      Swal.fire({
       icon: "success",
       title: "Registered Successfully!",
       text: "Your account has been created 🎉",
       timer: 3000,
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
      password: ""
    });
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div
          className="register-header"
          style={{ backgroundImage: `url(${PumpImage})` }}
        ></div>

        <div className="register-title">Register</div>

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
              if (value.length <= 10) {
                setFormData({ ...formData, mobile: value });
              }
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
            placeholder="Address (Optional)"
            value={formData.address}
            onChange={handleChange}
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
            Register
          </button>

          <div className="login-text">
            Do you have an account?{" "}
            <Link to="/" className="signin-link">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;