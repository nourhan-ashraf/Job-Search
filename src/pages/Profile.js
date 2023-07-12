import React, { useEffect } from "react";
import Nav from "../components/nav/Nav";
import ViewProfile from "../components/profile/ViewProfile";

const Profile = () => {
    useEffect(() => {
        document.title = 'Profile | WUZZUF'; 
      }, []);
    return (
        <div>
            <Nav />
            <div style={{ paddingTop: "60px" }}>

            </div>
            <ViewProfile />
        </div>
    )
}

export default Profile