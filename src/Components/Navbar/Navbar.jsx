import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Sidebar from "../SideBar/Sidebar";

function Navbar() {
  const [isRightOpen, setIsRightOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        {/* Left: Logo + Title */}
        <div className="logo-title-container">
          <div className="logo">
            <Link to="/" className="logo-link">
              <img
                src="/Pumpicon.png"
                alt="MyApp Logo"
                className="logo-img"
              />
            </Link>
          </div>

          <div className="navbar-title">
            <h1>Petrol Pump Management</h1>

            {/* Mobile view text */}
            <span className="nav-right mobile-only">
              Welcome Admin
            </span>
          </div>
        </div>

        {/* Right: Menu + Desktop text */}
        <div className="menu-container">
          {/* Desktop view text */}
          <span className="nav-right desktop-only">
             Welcome Admin
          </span>

          <button
            className="menu-btn"
            onClick={() => setIsRightOpen(!isRightOpen)}
          >
            ☰
          </button>
        </div>
      </nav>

      <Sidebar
        isOpen={isRightOpen}
        toggleSidebar={() => setIsRightOpen(false)}
      />
    </>
  );
}

export default Navbar;
