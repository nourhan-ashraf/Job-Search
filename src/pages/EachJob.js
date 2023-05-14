import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Description from "../components/Description";

const EachJob = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const {id} = useParams()
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
    const desc = ""

    return (
        <div>
            {jobs.map((i) => {
                if(id === i.id){
                    return (<div>
                        <Description title={i.title} location={i.location} desc={i.description} />
                        </div>)
                }
            })}
            {desc}
        </div>
    )
}

export default EachJob