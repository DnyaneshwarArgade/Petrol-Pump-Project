import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './Layout/Layout';

import Dashboard from './Pages/Dashboard/Dashboard'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import Nozzle from './Pages/Nozzle/Nozzle'
import Reports from './Pages/Report/Reports'
import StaffManagement from './Pages/Staff/StaffManagement'
import Sidebar from './Components/SideBar/Sidebar'
import ExpenseManagement from './Pages/Expense/ExpenseManagement';
import FuelStockManagement from './Pages/FuelStock/FuelStockManagement';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/nozzle" element={<Nozzle />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/staffmanagement" element={<StaffManagement />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/expensemanagement" element={<ExpenseManagement />} />
          <Route path="/fuelstockmanagement" element={<FuelStockManagement />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
