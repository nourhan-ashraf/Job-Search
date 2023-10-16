import React from "react";
import { Link } from "react-router-dom";
import { Badge, Button } from "react-bootstrap";
import { Flex } from "@chakra-ui/react";
import { ImLocation } from 'react-icons/im';
import { MdDateRange } from "react-icons/md";

import styles from './Description.module.scss';

const Description = (props) => {
    const darkMode = false
    console.log(props.job)
    return (
        <div className={styles.pagePadding} >
            <br />
            <br />
            <br />

                <div>
                    <h1 className={darkMode ? styles.decriptionTitleDark : styles.decriptionTitle}>{props.job && props.job.title}</h1>
                    <Flex className={darkMode ? styles.decriptionDark : styles.decription} flexDirection="row" align="center">

                        <MdDateRange /> &nbsp;{props.job && props.job.dateAdded.slice(0, 10)}
                    </Flex>
                    <Badge bg="secondary">{props.tags && props.tags.map((tag) => {
                        return <div>{tag.text}</div>
                    })}</Badge>
                    <br />
                    <br />

                    <Flex justify="start" align="start">
                        <img src="/building.png" width={50} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Flex flexDirection="column" justify="end" align="start">
                            <h1 className={darkMode ? styles.companyDark : styles.company}>{props.job && props.job.company}</h1>

                            <Flex >
                                <h1 className={styles.locationTitle}>
                                    <Flex flexDirection="row" justify="start" align="center">
                                        <ImLocation />&nbsp;{props.job && props.job.location}
                                    </Flex>
                                </h1>
                            </Flex>

                        </Flex>
                    </Flex>
                    <br />
                    <br />

                    <p className={darkMode ? styles.decriptionDark : styles.decription} dangerouslySetInnerHTML={{ __html: props.job && props.job.originalPosting }}></p>
                    <br />
                    <div>
                        <Link to={`${props.job && props.job.url}`}>
                            <Button size="md" className={styles.applyBtn}>Apply</Button>
                        </Link>
                        <br />
                        <br />

                    </div>
                </div>
            </div>
    )
}
export default Description