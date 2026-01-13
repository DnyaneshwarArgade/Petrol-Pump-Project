import React, { useState } from 'react';
import '../Pages/Login.css'; 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page">
      <div className="login-overlay"></div>

      <div className="login-card">
        <div className="login-header"></div>

        <div className="login-body">
          <div className="input-group">
            <span className="input-icon">👤</span>
            <input type="text" placeholder="Username" />
          </div>

          <div className="input-group password-group">
            <span className="input-icon">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
              title="Show / Hide Password"
            ></span>
          </div>

          <div className="forgot">
            <a href="#">Forgot Password?</a>
          </div>

          <button className="login-btn">Login</button>

          <div className="register">
            Don’t have an account? <a href="#">Register</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
