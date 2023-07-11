import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import { Pagination } from "react-bootstrap";
import { Flex, Wrap, WrapItem } from '@chakra-ui/react'

import { DarkModeContext } from "../../contexts/ThemeContext";
import styles from './jobs.module.css'
import JobCard from "../JobCard/JobCard";

const Jobs = () => {

    const { darkMode, toggleModes } = useContext(DarkModeContext)
    const [query, setQuery] = useState(localStorage.getItem('query'))
    const [res, setRes] = useState("")
    let [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    console.log(query)
    const url = query ? `https://jobsearch4.p.rapidapi.com/api/v1/Jobs/Search?SearchQuery=${query}&PageSize=12&PageNumber=${page}` : `https://jobsearch4.p.rapidapi.com/api/v1/Jobs/Search?SearchQuery=w&PageSize=12&PageNumber=${page}`;
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
                setRes(result)
                setLoading(false)

            } catch (error) {
                console.error(error);
            }

        }
        fetchJobs();
    }, [page])

    useEffect(() => {
        setPage(1)

        const fetchJobs = async () => {

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                console.log(result);
                setRes(result)
                setLoading(false)

            } catch (error) {
                console.error(error);
            }

        }
        fetchJobs();
    }, [query])


    let totalPages = Math.ceil(res.totalRecords / 12)

    function adjustPage(amount) {
        page = page + amount
        setPage(page)
    }

    function firstPage() {
        setPage(1)
    }

    const hasNextPage = () => {
        if (res.data.length === 0) return false
        else return true
    }

    const moon = "/night-mode.png"
    const sun = "/sun.png"


    if (loading) {
        return <Spinner animation="border" variant="primary" />;
    }
    return (
        <div className={styles.pagePadding} >
            <div className={styles.gap}>
                <button onClick={(e) => {
                    toggleModes();
                    e.stopPropagation();
                    e.preventDefault();
                }}>
                    <img className={styles.mode} src={darkMode ? sun : moon} />
                </button>
                <Link to="/">
                    <Flex flexDirection="row" >
                        <h1 className={darkMode ? styles.logoBDark : styles.logoB}>Find&nbsp;</h1>
                        <h1 className={darkMode ? styles.logoLLight : styles.logoL}>Jobs</h1>
                    </Flex>
                </Link>
            </div>
            <div className={styles.container}>
                <img src="/backgroundImg.png" className={styles.bg} />

                <div className={styles.centered}>
                    <Flex flexDir="row" align="center" justify="end">
                        <input className={styles.search} placeholder="Enter Job Title or Keywords.." onChange={event => setQuery(event.target.value)} />
                    </Flex>
                </div>

            </div>
            <br />
            <br />
            <br />
            <Wrap spacing='70px' justify="center">
                {

                    res.data && Array.isArray(res.data) ? (
                        res.data.map((item) => (<WrapItem>
                            <JobCard key={item.id} job={item} />
                        </WrapItem>))
                    ) : ""

                }
            </Wrap>

            <br />
            <Flex flexDirection="column" justify='center' align="center">
                {
                    res.data && Array.isArray(res.data) ? (

                        <Pagination>
                            {page !== 1 && <Pagination.First onClick={() => firstPage()} />}
                            {page !== 1 && <Pagination.Prev onClick={() => adjustPage(-1)} />}
                            {page !== 1 && <Pagination.Item onClick={() => adjustPage(-1)}>{page - 1}</Pagination.Item>}
                            <Pagination.Item active>{page}</Pagination.Item>
                            {hasNextPage() && <Pagination.Item onClick={() => adjustPage(1)}>{page + 1}</Pagination.Item>}
                            {hasNextPage() && <Pagination.Next onClick={() => adjustPage(1)} />}

                        </Pagination>

                    ) : (
                        <h1 className={darkMode ? styles.noResDark : styles.noRes}>No data available</h1>
                    )

                }
            </Flex>
        </div>
    )
}

export default Jobs
