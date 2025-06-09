import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import Girl from "../../assets/Girl.png";
import { AuthContext } from "../../context/AuthContext";
export default function Header({ title, description, imgPath }) {
  const {pathname} = useLocation()
  const {LoggedData} = useContext(AuthContext);

  return (
    <div className="container-fluid  font-poppins w-100 mx-2 my-3 rounded-2 Image-Header ">
      <div className="row text-white d-md-flex justify-content-md-center justify-content-lg-start align-items-lg-center justify-content-center align-items-center justify-content-sm-center align-items-sm-center align-items-md-center d-flex flex-lg-row  flex-md-column">
        <div className="col-md-8 d-flex align-items-center">
        <div className="w-100 mt-md-4 mt-lg-0 mt-2 mt-sm-3">
          <h3 className="title mx-5">Welcome {LoggedData.userName} - {title}</h3>
          <p className="desc">{description}</p>
        </div>
      </div>
       <div className="col-md-4 mt-md-4 mt-lg-0 mt-sm-3 mt-2 d-flex  justify-content-center">
        <img src={pathname == '/dashboard' ? Girl : imgPath} alt="header img" />
      </div>
      </div>
     
    </div>
  );
}
