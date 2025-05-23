import React from "react";
import logo from "../../assets/logo.svg";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login({SaveLoginData}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Login", data);
      localStorage.setItem("token", response.data.token);
      console.log("Login successful:", response.data);
      SaveLoginData();
      toast.success("Login successful!");
      navigate("/dashboard")
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="auth-container">
      <div className="container-fluid wrapper justify-content-center d-flex align-content-center">
        <div className=" col-lg-6  auth-card rounded-3  bg-white">
          <div className="row my-4 mx-5 ">
            <div className="col-lg-12 mx-auto d-flex flex-column justify-content-center align-content-center ">
              <img
                className="w-50 text-center mb-2 mx-auto"
                src={logo}
                alt="food-logo"
              />

              <div className="d-flex mx-5 justify-content-center align-content-center flex-column">
                <div className="log-title">
                  Log In
                  <p className="Wel-title">
                    Welcome Back! Please enter your details
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className=" input-group mb-4">
                    <span className="input-group-text">
                      <i className="fas position-relative fa-envelope w-25"></i>
                    </span>
                    <input
                      type="email"
                      placeholder="Enter your E-mail"
                      className="form-control bg-light py-3 border-0 shadow-none"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: "/^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9", // 
                          message: "Invalid email format",
                        },
                      })}
                    />
                   
                  </div>
                   {errors.email && (
                      <small className="text-danger">
                        {errors.email.message}
                      </small>
                    )}
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fas position-relative fa-lock w-25"></i>
                    </span>
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control py-3 border-0 bg-light shadow-none"
                      style={{ boxShadow: "none", outline: "none" }}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                  
                  </div>
  {errors.password && (
                      <small className="text-danger">
                        {errors.password.message}
                      </small>
                    )}
                  <div className="d-flex justify-content-between mb-5">
                    <a href="/register" className="text-decoration-none register-btn ">
                      Register Now?
                    </a>
                    <a href="/forget-pass" className="text-decoration-none fB-btn ">
                      Forgot Password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success login-btn w-100 py-2"
                    style={{
                      backgroundColor: "#4CAF50",
                      borderColor: "#4CAF50",
                    }}
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
