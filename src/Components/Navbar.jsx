// import "./Navbar.css";
// import { FiLogOut } from "react-icons/fi";

// function Navbar () {
//   return (
//     <nav className="navbar">
//       {/* Left Logo */}
//       <div className="nav-left">
//         <img
//           src="/PumpIcon.jpeg" alt="Petrol pump"  />  
//       </div>

//       {/* Right Welcome */}
//       <div className="nav-right">Welcome</div>
      
//       <div className="logout-icon"> 
//         <FiLogOut className="logout-icon" />
//          </div>
        

//   <img src="/petrol.avif" className="img"  alt="img"/>
//        </nav>

//   );
// };

// export default Navbar;





import "./Navbar.css";
import { FiLogOut } from "react-icons/fi";

function Navbar() {
  return (
    <nav className="navbar">
      {/* Left Logo */}
      <div className="nav-left">
        <img src="/PumpIcon.jpeg" alt="Petrol Pump Logo" />
      </div>

      {/* Right Section */}
      <div className="nav-right">
        <span className="welcome-text">Welcome</span>

        <FiLogOut className="logout-icon" />

        <img
          src="/petrol.avif"
          alt="Petrol Station"
          className="station-img"
        />
      </div>
    </nav>
  );
}

export default Navbar;