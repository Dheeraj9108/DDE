import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { IoLogoGoogle } from "react-icons/io";
import { IoLogoApple } from "react-icons/io";
import * as CONST from "./login-constants";
import {useEffect, useRef, useState} from "react"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoginApiService } from "./services/LoginApiService";
import { ILoginUserInfo } from "./interfaces/login-interface";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/AuthProvider";

export function Login({ className, ...props }: React.ComponentProps<"div">) {

  const {login} = useAuth();
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>();
  const navigate = useNavigate();

  const handleLogin = async(e:any)=>{
    e.preventDefault();
    const payload: ILoginUserInfo = {
      username:username?.current?.value ?? '',
      password:password?.current?.value ?? ''
    }
    // login({username:"Dheeraj"});
    // navigate("/dashboard");
    try {
      const res = await LoginApiService.login(payload);
      const token = res.data;
      localStorage.setItem("token",token);
      if(res.success){
        const user = await LoginApiService.getUserDetails();
        login(user);
        navigate("/dashboard");
      }
    } catch (error:any) {
      setShowError(true);
      setErrorMessage(error?.message);
    }
  }

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <form>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <a
                  href="#"
                  className="flex flex-col items-center gap-2 font-medium"
                >
                  <div className="flex size-8 items-center justify-center rounded-md">
                    <GalleryVerticalEnd className="size-6" />
                  </div>
                  <span className="sr-only">{CONST.DDE}</span>
                </a>
                <h1 className="text-xl font-bold">{CONST.HEADER}</h1>
                <FieldDescription>
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </div>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  // placeholder="Username or E-mail"
                  required
                  ref={username}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" ref={password}  required />
              </Field>
              {showError && <div className="flex items-center justify-center text-red-700">{errorMessage}</div>}
              <Field>
                <Button onClick={handleLogin}>Login</Button>
              </Field>
              <FieldSeparator>Or</FieldSeparator>
              <Field className="grid gap-4 sm:grid-cols-2">
                <Button variant="outline" type="button">
                  <IoLogoApple />
                  Continue with Apple
                </Button>
                <Button variant="outline" type="button">
                  <IoLogoGoogle />
                  Continue with Google
                </Button>
              </Field>
            </FieldGroup>
          </form>
          <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a>
            {""}
            and <a href="#">Privacy Policy</a>.
          </FieldDescription>
        </div>
      </div>
    </div>
  );
}
