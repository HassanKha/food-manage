import React from "react";
import Header from "../Shared/Header";
import logo from "../../assets/header.png";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <Header
        imgPath={logo}
        title={"Welcome Upskilling"}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
      />
      <div className="container recipe-header mt-2 mx-2  rounded-2 p-4">
        <div className="row">
          <div className="col-md-8 d-flex align-items-center">
            <div>
              <h5>Fill the Recipes !</h5>
              <p>
                you can now fill the meals easily using the table and form ,
                click here and sill it with the table !
              </p>
            </div>
          </div>
          <div className="col-md-4 d-flex justify-content-end align-items-center">
            <button
              onClick={() => navigate("/dashboard/recipes")}
              className="btn btn-success"
            >
              All Recipes{" "}
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
