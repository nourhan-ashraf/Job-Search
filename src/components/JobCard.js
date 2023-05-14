import React from "react";
import styles from '../CSS/jobCard.module.css'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { Flex, Spacer } from "@chakra-ui/react";
const JobCard = (props) => {
    const { job } = props
    const { id, title, company, type, location, created_at } = job
    return (
        <div>
            <Card className={styles.cardHover} style={{ width: '20rem', height: "18rem" }}>

                <Card.Header style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                    <Flex flexDirection="row" align="center"><img className={styles.image} src="/building.png" width={20} />&nbsp;{company}</Flex></Card.Header>
                <Card.Body style={{ padding: "20px 30px", display: "flex", flexDirection: "column" }}>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }} >

                        <Badge bg="secondary">
                            {location}
                        </Badge>
                        {" "}
                        <Badge bg="secondary">
                            {type}
                        </Badge>
                    </Card.Text>
                    <Spacer />
                    <Link to={`/job/${id}`} >
                    <Button className={styles.buttonHover}>
                        
                            Details
                       
                    </Button>
                    </Link>
                </Card.Body>

            </Card>
            <br /> </div>
    )
}

export default JobCard
