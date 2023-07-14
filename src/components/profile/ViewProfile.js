import React, { useEffect, useState } from "react";
import styles from './viewProfile.module.scss'
import { useAuth } from "../../contexts/AuthContext";
import { MdEmail, MdModeEditOutline, MdOutlinePhoneIphone } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { ImLocation } from "react-icons/im";
import { Button, Flex } from "@chakra-ui/react";
import { FaGithub, FaLink, FaLinkedin } from "react-icons/fa";
import { BsStackOverflow } from "react-icons/bs";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";


const ViewProfile = () => {

    const { id } = useParams()
    const [summary, setSummary] = useState()
    const [image, setImage] = useState()
    const [username, setUsername] = useState()
    const [job, setJob] = useState()
    const [country, setCountry] = useState()
    const [linked, setLinked] = useState()
    const [github, setGithub] = useState()
    const [stack, setStack] = useState()
    const [portfolio, setPortfolio] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [skills, setSkills] = useState([])
    const { user } = useAuth()
    const [List, setList] = useState('')
    const CollectionRef = collection(db, "users");

    const getList = async () => {
        try {
            const data = await getDocs(CollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setList(filteredData);
        } catch (err) {
            console.error(err);
        }
    };

    const showDataById = async (userId) => {
        const userRef = doc(db, "users", userId);
        console.log(userRef)

        try {
            const docSnapshot = await getDoc(userRef);
            console.log(docSnapshot)
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();

                setUsername(data.displayName)
                setEmail(data.email)
                setSummary(data.summary)
                setPhone(data.phone)
                setSkills(data.skills)
                setCountry(data.country)
                setJob(data.job)
                setLinked(data.linkedin)
                setStack(data.stackoverflow)
                setPortfolio(data.portfolio)
                setGithub(data.github)
                setImage(data.image)
                console.log(image)

            } else {
                console.log("Document does not exist");
            }
        }
        catch (error) {
            console.error("Error retrieving documents:", error);
        }
    };
    useEffect(() => {
        getList();

        showDataById(id)
    }, []);

    return (
        <div className={styles.profile}>
            <div className={styles.card}>
                <div className={styles.space}>
                    <div className={styles.userInfo}>
                        <img className={styles.image} src={image} />
                        <div className={styles.col}>
                            <div className={styles.name}> {username}</div>
                            <div className={styles.job}>{job}</div>
                            <div className={styles.location}><div className={styles.emailIcon}><ImLocation /></div>{country}</div>
                            <div className={styles.iconsG1}>
                               
                                {linked ?<Link to={linked.startsWith("http") ? linked : `https://${linked}`} target="blank" ><Button padding="5px" className={styles.emailIcon}><FaLinkedin /></Button></Link> : ""}
                                {github ?<Link to={github.startsWith("http") ? github : `https://${github}`} target="blank" ><Button padding="5px" className={styles.emailIcon}><FaGithub /></Button></Link> : ""}
                                {stack ? <Link to={stack.startsWith("http") ? stack : `https://${stack}`} target="blank" ><Button padding="5px" className={styles.emailIcon}><BsStackOverflow /></Button> </Link>: ""}
                                {portfolio ? <Link to={portfolio.startsWith("http") ? portfolio : `https://${portfolio}`} target="blank" ><Button padding="5px" className={styles.emailIcon}><FaLink /></Button> </Link>: ""}

                            </div>
                        </div>

                    </div>

                    <div className={styles.icons}>
                        {user ? <Link to={`/edit/${id}`} className={styles.icon}><MdModeEditOutline /></Link> : " "}
                        {/*<div className={styles.icon}><IoShareSocialSharp /></div>*/}

                    </div>

                </div>
                <br />
                <div className={styles.infoCard}>
                    <div className={styles.title}>Summary</div>
                    <div className={styles.summary}>{summary}</div>

                </div>
                <br />
                <div className={styles.infoCard}>
                    <div className={styles.title}>Contact Info</div>
                    <div className={styles.email}><div className={styles.emailIcon}><MdOutlinePhoneIphone /></div>{phone}</div>
                    <div className={styles.email}><div className={styles.emailIcon}><MdEmail /></div>{email}</div>


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
