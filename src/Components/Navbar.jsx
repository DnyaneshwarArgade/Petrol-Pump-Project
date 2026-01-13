// import React from "react";
// import "./Navbar.css";
// import logo from "../assets/PumpIcon.jpeg";

// function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="navbar-container">

//         {/* Logo */}
//         <div className="logo">
//           <img src={logo} alt="Website Logo" />
//         </div>

//         {/* Button */}
//         <button className="nav-btn">Side Bar</button>

//       </div>
//     </nav>
//   );
// }

// export default Navbar;


import React, { useState } from "react";
import "./Navbar.css";
import logo from "../assets/PumpIcon.jpeg";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <div className="logo">
            <img src={logo} alt="Website Logo" />
          </div>

          {/* Button */}
          <button className="nav-btn" onClick={toggleSidebar}>
            Side Bar
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
      </div>

      {/* Overlay to close sidebar when clicking outside */}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
}

export default Navbar;
