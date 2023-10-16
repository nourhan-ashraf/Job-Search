import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { Flex } from "@chakra-ui/react";
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import styles from './JobCard.module.scss'
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

const JobCard = (props) => {
    const id = localStorage.getItem('uid')
    const { user } = useAuth()
    const [isJobSaved, setIsJobSaved] = useState(false);


    const handleBookmark = async () => {
        const userCollectionRef = collection(db, "users");
        const userDocRef = doc(userCollectionRef, id);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {

            const userData = userDocSnapshot.data();
            const savedJobs = userData.savedJobs || [];
            const isJobSaved = savedJobs.includes(props.job.slug);
            const updatedSavedJobs = isJobSaved
                ? savedJobs.filter((savedJobId) => savedJobId !== props.job.slug) // Remove job from saved jobs
                : [...savedJobs, props.job.slug];

            await updateDoc(userDocRef, { savedJobs: updatedSavedJobs });
        }
        setIsJobSaved(!isJobSaved)
    }


    useEffect(() => {
        const checkIfJobSaved = async () => {
            const userCollectionRef = collection(db, "users");
            const userDocRef = doc(userCollectionRef, id);
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
                const userData = userDocSnapshot.data();
                const savedJobs = userData.savedJobs || [];
                setIsJobSaved(savedJobs.includes(props.job.slug));
            }
        };

        user ? checkIfJobSaved() : console.log('no user')
    }, [props.job.slug, id]);


    return (
        <>

            <Card className={styles.cardHover} style={{ width: '55vw', height: "auto" }}>

                <Card.Body className={styles.fontColor} style={{ padding: "20px 30px", display: "flex", flexDirection: "column" }}>
                    <div className={styles.bookmarkPosition}>
                        <Link to={`/job/${props.job.slug}`}>
                            <Card.Title className={styles.cardTitle}>{props.job.title}</Card.Title>
                        </Link >
                        {user && isJobSaved ? (<FaBookmark onClick={handleBookmark} className={styles.bookmarkSelected} />) : user && !isJobSaved ? <FaRegBookmark onClick={handleBookmark} className={styles.bookmarkSelected} /> : ''}
                    </div>
                    <Card.Text style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }} >
                        <Flex className={styles.cardSubTitle} color="#001E4C" flexDirection="row" align="center">
                            <div >{props.job.company}</div>
                            &nbsp; . &nbsp;
                            <div style={{ color: "green" }}>{props.job.dateAdded.slice(0, 10)}</div>
                        </Flex>
                        <br />
                        <Flex flexDirection="row" align="center" flexWrap="wrap">
                            {props.job.tags.slice(0, 5).map((tag) => {
                                return (
                                    <div style={{ marginBottom: "3px" }}>
                                        <div className={styles.badge}>{tag.text}</div>&nbsp;
                                    </div>
                                );
                            })}

                        </Flex>


                    </Card.Text>

                </Card.Body>

            </Card>
        </>
    )
}

export default JobCard
