import React, { useContext } from "react";
import profileIcon from "../../assets/profileIcon.png";
import headers from "../../assets/headers.svg";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  let { LoggedData } = useContext(AuthContext);
  return (
    <nav className="navbar px-5 mx-3 py-3 rounded-4 mt-3 navbar-expand-lg navbar-light bg-light">
      {/* Search Form */}
      <form
        className="d-flex SearchDiv justify-content-center align-items-center w-75"
        role="search"
      >
        <i className="bi bi-search mx-2"></i>
        <input
          className="form-control me-2 searchInput"
          type="search"
          placeholder="Search Here"
          aria-label="Search"
        />
      </form>

      {/* Toggler for small screens */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse" // Bootstrap 5
        data-bs-target="#navbarProfileSection"
        aria-controls="navbarProfileSection"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Collapsible Profile Section */}
      <div
        className="collapse navbar-collapse w-25 d-lg-flex justify-content-center align-items-center"
        id="navbarProfileSection"
      >
        <ul className="navbar-nav d-flex justify-content-center w-100 align-items-center">
          <li className="nav-item active d-flex justify-content-evenly w-100 align-items-center">
            <div className="d-flex justify-content-center align-items-center">
              <img src={profileIcon} alt="profile" />
              <a className="nav-link" href="#">
                {LoggedData?.userName ? LoggedData.userName : "Loading..."}
              </a>
            </div>
            <i className="bi bi-arrow-down-short"></i>
            <i className="bi bi-bell-fill ms-2"></i>
          </li>
        </ul>
      </div>
    </nav>
  );
}
