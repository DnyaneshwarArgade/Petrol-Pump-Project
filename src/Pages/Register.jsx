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

  const [showPassword, setShowPassword] = useState(false);

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

          
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
            
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 1l22 22" />
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.8 21.8 0 0 1 5.06-6.94" />
                  <path d="M9.9 4.24A9.77 9.77 0 0 1 12 4c7 0 11 8 11 8a21.8 21.8 0 0 1-4.87 6.88" />
                </svg>
              ) : (
                
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </span>
          </div>

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