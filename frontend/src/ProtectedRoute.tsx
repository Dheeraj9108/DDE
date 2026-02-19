import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import PrivateLayout from "./PrivateLayout";

export default function ProtectedRoute() {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" replace />

    return <PrivateLayout />;

}