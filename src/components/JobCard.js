import React, { useContext } from "react";
import styles from '../CSS/jobCard.module.css'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { DarkModeContext } from "../contexts/ThemeContext";
import { Flex, Spacer } from "@chakra-ui/react";
const JobCard = (props) => {
    const {darkMode} = useContext(DarkModeContext)
    const { job } = props
    const { id, title, company, type, location, created_at } = job
    return (
        <div>
            <Card  className={darkMode ? styles.cardHoverDark : styles.cardHover} style={{ width: '20rem', height: "18rem" }}>

                <Card.Header className={darkMode ? styles.fontColorDark : styles.fontColor} style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                    <Flex flexDirection="row" align="center"><img className={styles.image} src="/building.png" width={20} />&nbsp;{company}</Flex></Card.Header>
                <Card.Body className={darkMode ? styles.fontColorDark : styles.fontColor} style={{ padding: "20px 30px", display: "flex", flexDirection: "column" }}>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }} >

                        <Badge bg="dark" >
                            {location}
                        </Badge>
                        {" "}
                        <Badge  bg="dark" >
                            {type}
                        </Badge>
                    </Card.Text>
                    <Spacer />
                    <Link to={`/job/${id}`} >
                    <Button className={styles.buttonHoverDark }>
                        
                            Details
                       
                    </Button>
                    </Link>
                </Card.Body>

            </Card>
            <br /> </div>
    )
}

export default JobCard
