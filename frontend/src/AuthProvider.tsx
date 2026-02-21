import { createContext, useContext, useEffect, useState } from "react";
import api from "./components/util/api";

export type AuthContextType = {
    user: any,
    login: (user: any) => void
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: any) {

    const [user, setUser] = useState(null);

    const login = (user: any) => setUser(user);
    const logout = () => setUser(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) return;

        api.get('/iam/users/me')
        .then((res) => {
            setUser(res.data);
            console.log(res);
        }).catch(()=>{
            // localStorage.removeItem('token');
        })

    }, [])

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within Authprovider");
    }

    return context;
}
