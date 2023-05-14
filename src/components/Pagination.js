import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

const JobsPagination = ({ page, setPage, jobsLen, numOfJobsPerPage }) => {
    function adjustPage(amount) {
        page = page + amount
        setPage(page)
    }

    const allPages = Math.ceil(jobsLen / numOfJobsPerPage)

    function lastPage() {
        setPage(allPages)
    }

    function firstPage() {
        setPage(1)
    }

    const hasNextPage = () => {
        if (page >= allPages) return false
        else return true
    }


    return (
        <Pagination>
            {page !== 1 && <Pagination.First onClick={() => firstPage()} />}
            {page !== 1 && <Pagination.Prev onClick={() => adjustPage(-1)} />}
            {page !== 1 && <Pagination.Item onClick={() => adjustPage(-1)}>{page - 1}</Pagination.Item>}
            <Pagination.Item active>{page}</Pagination.Item>
            {hasNextPage() && <Pagination.Item onClick={() => adjustPage(1)}>{page + 1}</Pagination.Item>}
            {hasNextPage() && <Pagination.Next onClick={() => adjustPage(1)} />}
            {hasNextPage() && <Pagination.Last onClick={() => lastPage()} />}

        </Pagination>
    )
}

export default JobsPagination