import React from 'react';
import NavBar from '../Pages/Home/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';

const Root = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;