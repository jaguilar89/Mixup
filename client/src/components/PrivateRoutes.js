import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import LoadingScreen from "./LoadingScreen";

export default function PrivateRoutes() {
    const { user, isLoading } = useContext(UserContext)
    const isAuthenticated = Boolean(user?.id)

    if (isLoading) return <LoadingScreen />
    return (
        isAuthenticated ? <Outlet /> : <Navigate to='/login' />
    )
}