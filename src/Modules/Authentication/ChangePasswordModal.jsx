"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import logo from "../../assets/logo.svg";
import { axiosInstance, USERS_URLS } from "../../urls";
import { PASSWORD_VALIDATION } from "../../validations";

function ChangePasswordModal({ isOpen, onClose }) {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const newPassword = watch("newPassword");

  const CONFIRM_PASSWORD_VALIDATION = {
    required: "Please confirm your new password",
    validate: (value) => value === newPassword || "Passwords do not match",
  };

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.put(USERS_URLS.CHANGE_PASS, {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmPassword,
      });

      toast.success("Password changed successfully!");
      reset();
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to change password!"
      );
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div
        className="modal fade show"
        style={{
          display: "block",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(4px)",
        }}
        tabIndex="-1"
        onClick={handleClose}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: "746px" }}
        >
          <div
            className="modal-content border-0 shadow-lg"
            style={{
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <div className="modal-body p-4">
              {/* Logo Section */}
              <div className="text-center mb-4">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <img
                    className="w-50 text-center mb-5 mx-auto"
                    src={logo}
                    alt="food-logo"
                  />
                </div>
              </div>

              {/* Header */}
              <div className="text-center mb-4">
                <h3
                  className="fw-bold mb-2"
                  style={{ color: "#333", fontSize: "1.8rem" }}
                >
                  Change Your Password
                </h3>
                <p className="text-muted mb-0" style={{ fontSize: "1rem" }}>
                  Enter your details below
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Old Password */}
                <div className="mb-4">
                  <div
                    className="form-control d-flex align-items-center"
                    style={{
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #e9ecef",
                      borderRadius: "12px",
                      padding: "14px 18px",
                      minHeight: "55px",
                    }}
                  >
                    <i
                      className="fas fa-lock text-muted me-3"
                      style={{ fontSize: "1.1rem", width: "16px" }}
                    ></i>
                    <input
                      type={showOldPassword ? "text" : "password"}
                      placeholder="Old Password"
                      className="border-0 bg-transparent flex-grow-1"
                      style={{
                        outline: "none",
                        fontSize: "1rem",
                        color: "#333",
                      }}
                      {...register("oldPassword", {
                        required: "Old password is required",
                      })}
                    />
                    <i
                      className={`fas ${
                        showOldPassword ? "fa-eye-slash" : "fa-eye"
                      } text-muted`}
                      style={{ cursor: "pointer", fontSize: "1.1rem" }}
                      onClick={() => setShowOldPassword((prev) => !prev)}
                    ></i>
                  </div>
                  {errors.oldPassword && (
                    <small className="text-danger mt-1 d-block">
                      {errors.oldPassword.message}
                    </small>
                  )}
                </div>

                {/* New Password */}
                <div className="mb-4">
                  <div
                    className="form-control d-flex align-items-center"
                    style={{
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #e9ecef",
                      borderRadius: "12px",
                      padding: "14px 18px",
                      minHeight: "55px",
                    }}
                  >
                    <i
                      className="fas fa-lock text-muted me-3"
                      style={{ fontSize: "1.1rem", width: "16px" }}
                    ></i>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="New Password"
                      className="border-0 bg-transparent flex-grow-1"
                      style={{
                        outline: "none",
                        fontSize: "1rem",
                        color: "#333",
                      }}
                      {...register("newPassword", PASSWORD_VALIDATION)}
                    />
                    <i
                      className={`fas ${
                        showNewPassword ? "fa-eye-slash" : "fa-eye"
                      } text-muted`}
                      style={{ cursor: "pointer", fontSize: "1.1rem" }}
                      onClick={() => setShowNewPassword((prev) => !prev)}
                    ></i>
                  </div>
                  {errors.newPassword && (
                    <small className="text-danger mt-1 d-block">
                      {errors.newPassword.message}
                    </small>
                  )}
                </div>

                {/* Confirm New Password */}
                <div className="mb-4">
                  <div
                    className="form-control d-flex align-items-center"
                    style={{
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #e9ecef",
                      borderRadius: "12px",
                      padding: "14px 18px",
                      minHeight: "55px",
                    }}
                  >
                    <i
                      className="fas fa-lock text-muted me-3"
                      style={{ fontSize: "1.1rem", width: "16px" }}
                    ></i>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm New Password"
                      className="border-0 bg-transparent flex-grow-1"
                      style={{
                        outline: "none",
                        fontSize: "1rem",
                        color: "#333",
                      }}
                      {...register(
                        "confirmPassword",
                        CONFIRM_PASSWORD_VALIDATION
                      )}
                    />
                    <i
                      className={`fas ${
                        showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                      } text-muted`}
                      style={{ cursor: "pointer", fontSize: "1.1rem" }}
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    ></i>
                  </div>
                  {errors.confirmPassword && (
                    <small className="text-danger mt-1 d-block">
                      {errors.confirmPassword.message}
                    </small>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn w-100 py-3 mt-3"
                  style={{
                    backgroundColor: "#28a745",
                    borderColor: "#28a745",
                    color: "white",
                    borderRadius: "12px",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    border: "none",
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Changing Password...
                    </>
                  ) : (
                    "Change Password"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePasswordModal;
