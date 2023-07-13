import React, { useEffect } from 'react';
import Sign from '../components/signPages/Sign';

const SignUp = () => {

  useEffect(() => {
    document.title = 'Sign up | WUZZUF'; 
  }, []);
  return (
    <>
        <Sign />
    </>
  )
}
 
export default SignUp