import React, { useContext } from "react";
import axios from 'axios'
import { useEffect, useState } from 'react'
import Jobs from './../components/Jobs'
import { ThemeContext, themes } from "../contexts/ThemeContext";
import Form from 'react-bootstrap/Form';
import styles from '../CSS/jobCard.module.css'
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

        <div>       
          
            <Jobs jobs={jobs} loading={loading} />

        </div>
    )
}

export default JobPage