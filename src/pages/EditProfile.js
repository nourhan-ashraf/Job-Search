import React, { useEffect } from "react";
import Nav from "../components/nav/Nav";
import Edit from "../components/profile/Edit";

const EditProfile = () => {
    useEffect(() => {
        document.title = 'Edit Profile | WUZZUF'; 
      }, []);
    return (
        <div>
            <Nav />
            <div style={{ paddingTop: "60px" }}>

            </div>
            <Edit />
        </div>
    )
}

export default EditProfile