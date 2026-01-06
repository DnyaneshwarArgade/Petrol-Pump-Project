import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';

import Bottom from './Components/Bottom';
import Navbar from './Components/Navbar';

import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login'
import Register from './Pages/Register'
import Nozzle from './Pages/Nozzle'
import Reports from './Pages/Reports'
import StaffManagement from './Pages/StaffManagement';


function App()
{
  return (

    <BrowserRouter>
      <div>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/Navbar" element={<Navbar />} />
          <Route path='/Bottom' element={<Bottom />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/nozzle" element={<Nozzle />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/staffmanagement" element={<StaffManagement />} />
        </Routes>
        {/* <Bottom /> */}
      </div>
    </BrowserRouter>
  )
}
export default App; 