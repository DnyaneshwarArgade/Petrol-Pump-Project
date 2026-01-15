import React from "react";
import {
  FaMoneyBillWave,
  FaGasPump,
  FaOilCan,
  FaFire,
  FaUsers,
  FaUserTie,
  FaUserCheck,
  FaClipboardList,
} from "react-icons/fa";
import "./Dashboard.css";

function Dashboard() {
  const cards = [
    { title: "Total Sales", value: "₹2,583", icon: <FaMoneyBillWave /> },
    { title: "Petrol Sales", value: "450 L", icon: <FaGasPump /> },
    { title: "Diesel Sales", value: "320 L", icon: <FaOilCan /> },
    { title: "CNG Sales", value: "180 Kg", icon: <FaFire /> },
    { title: "Total Employees", value: "48", icon: <FaUsers /> },
    { title: "Cashiers", value: "12", icon: <FaUserCheck /> },
    { title: "Managers", value: "5", icon: <FaUserTie /> },
    { title: "Attendance", value: "42 Present", icon: <FaClipboardList /> },
  ];

  return (
    <div className="dashboard">
      <div className="sales-cards">
        {cards.map((card, index) => (
          <div className="sales-card" key={index}>
            <div className="card-icon">{card.icon}</div>
            <div className="card-content">
              <p className="card-title">{card.title}</p>
              <h3 className="card-value">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
