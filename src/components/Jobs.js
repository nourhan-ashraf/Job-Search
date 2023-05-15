import React, { useContext, useEffect } from "react";
import { useState } from 'react'
import styles from '../CSS/jobCard.module.css'
import JobCard from "./JobCard";
import Pagination from "../components/Pagination";
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { Flex, Wrap, WrapItem } from '@chakra-ui/react'
import { DarkModeContext } from "../contexts/ThemeContext";
import { Link } from "react-router-dom";

const Jobs = ({ jobs, loading }) => {
    const {darkMode, toggleModes} = useContext(DarkModeContext)
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
        <div className={styles.pagePadding} >
            <div className={styles.gap}>
            <Form.Check 
                className={styles.switch}
                type="switch"                
                onClick={() => {
                  toggleModes()
                }}
              />    
                <Link to="/"><Flex flexDirection="row" ><h1 className={darkMode ? styles.logoBDark : styles.logoB}>Workify&nbsp;</h1> <h1 className={darkMode ? styles.logoLLight : styles.logoL}>Jobs</h1></Flex>

                </Link>
            </div>
            <div className={styles.container}>
                <img src="/backgroundImg.png" className={styles.bg} />

                <div className={styles.centered}>

                    <Flex flexDir="row" align="center" justify="end">

                        <input className={styles.search} placeholder="Enter Job Title or Location" onChange={event => setQuery(event.target.value)} />
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
                <Form.Check className={darkMode ? styles.checkDark : styles.checkLight } value={isFullTime} onChange={handleChange} type="checkbox" label="Full time only" />
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
                {filterTitle.length ? <Pagination setPage={setPage} page={page} jobsLen={filterTitle.length} numOfJobsPerPage={numOfJobsPerPage} /> : <h1 className={darkMode ? styles.noResDark : styles.noRes}>No results</h1>}</Flex>
        </div>
    )
}

export default Jobs
