import React from "react";
import { useAuth } from "./contexts/AuthContext";
import { Navigate, useParams } from "react-router-dom";

function PrivateRouteSign({ children }) {
    const { user } = useAuth()
    return (
        user ? <Navigate to={`/home/${user?.uid}`} /> : children
    )
}

export default PrivateRouteSign;