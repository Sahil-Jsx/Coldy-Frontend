import axios from "axios";
import { environment } from "../env/environment";

const instance = axios.create({
  baseURL: `${environment.baseurl}`,
});

instance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("token");

    if (!authToken) {
      window.location.href = "/login";
      return Promise.reject("No token available");
    }

    const tokenExpiration = localStorage.getItem("tokenExpiration");
    const currentTime = new Date().getTime();

    if (currentTime >= tokenExpiration) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
      window.location.href = "/login";
      return Promise.reject("Token expired");
    }

    config.params = config.params || {};
    config.headers["Authorization"] = `Bearer ${authToken}`;

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export default instance;
