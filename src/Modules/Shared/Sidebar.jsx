import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/navlogo.png";
export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Redirect after logout
  };

  return (
    <div className="sidebar-cont custom-tex">
      <Sidebar collapsed={collapsed}>
        <Menu>
          <MenuItem
            onClick={toggleCollapse}
            className="my-5 d-flex justify-content-center align-items-center sidebar-logo"
            component={<Link to="/dashboard" />}
          >
            {" "}
            <img src={logo} className="" alt="logo" />{" "}
          </MenuItem>

          <MenuItem
            icon={<i className="fa fa-home" />}
            component={<Link to="/dashboard" />}
          >
            {" "}
            Home{" "}
          </MenuItem>
          <MenuItem
            icon={<i className="fa fa-users" />}
            component={<Link to="/dashboard/users" />}
          >
            {" "}
            Users{" "}
          </MenuItem>
          <MenuItem
            icon={<i className="bi bi-fork-knife" />}
            component={<Link to="/dashboard/recipes" />}
          >
            {" "}
            Recipes{" "}
          </MenuItem>
          <MenuItem
            icon={<i className="bi bi-tags-fill" />}
            component={<Link to="/dashboard/categories" />}
          >
            {" "}
            Categories{" "}
          </MenuItem>
          <MenuItem
            icon={<i className="bi bi-lock-fill" />}
            component={<Link to="" />}
          >
            {" "}
            Change Password{" "}
          </MenuItem>
          <MenuItem onClick={handleLogout} icon={<i className="bi bi-box-arrow-right" />}>
            {" "}
            Logout{" "}
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
