import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Flex } from "@chakra-ui/react";

const Error = () => {
    useEffect(() => {
        document.title = 'Error 404 | WUZZUF'; 
      }, []);
    return (
        <Flex flexDirection="column" align="center" backgroundColor="white" marginTop="8%">
            <img width="400" src="/error.svg" />
            <br />
            <Link to="/">
                <Button style={{ backgroundColor: "black", border: "none", fontWeight: "bold" }}>Go Home</Button>
            </Link>
        </Flex>
    )
}

export default Error