import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { Flex, Spacer } from "@chakra-ui/react";
import { MdDateRange } from 'react-icons/md'

import { DarkModeContext } from "../../contexts/ThemeContext";
import styles from './JobCard.module.css'

const JobCard = (props) => {
    const { darkMode } = useContext(DarkModeContext)
    return (
        <div>
            <Card className={darkMode ? styles.cardHoverDark : styles.cardHover} style={{ width: '20rem', height: "18rem" }}>

                <Card.Header className={darkMode ? styles.fontColorDark : styles.fontColor} style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                    <Flex flexDirection="row" align="center">
                        <img className={styles.image} src="/building.png" width={20} />&nbsp;{props.job.company}
                    </Flex>
                </Card.Header>

                <Card.Body className={darkMode ? styles.fontColorDark : styles.fontColor} style={{ padding: "20px 30px", display: "flex", flexDirection: "column" }}>

                    <Card.Title>{props.job.title}</Card.Title>

                    <Card.Text style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }} >
                        <Flex flexDirection="row" align="center">

                            <MdDateRange /> &nbsp;{props.job.dateAdded.slice(0, 10)}
                        </Flex>
                        <br />

                        <Flex flexDirection="row" align="center" flexWrap="wrap">
                            {props.job.tags.slice(0, 5).map((tag) => {
                                return (
                                    <div style={{ marginBottom: "3px" }}>
                                        <Badge bg="dark">{tag.text}</Badge>&nbsp;
                                    </div>
                                );
                            })}

                        </Flex>

                        {" "}

                    </Card.Text>

                    <Spacer />

                    <Link to={`/job/${props.job.slug}`} >
                        <Button className={styles.buttonHoverDark}>
                            Details
                        </Button>
                    </Link>

                </Card.Body>

            </Card>
            <br />
        </div>
    )
}

export default JobCard
