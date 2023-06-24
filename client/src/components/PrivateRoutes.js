import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function PrivateRoutes() {
    const { user } = useContext(UserContext)
    const isAuthenticated = !!user

    return (
        isAuthenticated ? <Outlet /> : <Navigate to='/login' />
    )
}