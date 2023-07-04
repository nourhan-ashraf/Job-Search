import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Description from "../components/Description/Description";

const EachJob = () => {
    const [job, setJob] = useState();
    const { id } = useParams()

console.log(id)
    const url = `https://jobsearch4.p.rapidapi.com/api/v1/Jobs/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a14cc8858dmshfe4cd01c6e39b2ap18e3cdjsn1436e59ec718',
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
            <Description job = {job}/>
        </div>
    )
}

export default EachJob