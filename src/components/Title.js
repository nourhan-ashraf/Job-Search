import React from "react";
import styles from './../CSS/jobCard.module.css'
import { Flex } from "@chakra-ui/react";
const Title = () => {
    return (
        <div >
            <div className={styles.gap}>
                <div><Flex flexDirection="row" marginBottom="15px"><h1 className={styles.logoB}>Workify&nbsp;</h1> <h1 className={styles.logoL}>Jobs</h1></Flex>

                </div>
            </div>
        </div>
    )
}

export default Title