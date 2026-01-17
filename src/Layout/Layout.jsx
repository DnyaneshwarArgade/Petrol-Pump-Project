import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Bottom from "../Components/Bottom";
import "./Layout.css";

const Layout = () => {
  return (

    <div className="layout-container">
      <Navbar />

      <main className="content-layout">
        <Outlet />
      </main>

      <Bottom />
    </div>
  );
};

export default Layout;
