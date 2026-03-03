import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://backendbi.onrender.com/api",
});

axiosInstance.interceptors.response.use(
  (response)=>{
    return response;
  }
  ,(error)=>{
    const msg =error.status
    if(msg === 404){
    // navigate("/404")

    }else{
     
        // navigate("/500")
     
    }
    return Promise.reject(error);
  }

)