import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../firebase";
import { Center, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { TiArrowSortedDown } from "react-icons/ti";

import styles from './Nav.module.scss';

const Nav = () => {
    const navigate = useNavigate();
    const { signout, user } = useAuth()
    const [savedClick, setSavedClick] = useState()
    const [exploreClick, setExploreClick] = useState()
    const handleLogout = () => {
        signout(auth).then(() => {
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log(error)
        });
    }
    let pathname = window.location.pathname

    useEffect(() => {
        if (pathname === '/saved') {
            setSavedClick(true)
            setExploreClick(false)
        }
        else if (pathname === '/home') {
            setExploreClick(true)
            setSavedClick(false)
        }
    }, [pathname])
    console.log(pathname)
    return (
        <nav className={pathname === '/' ? styles.navbar : styles.secNavbar}>
            <div className={styles.navComponents}>
                <Link to='/'>
                    {pathname === '/' ? <img className={styles.logoWhite} src='https://wuzzuf.net/images/HomepageImages/logo-white.png' /> : <img className={styles.logoBlue} src='https://www.efgev.com/wp-content/uploads/Wuzzuf-Logo-1.png' />}
                </Link>
                {(user === null || pathname === '/') ? <div></div> : <div><Link className={exploreClick ? styles.homeClicked : styles.home} to='/home'>EXPLORE</Link> <Link className={savedClick ? styles.savedClicked : styles.saved} to='/saved'>SAVED</Link></div>}

            </div>
            {console.log(user)}
            {user === null ? <div>
                <Link to='/signin'>{pathname === '/' ? <button className={styles.secLoginBtn}>Login</button> : <button className={styles.loginBtn}>Login</button>}</Link>
                <Link to='/signup'><button className={styles.signupBtn}>Join Now</button></Link>
            </div> :

                <Center>
                    <img className={styles.avatar} src='/user.png' />
                    <Menu>
                        <MenuButton
                            border={"none"}
                            as={IconButton}
                            aria-label='Options'
                            icon={<TiArrowSortedDown />}
                            variant='outline'
                        />
                        <MenuList>
                            <Link to='/profile'><MenuItem>
                                Profile
                            </MenuItem></Link>
                            <MenuItem onClick={handleLogout}>
                                Log out
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Center>
            }

        </nav>
    )
}

export default Nav