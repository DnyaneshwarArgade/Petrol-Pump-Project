import React from "react";

function Dashboard() {
  const cards = [
    { title: "Total Sales", value: "₹2,583", icon: "💰" },
    { title: "Petrol Sales", value: "450 L", icon: "⛽" },
    { title: "Diesel Sales", value: "320 L", icon: "🛢️" },
    { title: "CNG Sales", value: "180 Kg", icon: "🔥" },
  ];

  return (
    <>
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

      <style>{`
        .dashboard {
          padding: 20px;
          background-color: #f5f7fa;
        }

        .sales-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .sales-card {
          background: white;
          padding: 18px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
        }

        .card-icon {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background-color: #e6f4ea;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .card-title {
          font-size: 14px;
          color: gray;
          margin: 0;
        }

        .card-value {
          margin: 5px 0 0;
          font-size: 20px;
          color: #333;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .sales-cards {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .sales-cards {
            grid-template-columns: 1fr;
          }

          .sales-card {
            padding: 15px;
          }
        }
      `}</style>
    </>
  );
}

export default Dashboard;
