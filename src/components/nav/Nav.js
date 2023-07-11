import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../firebase";
import { Center, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { TiArrowSortedDown } from "react-icons/ti";

import styles from './Nav.module.scss';

const Nav = () => {
    const navigate = useNavigate();
    const { signout, user } = useAuth()

    const handleLogout = () => {
        signout(auth).then(() => {
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log(error)
        });
    }
    return (
        <nav className={styles.navbar}>
            <div>
                <img className={styles.logo} src='https://wuzzuf.net/images/HomepageImages/logo-white.png' />
            </div>
            {console.log(user)}
            {user === null ? <div>
                <Link to='/signin'><button className={styles.loginBtn}>Login</button></Link>
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
                            <Link to='/home'><MenuItem>
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