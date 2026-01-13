import React from "react";
import "./Dashboard.css";

function Dashboard() {
  const cards = [
    { title: "Total Sales", value: "₹2,583", icon: "💰" },
    { title: "Petrol Sales", value: "450 L", icon: "⛽" },
    { title: "Diesel Sales", value: "320 L", icon: "🛢️" },
    { title: "CNG Sales", value: "180 Kg", icon: "🔥" },
  ];

  return (
    <div className="dashboard">
      <div className="sales-cards">
        {cards.map((card, index) => (
          <div className="sales-card" key={index}>
            <div className="card-icon">{card.icon}</div>
            <div>
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
