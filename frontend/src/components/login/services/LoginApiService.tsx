import { ILoginUserInfo } from "../interfaces/login-interface";

const LOGIN_URL = "http://localhost:8082/auth/login";

const HEADERS = { "Content-Type": "application/json" };

export const LoginApiService = {
  login: async (userInfo: ILoginUserInfo) => {
    try {
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(userInfo),
      });
      const data = await res.json();
      if(!res.ok){
          throw new Error(data.message);
      }
      return data;
    } catch (error) {
        throw error;
    }
  },
};
