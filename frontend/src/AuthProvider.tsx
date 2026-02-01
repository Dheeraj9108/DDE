import { createContext, useContext, useState } from "react";

export type AuthContextType={
    user:any,
    login:(user:any)=>void
    logout:()=>void;
}

const AuthContext = createContext<AuthContextType|null>(null);

export default function AuthProvider({ children }: any) {

    const [user, setUser] = useState(null);

    const login = (user: any) => setUser(user);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context){
        throw new Error("useAuth must be used within Authprovider");
    }

    return context;
}
