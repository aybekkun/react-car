import axios from "axios";

const instance = axios.create({
  baseURL: "https://karsoft.uz/api",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization =
    "Bearer " + window.localStorage.getItem("userToken");
  return config;
});

export default instance;
