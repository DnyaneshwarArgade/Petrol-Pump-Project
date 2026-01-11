import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './Layout/Layout';

import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Nozzle from './Pages/Nozzle';
import Reports from './Pages/Reports';
import StaffManagement from './Pages/StaffManagement';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/nozzle" element={<Nozzle />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/staffmanagement" element={<StaffManagement />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
