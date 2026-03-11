import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API = axios.create({
  baseURL: "http://10.19.118.29:8000/api",
});

API.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token");

      console.log("Stored Token:", token);

      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log("Error reading token from AsyncStorage:", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default API;
