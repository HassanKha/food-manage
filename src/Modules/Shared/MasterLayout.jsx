import React from "react";
import Sidebar from "./SideBar";
import Navbar from "./Navbar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function MasterLayout({LoggedData}) {
  return (
    <div>
      <div className="d-flex">
        <div className=" ">
          <Sidebar />
        </div>
        <div className="w-100 bg-warning">
          <Navbar LoggedData={LoggedData} />

          <Outlet />
        </div>
      </div>
    </div>
  );
}
