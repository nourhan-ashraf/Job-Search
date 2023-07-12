import React, { useEffect } from 'react';
import Nav from '../components/nav/Nav';
import Home from '../components/home/Home';

const MainPage = () => {
    useEffect(() => {
        document.title = 'WUZZUF'; 
      }, []);
    return (
        <div>
            <Nav />
            <Home />
        </div>
    )
}

export default MainPage;