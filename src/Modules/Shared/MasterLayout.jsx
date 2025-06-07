import React, { useContext } from "react";

import Navbar from "./Navbar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";
import { AuthContext } from "../../context/AuthContext";

export default function MasterLayout() {
      let {LoggedData} = useContext(AuthContext); // 👈 Use context to save login data
  
  return (
    <div>
      <div className="d-flex overflow-x-hidden">
        <div className=" ">
          <SideBar />
        </div>
        <div className="w-100 ">
          <Navbar  />

          <Outlet />
        </div>
      </div>
    </div>
  );
}
