import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Badge, Button } from "react-bootstrap";
import { Flex } from "@chakra-ui/react";
import { IoReturnUpBackOutline } from 'react-icons/io5';
import { ImLocation } from 'react-icons/im';

import { DarkModeContext } from "../../contexts/ThemeContext";
import styles from './Description.module.css';
import { MdDateRange } from "react-icons/md";

const Description = (props) => {
    const { darkMode } = useContext(DarkModeContext)
    console.log(props.job)
    return (
        <div className={styles.pagePadding} >
            <div className={styles.siteName}>
                <Link to="/">
                    <Flex flexDirection="row" marginBottom="15px">
                        <h1 className={darkMode ? styles.logoBDark : styles.logoB}>Find&nbsp;</h1>
                        <h1 className={darkMode ? styles.logoLLight : styles.logoL}>Jobs</h1>
                    </Flex>
                </Link>
            </div>
            <br />
            <br />

            <div className={styles.flexGrid}>
                <div >
                    <Link to="/" >
                        <h1 className={styles.back}>
                            <Flex className={styles.siteName} flexDirection="row" justify="start" align="center">
                                <IoReturnUpBackOutline color="1E86FF" size={25} />&nbsp;Back to search
                            </Flex>
                        </h1>
                    </Link>

                    <div className={styles.hid}>
                        <br />
                        <br />

                        <h1 className={styles.apply}>HOW TO APPLY</h1>
                        <Link to={`${props.job && props.job.url}`}>
                            <Button size="md" style={{ fontWeight: "bold" }}>Apply</Button>
                        </Link>
                    </div>
                </div>

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
                    <div className={styles.show}>
                        <h1 className={styles.apply}>HOW TO APPLY</h1>
                        <Link to={`${props.job && props.job.url}`}>
                            <Button size="md" style={{ fontWeight: "bold" }}>Apply</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Description