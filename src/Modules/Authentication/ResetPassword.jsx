import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { axiosInstance, USERS_URLS } from "../../urls";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from "../../validations";
import { useLocation } from "react-router-dom";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false); // 👈 Add state
const location = useLocation();
const email = location.state?.email || "";

console.log(email)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
  defaultValues: { email }
});
  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(USERS_URLS.RESET_PASS, data);
      console.log("Reset successful:", response.data);
      toast.success("Reset successful");
      navigate("/login");
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

              <div className="d-flex mx-5 my-4 justify-content-center align-content-center flex-column">
                <div className="log-title">
                  Forgot Your Password?
                  <p className="Wel-title">
                    No worries! Please enter your email and we will send a
                    password reset link
                  </p>
                </div>

                <form  onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group mb-4">
                    <span className="input-group-text z-1">
                      <i className="fas fa-envelope w-25"    aria-label="Email icon"></i>
                    </span>
                    <input
                      type="email"
                      placeholder="E-mail"
                      className="form-control bg-light py-3 border-0 shadow-none"
                      {...register("email", EMAIL_VALIDATION)}
                    />
                  </div>
                  {errors.email && (
                    <small className="text-danger">
                      {errors.email.message}
                    </small>
                  )}

                  <div className="input-group mb-4">
                    <span className="input-group-text z-1">
                      <i className="fas fa-lock w-25"   aria-label="Lock icon"></i>
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

                  <div className="input-group mb-4">
                    <span className="input-group-text z-1">
                      <i className="fas fa-lock w-25"   aria-label="Lock icon"></i>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="form-control py-3 border-0 bg-light shadow-none"
                      {...register("password", PASSWORD_VALIDATION)}
                    />
                    <span
                      className="input-group-text z-1"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowPassword((prev) => !prev)}
                      onMouseDown={(e) => {
                        e.preventDefault(); // prevent input blur
                      }}
                      onMouseUp={(e) => {
                        e.preventDefault(); // prevent input blur
                      }}
                    >
                      <i
                        className={`fas ${
                          showPassword ? "fa-eye-slash" : "fa-eye"
                        }`}
                      ></i>
                    </span>
                  </div>
                  {errors.password && (
                    <small className="text-danger">
                      {errors.password.message}
                    </small>
                  )}

                  <div className="input-group mb-4">
                    <span className="input-group-text z-1">
                      <i className="fas fa-lock w-25"></i>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      className="form-control py-3 border-0 bg-light shadow-none"
                      {...register("confirmPassword", {
                        required: "Confirm Password is required",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                    />
                  <span
                      className="input-group-text z-1"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowPassword((prev) => !prev)}
                      onMouseDown={(e) => {
                        e.preventDefault(); // prevent input blur
                      }}
                      onMouseUp={(e) => {
                        e.preventDefault(); // prevent input blur
                      }}
                    >
                      <i
                        className={`fas ${
                          showPassword ? "fa-eye-slash" : "fa-eye"
                        }`}
                      ></i>
                    </span>
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
