import { Link } from "react-router-dom";
import React, { useState } from "react";
import "../Pages/Login.css";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // STATIC CREDENTIALS
  const staticUsername = "admin@admin.com";
  const staticPassword = "password"; 
const handleLogin = () => {
  if (username === staticUsername && password === staticPassword) {
    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: "Welcome to your account!",
      showConfirmButton: false,
      timer: 5000, // 5 seconds
      timerProgressBar: true,
    });
  } 
  else {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Invalid Username or Password",
      showConfirmButton: false,
      timer: 5000, // 5 seconds
      timerProgressBar: true,
    });
  }
};
 return (
    <div className="login-page">
      <div className="login-overlay"></div>

      <div className="login-card">
        <div className="login-header"></div>

        <div className="login-header-h6">
          <h6>Login to your account!</h6>
        </div>

        <div className="login-body">
          {/* USERNAME */}
          <div className="input-group">
            <span className="input-icon">👤</span>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/* PASSWORD */}
          <div className="input-group password-group">
            <span className="input-icon">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="forgot">
            <a href="#">Forgot Password?</a>
          </div>

          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

          {/* <div className="register"> 
            Don’t have an account? <a href="#">Register</a>
          </div> */}
         <div className="register">
  Don’t have an account? <Link to="/register">Register</Link>
</div>

        </div>
      </div>
    </div>
  );
};

export default Login;

