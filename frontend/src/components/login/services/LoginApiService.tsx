import api from "@/components/util/api";
import { ILoginUserInfo } from "../interfaces/login-interface";

export const LoginApiService = {
  login: async (userInfo: ILoginUserInfo) => {
    const response = await api.post("/auth/login",userInfo);
    return response?.data;
  },

  getUserDetails:async()=>{
    const response = await api.get("/iam/users/me");
    return response?.data;
  }
};
