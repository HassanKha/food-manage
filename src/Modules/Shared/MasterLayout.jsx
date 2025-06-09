import React, { useContext } from "react";

import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import SideBarFM from './SideBarFM';




export default function MasterLayout() {
  
  return (
    <div>
      <div className="d-flex h-100 overflow-x-hidden">
        <div className="navside">
          <SideBarFM />
        </div>
        <div className="w-100 ">
          <Navbar  />

          <Outlet />
        </div>
      </div>
    </div>
  );
}
