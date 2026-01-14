import React from "react";
import "./Dashboard.css";

function Dashboard() {
  const salesCards = [
    { title: "Total Sales", value: "₹2,583", icon: "💰" },
    { title: "Petrol Sales", value: "450 L", icon: "⛽" },
    { title: "Diesel Sales", value: "320 L", icon: "🛢️" },
    { title: "CNG Sales", value: "180 Kg", icon: "🔥" },
  ];

  const employeeCards = [
    { title: "Total Employees", value: "48", icon: "👥" },
    { title: "Cashiers", value: "12", icon: "💵" },
    { title: "Managers", value: "5", icon: "🧑‍💼" },
    { title: "Attendance", value: "42 Present", icon: "📋" },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        
        {/* Sales Cards */}
        <div className="sales-cards">
          {salesCards.map((card, index) => (
            <div className="sales-card" key={index}>
              <div className="card-icon">{card.icon}</div>
              <div>
                <p className="card-title">{card.title}</p>
                <h3 className="card-value">{card.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Employee Cards */}
        <div className="sales-cards">
          {employeeCards.map((card, index) => (
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
    </div>
  );
}

export default Dashboard;
