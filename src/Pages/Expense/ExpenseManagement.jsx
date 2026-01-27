import React, { useState } from "react";
import "./Expense.css";

const ProfitCalculation = () => {
  const [sales, setSales] = useState(125000);

  const [electricity, setElectricity] = useState(20000);
  const [salary, setSalary] = useState(35000);
  const [maintenance, setMaintenance] = useState(10000);
  const [other, setOther] = useState(5000);

  const calculatedExpenses =
    electricity + salary + maintenance + other;

  const [totalExpenses, setTotalExpenses] =
    useState(calculatedExpenses);

  const [profit, setProfit] = useState(null);

  const handleUpdateExpenses = () => {
    setTotalExpenses(calculatedExpenses);
  };

  const handleCalculateProfit = () => {
    setProfit(sales - totalExpenses);
  };

  return (
  
    <div className="page">
     
      <div className="main-card">
        <h3 className="page-title">Profit Calculation</h3>

        
        <div className="profit-box">
          <div className="profit-header">
            Profit Calculation
          </div>

         
          <div className="profit-row editable">
            <span>Total Sales</span>
            <input
              type="number"
              value={sales}
              onChange={(e) =>
                setSales(Number(e.target.value))
              }
            />
          </div>

          
          <div className="profit-row editable">
            <span>Total Expenses</span>
            <input
              type="number"
              value={totalExpenses}
              onChange={(e) =>
                setTotalExpenses(Number(e.target.value))
              }
            />
          </div>

          
          <div className="profit-row total-profit">
            <span>Total Profit</span>
            <span>
              {profit === null
                ? "—"
                : `₹ ${profit.toLocaleString()}`}
            </span>
          </div>

          <div className="calc-btn-wrapper">
            <button
              className="calc-btn"
              onClick={handleCalculateProfit}
            >
              Calculate Profit
            </button>
          </div>
        </div>

       
        <div className="expense-list">
          <ExpenseRow
            icon="⚡"
            label="Electricity Bill"
            value={electricity}
            setValue={setElectricity}
          />
          <ExpenseRow
            icon="💼"
            label="Salary Expense"
            value={salary}
            setValue={setSalary}
          />
          <ExpenseRow
            icon="🔧"
            label="Maintenance"
            value={maintenance}
            setValue={setMaintenance}
          />
          <ExpenseRow
            icon="🪙"
            label="Other Expenses"
            value={other}
            setValue={setOther}
          />
        </div>

        <div className="update-btn-wrapper">
          <button
            className="update-btn"
            onClick={handleUpdateExpenses}
          >
            Update Expenses
          </button>
        </div>
      </div>
    </div>
  );
};

const ExpenseRow = ({
  icon,
  label,
  value,
  setValue,
}) => {
  return (
    <div className="expense-row">
      <div className="expense-left">
        <span className="expense-icon">
          {icon}
        </span>
        <span>{label}</span>
      </div>
      <input
        type="number"
        value={value}
        onChange={(e) =>
          setValue(Number(e.target.value))
        }
      />
    </div>
  );
};

export default ProfitCalculation;




