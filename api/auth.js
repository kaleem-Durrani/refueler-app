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

export default { login, signup, requestNewOtp, verifyOtp };
