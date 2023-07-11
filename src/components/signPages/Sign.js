import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

import styles from './Sign.module.scss';


const Sign = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signin, signup } = useContext(AuthContext)
    const pathname = window.location.pathname
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (pathname === '/signin') {
            await signin(email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    navigate("/")
                    console.log(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                });
        }
        else if (pathname === '/signup') {
            await signup(email, password).then((userCredential) => {
                const user = userCredential.user;
                navigate('/')
                console.log(user)
            })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                })
        }
    }

    return (
        <div>
            <div className={styles.container}>
                <img className={styles.image} src="/bg4.jpg" />
            </div>
            <div className={`${styles.container} ${styles.paddingCard}`}>
                <div className={styles.card}>
                    <div className={styles.name}>
                        <img className={styles.icon} src='/favicon.png' />&nbsp;&nbsp;&nbsp;
                        <h1> WUZZUF </h1>
                    </div>
                    <form className={styles.form}>
                        <div>
                            <label htmlFor="email-address">
                                Email
                            </label>
                            <br />
                            <input
                                className={styles.input}
                                type="email"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Email"
                            />
                        </div>
                        <br />

                        <div>
                            <label htmlFor="password">
                                Password
                            </label>
                            <br />
                            <input
                                className={styles.input}
                                type="password"
                                label="Create password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Password"
                            />
                        </div>
                        <br />
                        <br />

                        <button
                            className={styles.btn}
                            onClick={(e) => handleSubmit(e)}
                            type="submit"
                        >
                            {pathname === '/signin' ? "Sign in" : "Sign up"}
                        </button>

                    </form>

                    {pathname === '/signin' ?
                        <p>New to WUZZUF?{" "}
                            <Link className={styles.link} to="/signup" >
                                Join now
                            </Link>
                        </p> :
                        <p>
                            Already have an account? {" "}
                            <Link className={styles.link} to="/signin" >
                                Sign in
                            </Link>
                        </p>
                    }
                </div>
            </div>
        </div>
    )
}

export default Sign