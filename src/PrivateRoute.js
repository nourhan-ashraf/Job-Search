import React from "react";
import { useAuth } from "./contexts/AuthContext";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const { user } = useAuth()
    console.log(children)

    return (
        user ? children : <Navigate to={'/home'} />
    )
}

export default PrivateRoute;