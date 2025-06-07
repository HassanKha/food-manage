import React from "react";
import NotFound from "../../assets/notfound.svg";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
export default function Notfound() {
  return (
    <>
      {/* Bootstrap CSS */}

      <div className="min-vh-100 bg-white ">
        {/* Main content */}
        <div className="container-fluid ">
          <div className="row align-items-center min-vh-75">
            <div className="d-flex ">
              <img
                src={logo} // Replace this with your actual import or image path
                alt="Logo"
                style={{
                  width: "15rem",
                  height: "15rem",
                  objectFit: "contain",
                }}
              />
            </div>
            <div className="col-lg-6 col-md-8">
              <div className="ps-4">
                <h2 className="display-1 fw-bold text-dark mb-2">Oops.</h2>
                <h3
                  className="display-5 fw-bold mb-4"
                  style={{ color: "#22c55e" }}
                >
                  Page not found
                </h3>
                <p className="text-muted mb-4 fs-5 lh-base">
                  This Page doesn't exist or was removed!
                  <br />
                  We suggest you back to home.
                </p>
                <Link to={"/"} className="text-decoration-none  ">
                  <button
                    className="btn btn-lg px-4 py-3 d-flex justify-content-center align-items-center"
                    style={{
                      backgroundColor: "#22c55e",
                      borderColor: "#22c55e",
                      color: "white",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#16a34a";
                      e.currentTarget.style.borderColor = "#16a34a";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "#22c55e";
                      e.currentTarget.style.borderColor = "#22c55e";
                    }}
                  >
                    <i
                      class="bi bi-arrow-left"
                      style={{ width: "1.25rem", height: "1.25rem" }}
                    ></i>
                    Back To Home
                  </button>
                </Link>
              </div>
            </div>

            {/* Right side with 404 SVG logo */}
            <div className="d-none d-lg-block">
              <div className="position-fixed top-0 end-0">
                <img
                  src={NotFound}
                  alt="Page not found"
                  className="img-fluid"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100vh",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .min-vh-75 {
          min-height: 75vh;
        }

        @media (max-width: 991.98px) {
          .display-1 {
            font-size: 4rem;
          }
          .display-5 {
            font-size: 2rem;
          }
        }

        @media (max-width: 575.98px) {
          .display-1 {
            font-size: 3rem;
          }
          .display-5 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </>
  );
}
