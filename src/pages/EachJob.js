import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Description from "../components/Description/Description";
import ScrollToTop from "../ScrollToTop";
import Nav from '../components/nav/Nav'
const EachJob = () => {
    const [job, setJob] = useState();
    const { id } = useParams()

    const url = `https://jobsearch4.p.rapidapi.com/api/v2/Jobs/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
            'X-RapidAPI-Host': 'jobsearch4.p.rapidapi.com'
        }
    };

    useEffect(() => {
        const fetchJobs = async () => {

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                console.log(result);
                setJob(result)
            } catch (error) {
                console.error(error);
            }

        }
        fetchJobs();
    }, [])


    return (
        <div style={{ minHeight: "720px" }}>
            <ScrollToTop />
            <Nav />
            <div style={{ paddingTop: "60px" }}>

            </div>
            <Description job={job} />
        </div>
    )
}

export default EachJob