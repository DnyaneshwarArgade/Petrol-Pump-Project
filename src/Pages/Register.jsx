import React, { useState } from "react";
import PumpImage from "../assets/PumpImage.jpeg";

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
    console.log(formData);
    alert("Registered Successfully");
  };

  return (
    <>
      {/* CSS */}
      <style>{`
        * {
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        .register-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #eef2f7;
          padding: 20px;
        }

        .register-card {
          background: #fff;
          width: 100%;
          max-width: 450px;
          border-radius: 10px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        /* IMAGE */
        .register-header {
          height: 200px; 
          background-image: url(${PumpImage});
          background-size: cover;
          background-position: center;
          position: relative;
        }

        .register-header::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.20);
        }

        form {
          padding: 25px;
          display: flex;
          flex-direction: column;
        }

        form input,
        form textarea {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 14px;
        }

        form textarea {
          resize: none;
          height: 70px;
        }

        .register-btn {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #0a4dbf, #1e90ff);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
        }

        .register-btn:hover {
          background: linear-gradient(135deg, #083a91, #187bcd);
        }

        @media (max-width: 480px) {
          form input,
          form textarea {
            font-size: 13px;
          }
        }
      `}</style>

      {/* JSX */}
      <div className="register-container">
        <div className="register-card">

          <div className="register-header"></div>

          <form onSubmit={handleSubmit}>
            <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
            <input type="text" name="mobile" placeholder="Mobile Number" onChange={handleChange} required />
            <input type="text" name="pumpName" placeholder="Petrol Pump Name" onChange={handleChange} required />
            <input type="text" name="pumpId" placeholder="Pump ID" onChange={handleChange} required />
            <textarea name="address" placeholder="Address" onChange={handleChange} required />
            <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

            <button type="submit" className="register-btn">Register</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;