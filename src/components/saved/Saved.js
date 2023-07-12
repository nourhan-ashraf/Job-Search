import React, { useEffect, useState } from "react";
import styles from './saved.module.scss'
import styles2 from '../profile/viewProfile.module.scss'
import JobCard from "../JobCard/JobCard";
import { Wrap, WrapItem } from "@chakra-ui/react";
const Saved = () => {
    const slugs = ['senior-projectsystems-engineer-3791', 'test-administrator-boise-id-2738', 'sr.-android-engineer-atg-7955', 'full-stack-cloud-architect-3277'];
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const jobPromises = slugs.map(async (slug) => {
                    const url = `https://jobsearch4.p.rapidapi.com/api/v1/Jobs/${slug}`;
                    const options = {
                        method: 'GET',
                        headers: {
                            'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
                            'X-RapidAPI-Host': 'jobsearch4.p.rapidapi.com'
                        }
                    };

                    const response = await fetch(url, options);
                    const result = await response.json();
                    return result;
                });

                const jobResults = await Promise.all(jobPromises);
                setJobs(jobResults);
            } catch (error) {
                console.error(error);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className={styles2.profile}>
            <br />
            <Wrap spacing='30px' justify="center">
                <div className={styles.col}>
                    <div className={styles.title}> {slugs.length} Saved Applications</div>
                    <div className={styles.subTitle}>Apply below before they expire or get closed.</div></div>
                <br />
                {jobs.map((j) => (
                    <WrapItem>
                        <JobCard job={j} />
                    </WrapItem>
                ))}
            </Wrap>

        </div>
    );

}

export default Saved