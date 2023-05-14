import React from "react";
import styles from '../CSS/jobCard.module.css'
import { Center, Flex } from "@chakra-ui/react";
import { Grid, GridItem } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import { Badge, Button } from "react-bootstrap";
import { MdOutlinePublic } from 'react-icons/md'
import { IoReturnUpBackOutline } from 'react-icons/io5'
import { ImLocation } from 'react-icons/im'
import { Link } from "react-router-dom";
const Description = ({ title, location, desc, how_to_apply, type, company, url}) => {
    return (
        <div style={{ padding: "40px 90px" }} >
            <div className={styles.gap}>
                <div><Flex flexDirection="row" marginBottom="15px"><h1 className={styles.logoB}>Workify&nbsp;</h1> <h1 className={styles.logoL}>Jobs</h1></Flex>

                </div>
            </div>

            <Grid templateColumns='1fr 3fr' gap={100}>
                <GridItem w='100%'>
                    <Link to="/" ><h1 className={styles.back}> <Flex flexDirection="row" justify="start" align="center"><IoReturnUpBackOutline color="1E86FF" size={25} />&nbsp;Back to search </Flex></h1>
                    </Link>
                    <br />
                    <h1 className={styles.apply}>HOW TO APPLY</h1>
                    <p className={styles.decription} dangerouslySetInnerHTML={{ __html: how_to_apply }}></p>
                    <Link to={`${url}`}><Button size="md" style={{fontWeight:"bold"}}>Apply</Button></Link>
                </GridItem>

                <GridItem w='100%'>
                    <h1 className={styles.decriptionTitle}>{title}</h1>

                    <Badge bg="secondary">{type}</Badge>
                    <br />
                    <br />

                    <Flex justify="start" align="start">
                        <img className={styles.image} src="/building.png" width={50} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Flex flexDirection="column" justify="end" align="start">
                            <h1 className={styles.company}>{company}</h1>

                            <Flex ><h1 className={styles.locationTitle}><Flex flexDirection="row" justify="start" align="center"><ImLocation />&nbsp;{location}</Flex></h1></Flex>

                        </Flex>
                    </Flex>
                    <br />
                    <br />

                    <p className={styles.decription} dangerouslySetInnerHTML={{ __html: desc }}></p>
                </GridItem>
            </Grid>
        </div>
    )
}
export default Description