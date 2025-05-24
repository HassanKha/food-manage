export const EMAIL_VALIDATION = {
  required: "Email is required",
  pattern: {
    value: "/^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9", //
    message: "Invalid email format",
  },
};


export const PASSWORD_VALIDATION = {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      }
