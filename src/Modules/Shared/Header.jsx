import React from "react";

export default function Header({ title, description, imgPath }) {
  return (
    <div className="container-fluid w-100 mx-2 my-3 rounded-2 Image-Header ">
      <div className="row text-white ">
        <div className="col-md-8 d-flex align-items-center">
        <div className="w-100">
          <h3 className="title mx-5">{title}</h3>
          <p className="desc">{description}</p>
        </div>
      </div>
       <div className="col-md-4 d-flex justify-content-end">
        <img src={imgPath} alt="header img" />
      </div>
      </div>
     
    </div>
  );
}
