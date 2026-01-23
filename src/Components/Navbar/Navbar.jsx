import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../SideBar/Sidebar";
import "./Navbar.css";

function Navbar() {
  const [isRightOpen, setIsRightOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="logo-title-container">
          <div className="logo">
            <Link to="/" className="logo-link">
              <img src="/Pumpicon.png" alt="MyApp Logo" className="logo-img" />
            </Link>
          </div>
          <div className="navbar-title">
            <h1>Petrol Pump Management</h1>
          </div>
        </div>

        <button className="menu-btn" onClick={() => setIsRightOpen(!isRightOpen)}>
          ☰
        </button>
      </nav>


      <Sidebar isOpen={isRightOpen} toggleSidebar={() => setIsRightOpen(false)} />
    </>
  );
}

export default Navbar;
