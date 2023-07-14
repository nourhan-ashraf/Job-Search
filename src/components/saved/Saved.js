import React, { useEffect, useState } from "react";
import styles from './saved.module.scss'
import styles2 from '../profile/viewProfile.module.scss'
import JobCard from "../JobCard/JobCard";
import { Flex, WrapItem } from "@chakra-ui/react";
import { Spinner } from "react-bootstrap";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Saved = () => {
    const [jobs, setJobs] = useState([]);
    const [saved, setSaved] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const id = localStorage.getItem('uid')


    const getDataById = async (userId) => {
        const userRef = doc(db, "users", userId);

        try {
            const docSnapshot = await getDoc(userRef);
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();

                setSaved(data.savedJobs)
                setIsLoading(false)

            } else {
                console.log("Document does not exist");
            }
        }
        catch (error) {
            console.error("Error retrieving documents:", error);
        }
    };

    const fetchJobs = async () => {
        try {
            const jobPromises = saved.map(async (slug) => {
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
    useEffect(()=>{
        getDataById(id)

    },[])
    useEffect(() => {

        fetchJobs();

    }, [saved]);
    if (isLoading) {
        return <Spinner className={styles.spinner} animation="border" variant="primary" />;
    }
    return (
        <div className={styles2.profile}>
            <br />

            <Flex flexDir='column' spacing='30px' justify="center" alignItems='center'>
                {saved.length ?
                    <div className={styles.col}>
                        <div className={styles.title}> {saved.length} Saved Applications</div>
                        <div className={styles.subTitle}>Apply before they expire or get closed.</div>
                    </div> :
                    <div className={styles.col}>
                        <div className={styles.title}> No Saved Applications</div>
                    </div>
                }
                <br />
                <br />
                {saved.length !== 0 && jobs.map((j) => (
                    <div>
                        <WrapItem>
                            <JobCard job={j} />
                        </WrapItem>
                        <br />
                    </div>
                ))}
            </Flex>

        </div>
    );

}

export default Saved