import React, { useEffect, useState } from "react";
import styles from './viewProfile.module.scss'
import { useAuth } from "../../contexts/AuthContext";
import { MdEmail, MdModeEditOutline, MdOutlinePhoneIphone } from "react-icons/md";
import { Link } from "react-router-dom";
import { ImLocation } from "react-icons/im";
import { Button, Flex } from "@chakra-ui/react";
import { FaGithub, FaLink, FaLinkedin } from "react-icons/fa";
import { BsStackOverflow } from "react-icons/bs";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Spinner from 'react-bootstrap/Spinner';


const ViewProfile = () => {

    const id = localStorage.getItem('uid')
    const [summary, setSummary] = useState()
    const [image, setImage] = useState(null)
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
    const [error, setError] = useState('')
    const [List, setList] = useState('')
    const [empty, setEmpty] = useState(null)
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
            setError(err);
        }
    };

    const showDataById = async (userId) => {
        const userRef = doc(db, "users", userId);

        try {
            const docSnapshot = await getDoc(userRef);
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                if(data){
                    setEmpty(false)
                }
                else{
                    setEmpty(true)
                }
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
                
            } else {
                setError("Document does not exist");
            }
        }
        catch (error) {
            setError("Error retrieving documents:", error);
        }
    };
    useEffect(() => {

        getList();
        showDataById(id)

    }, []);

    return (
        <>
            { empty !== null ? <div className={styles.profile}>
                <div className={styles.card}>
                    <div className={styles.space}>
                        <div className={styles.userInfo}>
                            {image ? <img className={styles.image} src={image} /> : <img className={styles.image} src='/user.png' />}
                            <div className={styles.col}>
                                <div className={styles.name}> {username}</div>
                                <div className={styles.job}>{job}</div>
                                {country ? <div className={styles.location}><div className={styles.emailIcon}><ImLocation /></div>{country}</div> : ""}
                                <div className={styles.iconsG1}>

                                    {linked ? <Link to={linked.startsWith("http") ? linked : `https://${linked}`} target="blank" ><Button padding="5px" className={styles.emailIcon}><FaLinkedin /></Button></Link> : ""}
                                    {github ? <Link to={github.startsWith("http") ? github : `https://${github}`} target="blank" ><Button padding="5px" className={styles.emailIcon}><FaGithub /></Button></Link> : ""}
                                    {stack ? <Link to={stack.startsWith("http") ? stack : `https://${stack}`} target="blank" ><Button padding="5px" className={styles.emailIcon}><BsStackOverflow /></Button> </Link> : ""}
                                    {portfolio ? <Link to={portfolio.startsWith("http") ? portfolio : `https://${portfolio}`} target="blank" ><Button padding="5px" className={styles.emailIcon}><FaLink /></Button> </Link> : ""}

                                </div>
                            </div>

                        </div>

                        <div className={styles.icons}>
                            {user ? <Link to={`/edit/${id}`} className={styles.icon}><MdModeEditOutline /></Link> : " "}

                        </div>

                    </div>
                    <br />
                    <div className={styles.infoCard}>
                        <div className={styles.title}>Summary</div>
                        {summary ? <div className={styles.summary}>{summary}</div> : <div className={styles.summary}><br />No info yet..</div>}

                    </div>
                    <br />
                    <div className={styles.infoCard}>
                        <div className={styles.title}>Contact Info</div>
                        {phone ? <div className={styles.email}><div className={styles.emailIcon}><MdOutlinePhoneIphone /></div>{phone}</div> : ""}
                        <div className={styles.email}><div className={styles.emailIcon}><MdEmail /></div>{email}</div>


                    </div>
                </div>



                {skills.length ? <div className={styles.card}>
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
                </div> : ""}

            </div>:
            <div style={{ position: "absolute", top: "50%", left: "50%", transition: "translate(-50%, -50%)" }}>
                <Spinner className={styles.spinner} animation="border" variant="primary" />
            </div>
              }
        
        }
        </>
    )
}

export default ViewProfile
