import client from "./client";

const getProfile = () => client.get("/employee/profile", {});

const getRefuelerTransactionHistory = () =>
  client.get("/transaction/refuelerHistory", {});

const createTransaction = (
  amount,
  paymentMethod,
  fuelType,
  fuelAmount,
  customerId
) =>
  client.post("/transaction/createTransaction", {
    amount,
    paymentMethod,
    fuelType,
    fuelAmount,
    customerId,
  });

const getEmployeesList = () =>
  client.get("/employee/employeeListByManager", {});

const getEmployeeTransactionHistory = (employeeId) =>
  client.post("/transaction/employeeHistory", { employeeId });

const changePassword = (currentPassword, newPassword, confirmPassword) =>
  client.post("/employee/changePassword", {
    currentPassword,
    newPassword,
    confirmPassword,
  });

const addEmployeeToPump = (employeeEmail) =>
  client.post("/pump/addEmployeeToPumpByManager", { employeeEmail });

const uploadImage = (image) => client.post("/employee/image", { image });

export default {
  getProfile,
  getRefuelerTransactionHistory,
  createTransaction,
  getEmployeesList,
  getEmployeeTransactionHistory,
  changePassword,
  addEmployeeToPump,
  uploadImage,
};
