import React, { useEffect } from 'react';
import Sign from '../components/signPages/Sign';
 
const SignIn = () => {
    useEffect(() => {
        document.title = 'Sign in | WUZZUF'; 
      }, []);
    return(
        <>
            <Sign />
        </>
    )
}
 
export default SignIn
