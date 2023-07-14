import React from "react";
import { useAuth } from "./contexts/AuthContext";
import { Navigate } from "react-router-dom";

function PrivateRouteSign({ children }) {
    const { user } = useAuth()
    return (
        user ? <Navigate to={'/'} /> : children
    )
}

export default PrivateRouteSign;