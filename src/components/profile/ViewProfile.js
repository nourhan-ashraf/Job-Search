import React from "react";
import styles from './viewProfile.module.scss'
import { useAuth } from "../../contexts/AuthContext";
import { MdEmail, MdModeEditOutline, MdOutlinePhoneIphone } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ImLocation } from "react-icons/im";
import { Button, Flex } from "@chakra-ui/react";
import { FaGithub, FaLink, FaLinkedin } from "react-icons/fa";
import { BsStackOverflow } from "react-icons/bs";
const skills = ['React JS', 'Frontend', 'Backend', 'UI/UX', 'HTML', 'CSS', 'SASS', 'JS', 'Python', 'Chakra UI', 'Bootstrap']

const ViewProfile = () => {
    const { user } = useAuth()
    return (
        <div className={styles.profile}>
            <div className={styles.card}>
                <div className={styles.space}>
                    <div className={styles.userInfo}>
                        <img className={styles.image} src='/user.png' />
                        <div className={styles.col}>
                            <div className={styles.name}> Nourhan Elsherif</div>
                            <div className={styles.job}>Frontend developer</div>
                            <div className={styles.location}><div className={styles.emailIcon}><ImLocation /></div>Cairo, Egypt</div>
                            <div className={styles.iconsG1}>
                                <Button padding="5px" className={styles.emailIcon}><FaLinkedin /></Button>
                                <Button padding="5px" className={styles.emailIcon}><FaGithub /></Button>
                                <Button padding="5px" className={styles.emailIcon}><BsStackOverflow /></Button>
                                <Button padding="5px" className={styles.emailIcon}><FaLink /></Button>

                            </div>
                        </div>

                    </div>

                    <div className={styles.icons}>
                        {user ? <Link to='/edit' className={styles.icon}><MdModeEditOutline /></Link> : " "}
                        <div className={styles.icon}><IoShareSocialSharp /></div>

                    </div>

                </div>
                <br />
                <div className={styles.infoCard}>
                    <div className={styles.title}>Summary</div>
                    <div className={styles.summary}>I’m a fresh graduate Computer Engineer, I specialize in Front-end development,
                        specifically in creating web applications using React JS. Additionally, I have some knowledge in
                        backend development and a strong background in UI design. I possess expertise in designing user
                        interfaces through tools like Adobe XD and Figma. Beyond my technical skills, I have a passion
                        for various forms of art and I actively engage in digital painting as well. I am highly motivated
                        to expand my knowledge and thrive on embracing new challenges with enthusiasm.</div>

                </div>
                <br />
                <div className={styles.infoCard}>
                    <div className={styles.title}>Contact Info</div>
                    <div className={styles.email}><div className={styles.emailIcon}><MdOutlinePhoneIphone /></div>01234567</div>
                    <div className={styles.email}><div className={styles.emailIcon}><MdEmail /></div>{user?.email}</div>


                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.title}>Skills and Tools:</div>
                <br />
                <Flex flexDirection="row" align="center" flexWrap="wrap">
                    {skills.map((skill) => {
                        return (
                            <div style={{ marginBottom: "3px" }}>
                                <div className={styles.badge}>
                                    {skill}
                                </div>&nbsp;
                            </div>
                        )
                    })}
                </Flex>
            </div>

        </div>
    )
}

export default ViewProfile
