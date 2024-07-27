import client from "./client";

const login = (email, password) =>
  client.post("/auth/employee/login", { email, password });

const signup = (name, email, password, confirmPasswprd, phoneNumber, type) =>
  client.post("/auth/employee/signup", {
    name,
    email,
    password,
    confirmPasswprd,
    phoneNumber,
    type,
  });

export default { login, signup };
