import client from "./client";

const login = (email, password) =>
  client.post("/auth/employee/login", { email, password });

const signup = (name, email, password, confirmPassword, phoneNumber, type) =>
  client.post("/auth/employee/signup", {
    name,
    email,
    password,
    confirmPassword,
    phoneNumber,
    type,
  });

const requestNewOtp = () => client.get("/auth/employee/requestNewOtp", {});

const verifyOtp = (otp) => client.post("/auth/employee/verify-otp", { otp });

const requestPasswordReset = (email) =>
  client.post("auth/employee/requestPasswordReset", { email });

const verifyOtpForgetPassword = (otp, email) =>
  client.post("auth/employee/verifyOtpForgetPassword", { otp, email });

const resetPassword = (email, newPassword, otp) =>
  client.post("auth/employee/resetPassword", { email, newPassword, otp });

export default {
  login,
  signup,
  requestNewOtp,
  verifyOtp,
  requestPasswordReset,
  verifyOtpForgetPassword,
  resetPassword,
};
