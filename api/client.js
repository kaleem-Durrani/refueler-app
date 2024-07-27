import { create } from "apisauce";
import authStorage from "../auth/storage";

const apiClient = create({
  baseURL: "http://192.168.72.122:5000/api",
});

// applying the token if available to all api requests
apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;

  request.headers["Authorization"] = `Bearer ${authToken}`;
});

export default apiCLient;
