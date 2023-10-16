import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { auth, db } from "../../firebase";
import { Center, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { TiArrowSortedDown } from "react-icons/ti";

import styles from './Nav.module.scss';
import { doc, getDoc } from "firebase/firestore";

const useScreenWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
  
    useEffect(() => {
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    return windowWidth;
  };
const Nav = () => {
    const navigate = useNavigate();
    const { signout, user } = useAuth()
    const [savedClick, setSavedClick] = useState()
    const [exploreClick, setExploreClick] = useState()
    const [error, setError] = useState('')
    const id = localStorage.getItem('uid')
    const [photoURL, setPhotoURL] = useState('')
    const handleLogout = () => {
        signout(auth).then(() => {
            navigate("/");
            
        }).catch((error) => {
            setError(error)
        });
    }
    let pathname = window.location.pathname

    const getDataById = async (userId) => {
        const userRef = doc(db, "users", userId);
    
        try {
          const docSnapshot = await getDoc(userRef);
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            setPhotoURL(data.image)
          } else {
            setError("Document does not exist");
          }
        }
        catch (error) {
            setError("Error retrieving documents:", error);
        }
      };
      const windowWidth = useScreenWidth();

     
      
    useEffect(()=>{
        if(user)
            getDataById(id)
    },[user])

    useEffect(() => {
        if (pathname === `/saved/${id}`) {
            setSavedClick(true)
            setExploreClick(false)
        }
        else if (pathname === `/home/${id}`) {
            setExploreClick(true)
            setSavedClick(false)
        }
    }, [pathname])

    return (
        <nav className={pathname === '/' || pathname === `/${id}`  ? styles.navbar : styles.secNavbar}>
            <div className={styles.navComponents}>
                <Link to={user? `/${id}` : '/'}>
                    {pathname === '/' ? <img className={styles.logoWhite} src='/logo-white.png' /> : <img loading="eager" className={styles.logoBlue} src='/Wuzzuf-Logo-1.png' />}
                </Link>
                {(user === null || pathname === '/') ? <div></div> : <div>{user ? <Link className={exploreClick ? styles.homeClicked : styles.home} to={`/home/${id}`}>EXPLORE</Link> : <Link className={exploreClick ? styles.homeClicked : styles.home} to='/home'>EXPLORE</Link>} <Link className={savedClick ? styles.savedClicked : styles.saved} to={`/saved/${id}`}>SAVED</Link></div>}

            </div>
            {user === null ? <div>
                <Link to='/signin'>{pathname === '/' ? <button className={styles.secLoginBtn}>Login</button> : <button className={styles.loginBtn}>Login</button>}</Link>
                <Link to='/signup'><button className={styles.signupBtn}>Join Now</button></Link>
            </div> :

                <Center>
            {windowWidth<550 ? "" : photoURL ? <img className={styles.avatar} src={photoURL} /> : <img className={styles.avatar} src="/user.png" />}
                    <Menu>
                        <MenuButton
                            border={"none"}
                            as={IconButton}
                            aria-label='Options'
                            icon={<TiArrowSortedDown />}
                            variant='outline'
                        />
                        <MenuList>
                            <Link to={`/profile/${id}`}><MenuItem>
                                Profile
                            </MenuItem></Link>
                            {windowWidth<550 ? <Link to={`/saved/${id}`}><MenuItem>
                                Saved Jobs
                            </MenuItem></Link> : ""}
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