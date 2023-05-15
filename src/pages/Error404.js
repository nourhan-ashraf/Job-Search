import React from "react";
import { Center, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
const Error = () => {
    return (
        <Flex flexDirection="column" align="center" backgroundColor="white" marginTop="8%">
            <img width="400" src="/error.svg"></img>
            <br/>
            <Link to="/"><Button style={{backgroundColor:"black", border:"none", fontWeight:"bold"}}>Go Home</Button></Link>
        </Flex>
    )
} 

export default Error