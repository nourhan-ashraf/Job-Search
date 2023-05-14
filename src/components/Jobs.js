import React, { useEffect } from "react";
import { useState } from 'react'
import styles from '../CSS/jobCard.module.css'
import JobCard from "./JobCard";
import Pagination from "../components/Pagination";
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { Flex, Wrap, WrapItem } from '@chakra-ui/react'


const Jobs = ({ jobs, loading }) => {
    const [query, setQuery] = useState("")
    const [numOfJobsPerPage] = useState(9)
    const [isFullTime, setIsFullTime] = useState(false);

    const [page, setPage] = useState(1);
    let filterTitle = []
    let filterFull = []

    if (isFullTime) {

        filterFull = jobs.filter((j) => {
            if (j.type.toLowerCase().includes("full time"))
                return j
        })
        filterTitle = filterFull.filter((j) => {
            if (j.title.toLowerCase().includes(query.toLowerCase()) || j.location.toLowerCase().includes(query.toLowerCase()))
                return j
        })
    }
    else {
        filterTitle = jobs.filter((j) => {
            if (j.title.toLowerCase().includes(query.toLowerCase()) || j.location.toLowerCase().includes(query.toLowerCase()))
                return j
        })
    }
    const handleChange = event => {
        if (event.target.checked) {
            console.log('Checkbox is checked');
        } else {
            console.log('Checkbox is not checked');
        }
        setIsFullTime(current => !current);
    };

    let preQ = ""

    useEffect(() => {
        const pagesetting = () => {
            if (preQ !== query && page != 1) {
                setPage(1)
                preQ = query
            }
            if (isFullTime === true && page != 1) {
                setPage(1)
            }
        }
        pagesetting()
    }, [query, isFullTime])

    const lastPageIndex = numOfJobsPerPage * page;
    const firstPageIndex = lastPageIndex - numOfJobsPerPage;
    const currentJobs = filterTitle.slice(firstPageIndex, lastPageIndex)

    if (loading) {
        return <Spinner animation="border" variant="primary" />;
    }
    return (
        <div style={{ padding: "40px 90px" }} >
            <div className={styles.gap}>
                <div><Flex flexDirection="row" marginBottom="15px"><h1 className={styles.logoB}>Workify&nbsp;</h1> <h1 className={styles.logoL}>Jobs</h1></Flex>

                </div>
            </div>
            <div className={styles.container}>
                <img src="/backgroundImg.png" className={styles.bg} />

                <div className={styles.centered}>

                    <Flex flexDir="row" align="center" justify="end">

                        <input className={styles.search} placeholder="Enter Job Title or location" onChange={event => setQuery(event.target.value)} />
                    </Flex>
                </div>

            </div>
            <br />
            <br />

            <Alert key='priminfoary' variant='primary'>
                Note: These jobs are outdated, and they are being shown because the GitHub jobs API from which jobs are fetched has been deprecated.
                Until we find another free jobs API, please try and enjoy the experience provided by this application 😀.
            </Alert>
            <br />
            <Flex flexDirection="column" justify='center' align="end">
                <Form.Check style={{ fontWeight: "bold" }} value={isFullTime} onChange={handleChange} type="checkbox" label="Full time only" />
            </Flex>
            <br />

            {jobs ? (<Wrap spacing='70px' justify="center">
                {currentJobs.map((j) => (
                    <WrapItem>
                        <JobCard key={j.id} job={j} />
                    </WrapItem>
                ))}
            </Wrap>) : <div></div>}
            <br />
            <Flex flexDirection="column" justify='center' align="center">
                <Pagination setPage={setPage} page={page} jobsLen={filterTitle.length} numOfJobsPerPage={numOfJobsPerPage} /></Flex>
        </div>
    )
}

export default Jobs
