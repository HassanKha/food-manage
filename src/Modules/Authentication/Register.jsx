

import { useContext, useState } from "react"
import logo from "../../assets/logo.svg"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { axiosInstance, USERS_URLS } from "../../urls"
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from "../../validations"
import { AuthContext } from "../../context/AuthContext"

function Register() {
  const { SaveLoginData } = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm()

  const navigate = useNavigate()
  const password = watch("password")

  // Validation rules
  const USERNAME_VALIDATION = {
    required: "Username is required",
    minLength: {
      value: 3,
      message: "Username must be at least 3 characters",
    },
    maxLength: {
      value: 20,
      message: "Username must not exceed 20 characters",
    },
  }

  const PHONE_VALIDATION = {
    required: "Phone number is required",
    pattern: {
      value: /^[0-9]{10,15}$/,
      message: "Please enter a valid phone number",
    },
  }

  const COUNTRY_VALIDATION = {
    required: "Country is required",
    minLength: {
      value: 2,
      message: "Country must be at least 2 characters",
    },
  }

  const CONFIRM_PASSWORD_VALIDATION = {
    required: "Please confirm your password",
    validate: (value) => value === password || "Passwords do not match",
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      formData.append("userName", data.userName)
      formData.append("email", data.email)
      formData.append("country", data.country)
      formData.append("phoneNumber", data.phoneNumber)
      formData.append("password", data.password)
      formData.append("confirmPassword", data.confirmPassword)

      if (selectedImage) {
        formData.append("profileImage", selectedImage)
      }

      const response = await axiosInstance.post(USERS_URLS.REGISTER, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      console.log("Registration successful:", response.data)
      toast.success("Registration successful! go to your email , verify and Please login.")
      navigate("/verify-account")
    } catch (error) {
      const errors = error.response?.data?.additionalInfo?.errors

      if (errors) {
        Object.entries(errors).forEach(([field, messages]) => {
          const combinedMessage = messages.join(" ")
          setError(field, {
            type: "manual",
            message: combinedMessage,
          })
        })
      } else {
        toast.error(error.response?.data?.message || "Registration failed!")
      }
    }
  }

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(45deg, rgba(55, 140, 47, 1) 0%, rgba(0, 0, 0, 0.99) 100%)",
        padding: "15px",
      }}
    >
      <div
        className="bg-white  rounded-4 shadow-lg px-5 py-2"
        style={{
          width: "100%",
          maxWidth: "1058px",
          border: "none",
        }}
      >
        {/* Logo Section */}
        <div className="text-center ">
        
               <img
                            className="w-50 text-center mb-5 mx-auto"
                            src={logo}
                            alt="food-logo"
                          />
            
        </div>

        {/* Header */}
        <div className="mb-4 text-start">
          <h2 className="fw-bold mb-2" style={{ color: "#333", fontSize: "2rem" }}>
            Register
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: "1rem" }}>
            Welcome Back! Please enter your details
          </p>
        </div>

        {/* Profile Image Upload - Hidden but functional */}
        <input
          type="file"
          id="profileImage"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-4 mb-4">
            {/* Username */}
            <div className="col-md-6">
              <div className="position-relative">
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
                  <i className="fas fa-user text-muted me-3" style={{ fontSize: "1.1rem", width: "16px" }}></i>
                  <input
                    type="text"
                    placeholder="UserName"
                    className="border-0 bg-transparent flex-grow-1"
                    style={{
                      outline: "none",
                      fontSize: "1rem",
                      color: "#333",
                    }}
                    {...register("userName", USERNAME_VALIDATION)}
                  />
                </div>
                {errors.userName && <small className="text-danger mt-1 d-block">{errors.userName.message}</small>}
              </div>
            </div>

            {/* Email */}
            <div className="col-md-6">
              <div className="position-relative">
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
                    placeholder="Enter your E-mail"
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
            </div>

            {/* Country */}
            <div className="col-md-6">
              <div className="position-relative">
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
                    placeholder="Country"
                    className="border-0 bg-transparent flex-grow-1"
                    style={{
                      outline: "none",
                      fontSize: "1rem",
                      color: "#333",
                    }}
                    {...register("country", COUNTRY_VALIDATION)}
                  />
                </div>
                {errors.country && <small className="text-danger mt-1 d-block">{errors.country.message}</small>}
              </div>
            </div>

            {/* Phone Number */}
            <div className="col-md-6">
              <div className="position-relative">
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
                  <i className="fas fa-phone text-muted me-3" style={{ fontSize: "1.1rem", width: "16px" }}></i>
                  <input
                    type="tel"
                    placeholder="PhoneNumber"
                    className="border-0 bg-transparent flex-grow-1"
                    style={{
                      outline: "none",
                      fontSize: "1rem",
                      color: "#333",
                    }}
                    {...register("phoneNumber", PHONE_VALIDATION)}
                  />
                </div>
                {errors.phoneNumber && <small className="text-danger mt-1 d-block">{errors.phoneNumber.message}</small>}
              </div>
            </div>

            {/* Password */}
            <div className="col-md-6">
              <div className="position-relative">
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
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="border-0 bg-transparent flex-grow-1"
                    style={{
                      outline: "none",
                      fontSize: "1rem",
                      color: "#333",
                    }}
                    {...register("password", PASSWORD_VALIDATION)}
                  />
                  <i
                    className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} text-muted`}
                    style={{ cursor: "pointer", fontSize: "1.1rem" }}
                    onClick={() => setShowPassword((prev) => !prev)}
                  ></i>
                </div>
                {errors.password && <small className="text-danger mt-1 d-block">{errors.password.message}</small>}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="col-md-6">
              <div className="position-relative">
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
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="confirm-password"
                    className="border-0 bg-transparent flex-grow-1"
                    style={{
                      outline: "none",
                      fontSize: "1rem",
                      color: "#333",
                    }}
                    {...register("confirmPassword", CONFIRM_PASSWORD_VALIDATION)}
                  />
                  <i
                    className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} text-muted`}
                    style={{ cursor: "pointer", fontSize: "1.1rem" }}
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  ></i>
                </div>
                {errors.confirmPassword && (
                  <small className="text-danger mt-1 d-block">{errors.confirmPassword.message}</small>
                )}
              </div>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-end mb-4">
            <Link
              to="/login"
              className="text-decoration-none"
              style={{
                color: "#28a745",
                fontSize: "1rem",
                fontWeight: "500",
              }}
            >
              Login Now?
            </Link>
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
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Creating Account...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
