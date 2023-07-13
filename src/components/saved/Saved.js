import React, { useEffect, useState } from "react";
import styles from './saved.module.scss'
import styles2 from '../profile/viewProfile.module.scss'
import JobCard from "../JobCard/JobCard";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { Spinner } from "react-bootstrap";

const Saved = () => {
    const slugs = ['senior-projectsystems-engineer-3791', 'test-administrator-boise-id-2738', 'sr.-android-engineer-atg-7955', 'full-stack-cloud-architect-3277'];
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
   
  
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
                setIsLoading(false)

            } catch (error) {
                console.error(error);
                setIsLoading(false)

            }
        };

        fetchJobs();
    }, []);
    if (isLoading) {
        return <Spinner className={styles.spinner} animation="border" variant="primary" />;
    }
    return (
        <div className={styles2.profile}>
            <br />
      
            <Wrap spacing='30px' justify="center">
                {slugs.length ? 
                <div className={styles.col}>
                    <div className={styles.title}> {slugs.length} Saved Applications</div>
                    <div className={styles.subTitle}>Apply below before they expire or get closed.</div>
                </div> :
                    <div className={styles.col}>
                        <div className={styles.title}> No Saved Applications</div>
                    </div>
                }
                <br />
                {slugs.length!==0 && jobs.map((j) => (
                    <WrapItem>
                        <JobCard job={j} />
                    </WrapItem>
                ))}
            </Wrap>

        </div>
    );

}

export default Saved