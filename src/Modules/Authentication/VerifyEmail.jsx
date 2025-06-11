

import { useContext } from "react"
import logo from "../../assets/logo.svg"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { axiosInstance, USERS_URLS } from "../../urls"
import { EMAIL_VALIDATION } from "../../validations"
import { AuthContext } from "../../context/AuthContext"

function VerifyEmail() {
  const { SaveLoginData } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()
  const navigate = useNavigate()

  const OTP_VALIDATION = {
    required: "OTP is required",
    pattern: {
      message: "Please enter a valid OTP (4-6 digits)",
    },
  }

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.put(USERS_URLS.Verify, {
        email: data.email,
        code: data.otp,
      })

      console.log("Verification successful:", response.data)
      SaveLoginData()
      toast.success("Account verified successfully!")
      navigate("/login")
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed!")
    }
  }

  const handleResendOTP = async () => {
    try {
      const email = document.querySelector('input[name="email"]').value
      if (!email) {
        toast.error("Please enter your email first")
        return
      }

      await axiosInstance.post(USERS_URLS.RESEND_OTP, { email })
      toast.success("OTP sent to your email!")
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP!")
    }
  }

  return (
    <div className="auth-container">
      <div className="container-fluid wrapper justify-content-center d-flex align-content-center">
        <div
          className="col-lg-6 auth-card rounded-4 bg-white shadow-lg"
          style={{
            border: "none",
            paddingLeft: "3rem",
               paddingRight: "3rem",
 paddingBottom: "1rem",
                paddingTop: "1rem",
          }}
        >
          <div className="row">
            <div className="col-lg-12 mx-auto d-flex flex-column justify-content-center align-content-center">
              {/* Logo Section */}
              <div className="text-center mb-4">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <img
                       className="w-50 text-center mb-2 mx-auto"
                       src={logo}
                       alt="food-logo"
                     />
           
                </div>
              </div>

              {/* Header */}
              <div className="text-center mb-4">
                <h3 className="fw-bold mb-2" style={{ color: "#333", fontSize: "1.8rem" }}>
                  Verify Account
                </h3>
                <p className="text-muted mb-0" style={{ fontSize: "1rem" }}>
                  Please Enter Your Otp or Check Your Inbox
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email Field */}
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
                    <i className="fas fa-envelope text-muted me-3" style={{ fontSize: "1.1rem", width: "16px" }}></i>
                    <input
                      type="email"
                      placeholder="Email"
                      className="border-0 bg-transparent flex-grow-1"
                      style={{
                        outline: "none",
                        fontSize: "1rem",
                        color: "#333",
                      }}
                      {...register("email", EMAIL_VALIDATION)}
                    />
                  </div>
                  {errors.email && <small className="text-danger mt-1 d-block">{errors.email.message}</small>}
                </div>

                {/* OTP Field */}
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
                    <i className="fas fa-lock text-muted me-3" style={{ fontSize: "1.1rem", width: "16px" }}></i>
                    <input
                      type="text"
                      placeholder="OTP"
                      className="border-0 bg-transparent flex-grow-1"
                      style={{
                        outline: "none",
                        fontSize: "1rem",
                        color: "#333",
                        letterSpacing: "2px",
                      }}
                      maxLength="6"
                      {...register("otp", OTP_VALIDATION)}
                    />
                  </div>
                  {errors.otp && <small className="text-danger mt-1 d-block">{errors.otp.message}</small>}
                </div>

           
                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn w-100 py-3"
                  style={{
                    backgroundColor: "#28a745",
                    borderColor: "#28a745",
                    color: "white",
                    borderRadius: "12px",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    border: "none",
                    textTransform: "lowercase",
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Verifying...
                    </>
                  ) : (
                    "send"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail
