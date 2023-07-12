import React, { useEffect } from "react";
import Nav from "../components/nav/Nav";
import Saved from "../components/saved/Saved";

const SavedJobs = () => {
    useEffect(() => {
        document.title = 'Saved Jobs | WUZZUF'; 
      }, []);
    return (
        <div>
            <Nav />
            <div style={{ paddingTop: "60px" }}>

            </div>
            <Saved />
        </div>
    )
}

export default SavedJobs