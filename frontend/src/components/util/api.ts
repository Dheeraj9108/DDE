import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
    (request) => {
        const token = localStorage.getItem("token");
        if (token && request.headers) {
            request.headers.Authorization = `Bearer ${token}`;
        }
        return request;
    },
    (error)=>Promise.reject(error)
);

api.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error.response?.status === 401){
            localStorage.removeItem("token");
            return Promise.reject(error);
        }
    }
)

export default api;
