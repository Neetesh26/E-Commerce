import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://backendbi.onrender.com/api",
  // baseURL: "http://localhost:5000/api",
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {

    const status = error.response?.status;

    if (status === 404) {
      console.log("API Not Found");
    } 
    else if (status === 500) {
      console.log("Server Error");
    }

    return Promise.reject(error);
  }
);