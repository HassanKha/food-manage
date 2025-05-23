import React from "react";

import Navbar from "./Navbar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";

export default function MasterLayout({LoggedData}) {
  return (
    <div>
      <div className="d-flex">
        <div className=" ">
          <SideBar />
        </div>
        <div className="w-100 bg-warning">
          <Navbar LoggedData={LoggedData} />

          <Outlet />
        </div>
      </div>
    </div>
  );
}
