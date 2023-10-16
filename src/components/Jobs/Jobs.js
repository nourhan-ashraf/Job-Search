import React, { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import { Pagination } from "react-bootstrap";
import { Flex, Wrap, WrapItem } from '@chakra-ui/react'

import styles from './jobs.module.scss'
import JobCard from "../JobCard/JobCard";
import { BsSearch } from "react-icons/bs";

const Jobs = () => {

    const [query, setQuery] = useState(localStorage.getItem('query')? localStorage.getItem('query'): '')
    const [res, setRes] = useState("")
    const [empty, setEmpty] = useState(null)
    let [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    let url = query ? `https://jobsearch4.p.rapidapi.com/api/v2/Jobs/Search?SearchQuery=${query}&PageSize=10&PageNumber=${page}` : `https://jobsearch4.p.rapidapi.com/api/v2/Jobs/Latest?PageSize=10&PageNumber=${page}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
            'X-RapidAPI-Host': 'jobsearch4.p.rapidapi.com'
        }
    };


    const fetchJobs = async () => {
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            setRes(result)
            if (result.length > 0) {
                setEmpty(false)
            }
            else {
                setEmpty(true)
            }
            setLoading(false)

        } catch (error) {
            console.error(error);
        }

    }
    useEffect(() => {

        fetchJobs();

    }, [page])

    useEffect(() => {

        setPage(1)
        fetchJobs();

    }, [query])

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
    const handleQuery = (event) => {
        if (localStorage.getItem('query')) 
            localStorage.removeItem('query')
        setQuery(event.target.value)
    }
console.log(empty)
    return (
        <>
            {empty !== null ? <div className={styles.pagePadding} >

                <div className={styles.container}>
                    <div className={styles.bg}></div>

                    <div className={styles.centered}>
                        <form>
                            <Flex flexDir="row" align="center" justify="end">
                                <div className={styles.searchContainer}>
                                    <BsSearch className={styles.icon} />
                                    <input
                                        className={styles.searchBar}
                                        placeholder="Search by Job Title, Keywords or Location (e.g. Sales in Cairo)"
                                        type="text"
                                        value={query}
                                        onChange={event => handleQuery(event)} />
                                </div>
                                <br />
                            </Flex>
                        </form>
                    </div>

                </div>

                <br />
                <br />
                <br />

                <Wrap className={styles.cardsMargin} spacing='70px' justify="center">
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
                            <h1 className={styles.noRes}>No data available</h1>
                        )

                    }
                </Flex>
            </div>
                :
                <div style={{ position: "absolute", top: "50%", left: "50%", transition: "translate(-50%, -50%)" }}>
                    <Spinner className={styles.spinner} animation="border" variant="primary" />
                </div>
            }
        </>
    )
}

export default Jobs
