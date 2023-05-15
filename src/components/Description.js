import React, { useContext } from "react";
import styles from '../CSS/jobCard.module.css'
import { Center, Flex, Wrap, WrapItem } from "@chakra-ui/react";
import { Grid, GridItem } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import { Badge, Button } from "react-bootstrap";
import { MdOutlinePublic } from 'react-icons/md'
import { IoReturnUpBackOutline } from 'react-icons/io5'
import { ImLocation } from 'react-icons/im'
import { Link } from "react-router-dom";
import { DarkModeContext } from "../contexts/ThemeContext";
const Description = ({ title, location, desc, how_to_apply, type, company, url}) => {
    const {darkMode} = useContext(DarkModeContext)
    return (
        <div className={styles.pagePadding} >
            <div className={styles.gap}>
                <Link to="/"><Flex flexDirection="row" marginBottom="15px"><h1 className={darkMode ? styles.logoBDark : styles.logoB}>Workify&nbsp;</h1> <h1 className={darkMode ? styles.logoLLight : styles.logoL}>Jobs</h1></Flex>

                </Link>
            </div>

                <div className={styles.flexGrid}>
                <div >
                    <Link to="/" ><h1 className={styles.back}> <Flex flexDirection="row" justify="start" align="center"><IoReturnUpBackOutline color="1E86FF" size={25} />&nbsp;Back to search </Flex></h1>
                    </Link>
                    
                    <div className={styles.hid}>
                    <br />
                    <h1 className={styles.apply}>HOW TO APPLY</h1>
                    <p className={styles.applyText} dangerouslySetInnerHTML={{ __html: how_to_apply }}></p>
                    <Link to={`${url}`}><Button size="md" style={{fontWeight:"bold"}}>Apply</Button></Link>
                </div></div>

                <div>
                    <h1 className={darkMode ? styles.decriptionTitleDark : styles.decriptionTitle}>{title}</h1>

                    <Badge bg="secondary">{type}</Badge>
                    <br />
                    <br />

                    <Flex  justify="start" align="start">
                        <img className={styles.image} src="/building.png" width={50} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Flex flexDirection="column" justify="end" align="start">
                            <h1 className={darkMode ? styles.companyDark : styles.company}>{company}</h1>

                            <Flex ><h1 className={styles.locationTitle}><Flex flexDirection="row" justify="start" align="center"><ImLocation />&nbsp;{location}</Flex></h1></Flex>

                        </Flex>
                    </Flex>
                    <br />
                    <br />

                    <p className={darkMode ? styles.decriptionDark : styles.decription} dangerouslySetInnerHTML={{ __html: desc }}></p>
                    <br/>
                    <div className={styles.show}>
                    <h1 className={styles.apply}>HOW TO APPLY</h1>
                    <p className={styles.applyText} dangerouslySetInnerHTML={{ __html: how_to_apply }}></p>
                    <Link to={`${url}`}><Button size="md" style={{fontWeight:"bold"}}>Apply</Button></Link>
                </div>
                </div></div>
        </div>
    )
}
export default Description