
import React, { useState, useEffect } from "react";
import "./Expense.css";

const ProfitCalculation = () => {
  const [sales, setSales] = useState("");
  const [electricity, setElectricity] = useState("");
  const [salary, setSalary] = useState("");
  const [maintenance, setMaintenance] = useState("");
  const [other, setOther] = useState("");

  const [totalExpenses, setTotalExpenses] = useState(0);
  const [profit, setProfit] = useState(0);

  const safeValue = (val) =>
    val === "" || val < 0 ? 0 : Number(val);

 
  useEffect(() => {
    setTotalExpenses(
      safeValue(electricity) +
      safeValue(salary) +
      safeValue(maintenance) +
      safeValue(other)
    );
  }, [electricity, salary, maintenance, other]);

  
  useEffect(() => {
    setProfit(safeValue(sales) - safeValue(totalExpenses));
  }, [sales, totalExpenses]);

  
  const handleUpdateExpenses = () => {
    setTimeout(() => {
      setSales("");
      setElectricity("");
      setSalary("");
      setMaintenance("");
      setOther("");
      setTotalExpenses(0);
      setProfit(0);
    }, 50);
  };

  return (
    <div className="page">
      <div className="main-card">
        <h3 className="page-title">Expense & Profit Management</h3>

       
        <div className="expense-list">
          <ExpenseRow icon="⚡" label="Electricity Bill" value={electricity} setValue={setElectricity} />
          <ExpenseRow icon="💼" label="Salary Expense" value={salary} setValue={setSalary} />
          <ExpenseRow icon="🔧" label="Maintenance" value={maintenance} setValue={setMaintenance} />
          <ExpenseRow icon="🪙" label="Other Expenses" value={other} setValue={setOther} />
        </div>

        
        <div className="update-right">
          <button className="action-btn" onClick={handleUpdateExpenses}>
            Update Expenses
          </button>
        </div>

        
        <div className="profit-box">
          <div className="profit-header">Profit Calculation</div>

         
          <div className="profit-row editable">
  <span>Total Sales</span>
  <input
    className="expense-input"
    type="number"
    min="0"
    value={sales}
    onFocus={() => sales === 0 && setSales("")}
    onChange={(e) =>
      setSales(
        e.target.value === ""
          ? ""
          : Math.max(0, Number(e.target.value))
      )
    }
  />
</div>


          <div className="profit-row">
            <span>Total Expenses</span>
            <span>₹ {totalExpenses.toLocaleString()}</span>
          </div>

          <div className="profit-row total-profit">
            <span>Total Profit</span>
            <span className={profit < 0 ? "loss" : "profit"}>
              ₹ {profit.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExpenseRow = ({ icon, label, value, setValue }) => (
  <div className="expense-row">
    <div className="expense-left">
      <span className="expense-icon">{icon}</span>
      <span>{label}</span>
    </div>
    <input
      type="number"
      min="0"
      value={value}
      onFocus={() => value === 0 && setValue("")}
      onChange={(e) =>
        setValue(
          e.target.value === ""
            ? ""
            : Math.max(0, Number(e.target.value))
        )
      }
    />
  </div>
);

export default ProfitCalculation;

