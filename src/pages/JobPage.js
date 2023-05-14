import React from "react";
import axios from 'axios'
import { useEffect, useState } from 'react'
import Jobs from './../components/Jobs'
import { Flex } from "@chakra-ui/react";

const JobPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true)
            const res = await axios.get(`https://mocki.io/v1/770fa359-f753-4966-b59d-54365c7df6e3`)
            const resData = res.data
            setJobs(resData)
            setLoading(false)
        
    }
    fetchJobs();
    }, [])

    return (

        <div style={{ backgroundColor: "#F6F7FB" }} >   

            <Jobs jobs={jobs} loading={loading} />

        </div>
    )
}

export default JobPage