import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function MasterLayout() {
  return (
    <div>
      <div className="d-flex">
        <div className="w-25 bg-info">
          <Sidebar />
        </div>
        <div className="w-75 bg-warning">
          <Navbar />
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
