import axios from "axios";
import _ from "lodash";

const axiosInstance = axios.create({
  baseURL: "/",
});

axiosInstance.interceptors.request.use((cfg) => {
  cfg.headers["Accept"] = "application/json";
  cfg.headers["Authorization"] = `${localStorage.getItem("Authorization")}`;
  return cfg;
});

export default axiosInstance;
