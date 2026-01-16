import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isRightOpen, setIsRightOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <Link to="/" className="logo-link">
            <img src="/Pumpicon.png" alt="MyApp Logo" className="logo-img" />
          </Link>
        </div>

        <button className="menu-btn" onClick={() => setIsRightOpen(true)}>
          ☰
        </button>
      </nav>

    
      {isRightOpen && (
        <div className="overlay" onClick={() => setIsRightOpen(false)}></div>
      )}

     <div className={`sidebar right ${isRightOpen ? "open" : ""}`}>

  <button className="close-btn" onClick={() => setIsRightOpen(false)}>
    <span className="x-line line1"></span>
    <span className="x-line line2"></span>
  </button>

        <ul>
          <li onClick={() => setIsRightOpen(false)}>
            <Link to="/">Home</Link>
          </li>
          <li onClick={() => setIsRightOpen(false)}>
            <Link to="/about">About</Link>
          </li>
          <li onClick={() => setIsRightOpen(false)}>
            <Link to="/services">Services</Link>
          </li>
          <li onClick={() => setIsRightOpen(false)}>
            <Link to="/contact">Contact</Link>
          </li>
           <li onClick={() => setIsRightOpen(false)}>
            <Link to="/contact">Sales Management</Link>
          </li>
           <li onClick={() => setIsRightOpen(false)}>
            <Link to="/contact">Fuel Stock</Link>
          </li>
           <li onClick={() => setIsRightOpen(false)}>
            <Link to="/contact">Nozzle Management</Link>
          </li>
           <li onClick={() => setIsRightOpen(false)}>
            <Link to="/contact">Logout</Link>
          </li>
        </ul>

         
      </div>
    </>
  );
}

export default Navbar;
