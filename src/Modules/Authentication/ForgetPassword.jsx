import React from "react";
import logo from "../../assets/logo.svg";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { axiosInstance, USERS_URLS } from "../../urls";
import { EMAIL_VALIDATION } from "../../validations";
function ForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
const navigate = useNavigate()
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(USERS_URLS.FORGET_PASS, data);
      console.log("Login successful:", response.data);
      toast.success("Your request is being processed, please check your email");
navigate("/reset-pass")
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="container-fluid wrapper justify-content-center d-flex align-content-center">
        <div className=" col-lg-6  auth-card rounded-3  bg-white">
          <div className="row my-4 mx-5  ">
            <div className="col-lg-12 mx-auto  d-flex flex-column justify-content-center align-content-center ">
              <img
                className="w-50 text-center  mx-auto"
                src={logo}
                alt="food-logo"
              />

              <div className="d-flex mx-5 my-5 justify-content-center align-content-center flex-column">
                <div className="log-title">
                  Forgot Your Password?
                  <p className="Wel-title">
                    No worries! Please enter your email and we will send a password reset link 
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className=" input-group mb-5">
                    <span className="input-group-text">
                      <i className="fas position-relative fa-envelope w-25"></i>
                    </span>
                    <input
                      type="email"
                      placeholder="Enter your E-mail"
                      className="form-control bg-light py-3 border-0 shadow-none"
                      {...register("email", EMAIL_VALIDATION)}
                    />
                   
                  </div>
                   {errors.email && (
                      <small className="text-danger">
                        {errors.email.message}
                      </small>
                    )}
             

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

export default ForgetPassword;
