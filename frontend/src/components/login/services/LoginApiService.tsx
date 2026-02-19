import api from "@/components/util/api";
import { ILoginUserInfo } from "../interfaces/login-interface";

const LOGIN_URL = "http://localhost:8081/auth/login";

const HEADERS = { "Content-Type": "application/json" };

export const LoginApiService = {
  login: async (userInfo: ILoginUserInfo) => {
    const response = await api.post("/auth/login",userInfo);
    return response?.data;
    // try {
    //   const res = await fetch(LOGIN_URL, {
    //     method: "POST",
    //     headers: HEADERS,
    //     body: JSON.stringify(userInfo),
    //   });
    //   const data = await res.json();
    //   if(!res.ok){
    //       throw new Error(data.message);
    //   }
    //   return data;
    // } catch (error) {
    //     throw error;
    // }
  },

  getUserDetails:async()=>{
    const response = await api.get("/users/me");
    return response?.data;
  }
};
