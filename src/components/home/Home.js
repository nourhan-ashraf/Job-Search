import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsSearch } from 'react-icons/bs'

import styles from './Home.module.scss'

const placeholders = ["Search Jobs (e.g. Sales)", "Search Jobs (e.g. Remote Jobs)", "Search Jobs (e.g. Senior Java Developer)"];

const Home = () => {
    const [index, setIndex] = useState(0); 
    const [placeholder, setPlaceholder] = useState(placeholders[index]); 
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate()
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % placeholders.length); 

            setPlaceholder(placeholders[index]);
        }, 2000);

        return () => {
            clearInterval(interval); 
        };
    }, [index])

    const handleNavigation = () => {
        localStorage.setItem('query', searchValue);
        navigate('/home')
    }

    return (
        <>
            <div className={styles.container}>

                <video loading="eager" className={styles.video} controls autoPlay loop>
                    <source src={'/video.mp4'} type="video/mp4" />
                </video>
            </div>
            <div className={`${styles.container} ${styles.paddingTitle}`}>
                <div className={styles.title}>Find the Best Jobs in the World</div>
                <div className={styles.subTitle}>Searching for vacancies & career opportunities? WUZZUF helps you in your job search</div>
                <br />

                <div className={styles.searchContainer}>
                    <BsSearch className={styles.icon} />
                    <input
                        className={styles.searchBar}
                        placeholder={placeholder}
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)} />
                    <div className={styles.searchComponents}>
                        <button className={styles.searchBtn} onClick={handleNavigation}>Search Jobs</button>
                    </div>
                </div>
                <br />
                <button className={styles.searchBtnHid} onClick={handleNavigation}>Search Jobs</button>
            </div>
        </>
    )
}

export default Home