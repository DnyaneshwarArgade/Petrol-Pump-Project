import React from 'react';
import '../Pages/Login.css'; 

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-card">
        
         {/* Header  */}
        <div className="login-header">
        </div>

        {/* Form */}
        <div className="login-body">
          <div className="input-group">
            <span className="input-icon">👤</span>
            <input type="text" placeholder="Username" />
          </div>

          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input type="password" placeholder="Password" />
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