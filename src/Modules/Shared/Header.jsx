import React from "react";

export default function Header({ title, description, imgPath }) {
  return (
    <div className="container-fluid ">
      <div className="row ">
        <div className="col-md-8 d-flex align-items-center">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
       <div className="col-md-4 d-flex justify-content-end">
        <img src={imgPath} alt="header img" />
      </div>
      </div>
     
    </div>
  );
}
