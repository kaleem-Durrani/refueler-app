import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

const key = "authToken";

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.error("Error storing token", error);
  }
};

const getToken = async (token) => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error("Error retrieving token", error);
  }
};

const getUser = async (user) => {
  const token = await getToken();
  return token ? jwtDecode(token) : null;
};

const removeToken = async (token) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error("Error removing token", error);
  }
};

export default { storeToken, getToken, getUser, removeToken };
