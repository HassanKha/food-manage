import React from "react";
import logo from "../../assets/logo.svg";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
const navigate = useNavigate()
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset",
        data
      );
      console.log("Reset successful:", response.data);
      toast.success("Reset successful");
      navigate("/login")
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className="container-fluid wrapper justify-content-center d-flex align-content-center">
        <div className="col-lg-6 auth-card-reset rounded-3 bg-white">
          <div className="row my-2 mx-5">
            <div className="col-lg-12 mx-auto d-flex flex-column justify-content-center align-content-center">
              <img
                className="w-50 text-center mx-auto"
                src={logo}
                alt="food-logo"
              />

              <div className="d-flex mx-5 my-5 justify-content-center align-content-center flex-column">
                <div className="log-title">
                  Forgot Your Password?
                  <p className="Wel-title">
                    No worries! Please enter your email and we will send a
                    password reset link
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fas fa-envelope w-25"></i>
                    </span>
                    <input
                      type="email"
                      placeholder="E-mail"
                      className="form-control bg-light py-3 border-0 shadow-none"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Invalid email format",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <small className="text-danger">{errors.email.message}</small>
                  )}

                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fas fa-lock w-25"></i>
                    </span>
                    <input
                      type="text"
                      placeholder="OTP"
                      className="form-control py-3 border-0 bg-light shadow-none"
                      {...register("seed", {
                        required: "OTP is required",
                      })}
                    />
                  </div>
                  {errors.seed && (
                    <small className="text-danger">{errors.seed.message}</small>
                  )}

                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fas fa-lock w-25"></i>
                    </span>
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control py-3 border-0 bg-light shadow-none"
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
                    <small className="text-danger">{errors.password.message}</small>
                  )}

                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fas fa-lock w-25"></i>
                    </span>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="form-control py-3 border-0 bg-light shadow-none"
                      {...register("confirmPassword", {
                        required: "Confirm Password is required",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <small className="text-danger">
                      {errors.confirmPassword.message}
                    </small>
                  )}

                  <button
                    type="submit"
                    className="btn btn-success login-btn w-100 py-2"
                    disabled={isSubmitting}
                    style={{
                      backgroundColor: "#4CAF50",
                      borderColor: "#4CAF50",
                    }}
                  >
                    {isSubmitting ? "Submitting..." : "Reset Password"}
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

export default ResetPassword;
