import React, { useState, useEffect } from "react";
import { FaBolt, FaBriefcase, FaTools, FaCoins } from "react-icons/fa";
import "./Expense.css";

const ProfitCalculation = () => {
  const [sales, setSales] = useState(0);
  const [electricity, setElectricity] = useState(0);
  const [salary, setSalary] = useState(0);
  const [maintenance, setMaintenance] = useState(0);
  const [other, setOther] = useState(0);

  const [totalExpenses, setTotalExpenses] = useState(0);
  const [profit, setProfit] = useState(0);

  useEffect(() => {
    const total =
      Number(electricity) +
      Number(salary) +
      Number(maintenance) +
      Number(other);

    setTotalExpenses(total);
    setProfit(Number(sales) - total);
  }, [sales, electricity, salary, maintenance, other]);

  const handleUpdateExpenses = () => {
    setSales(0);
    setElectricity(0);
    setSalary(0);
    setMaintenance(0);
    setOther(0);
    setTotalExpenses(0);
    setProfit(0);
  };

  return (
    <div className="page">
      <div className="main-card">
        <h3 className="page-title">Expense & Profit Management</h3>

        <div className="content-row">
          
          <div className="left-section">
            <div className="expense-list">              
              <ExpenseRow icon={<FaBolt />} label="Electricity Bill" value={electricity} setValue={setElectricity} />
              <ExpenseRow icon={<FaBriefcase />} label="Salary Expense" value={salary} setValue={setSalary} />
              <ExpenseRow icon={<FaTools />} label="Maintenance" value={maintenance} setValue={setMaintenance} />
              <ExpenseRow icon={<FaCoins />} label="Other Expenses" value={other} setValue={setOther} /> 
            </div>

            <div className="update-right">
              <button className="action-btn" onClick={handleUpdateExpenses}>
                Clear
              </button>
            </div>
          </div>

         
          <div className="right-section">
            <div className="profit-box">
              <div className="profit-header">Profit Calculation</div>

              <div className="profit-row editable">
                <span>Total Sales</span>
                <input
                  type="number"
                  min="0"
                  value={sales}
                  onFocus={(e) => sales === 0 && setSales("")}
                  onChange={(e) =>
                    setSales(e.target.value === "" ? 0 : Number(e.target.value))
                  }
                />
              </div>

              <div className="profit-row">
                <span>Total Expenses</span>
                <span>₹ {totalExpenses}</span>
              </div>

              <div className="profit-row total-profit">
                <span>Total Profit</span>
                <span className={profit < 0 ? "loss" : "profit"}>
                  ₹ {profit}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const ExpenseRow = ({ icon, label, value, setValue }) => (
  <div className="expense-row">
    <div className="expense-left">
      <span>{icon}</span>
      <span>{label}</span>
    </div>
    <input
      type="number"
      min="0"
      value={value}
      onFocus={() => value === 0 && setValue("")}
      onChange={(e) =>
        setValue(e.target.value === "" ? 0 : Number(e.target.value))
      }
    />
  </div>
  
);
export default ProfitCalculation;


