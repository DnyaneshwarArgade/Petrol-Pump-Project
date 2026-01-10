import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Bottom from "../Components/Bottom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Bottom />
    </>
  );
};

export default Layout;
