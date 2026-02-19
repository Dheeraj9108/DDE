import { ISignupUserInfo } from "../interfaces/signup-interface";

const SIGNUP_URL = "http://localhost:8081/auth/signup";

const HEADERS = { "Content-Type": "application/json" };

export const SignupApiService = {
  signup: async (userInfo: ISignupUserInfo) => {
    try {
      const res = await fetch(SIGNUP_URL, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(userInfo),
      });
      const data = await res.json();
      if(!data.ok){
        throw new Error("Unable to Login");
      }
      return data;
    } catch (error) {
        throw error;
    }
  },
};
