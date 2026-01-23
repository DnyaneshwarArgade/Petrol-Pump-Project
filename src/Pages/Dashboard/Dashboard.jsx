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
    {
      title: "Total Sales",
      value: "₹2,583",
      icon: <FaMoneyBillWave />,
      color: "green",
    },
    {
      title: "Petrol Sales",
      value: "450 L",
      icon: <FaGasPump />,
      color: "blue",
    },
    {
      title: "Diesel Sales",
      value: "320 L",
      icon: <FaOilCan />,
      color: "yellow",
    },
    {
      title: "CNG Sales",
      value: "180 Kg",
      icon: <FaFire />,
      color: "orange",
    },
    {
      title: "Total Employees",
      value: "48",
      icon: <FaUsers />,
      color: "purple",
    },
    {
      title: "Cashiers",
      value: "12",
      icon: <FaUserCheck />,
      color: "teal",
    },
    {
      title: "Managers",
      value: "5",
      icon: <FaUserTie />,
      color: "indigo",
    },
    {
      title: "Attendance",
      value: "42",
      icon: <FaClipboardList />,
      color: "pink",
    },
  ];

  return (
    <div className="dashboard">
      <div className="sales-cards">
        {cards.map((card, index) => (
          <div className="sales-card" key={index}>
            <div className={`card-icon ${card.color}`}>
              {card.icon}
            </div>

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
