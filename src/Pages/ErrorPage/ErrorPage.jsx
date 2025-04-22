import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
            <h2>You are in Wrong Route! go <span className='font-bold text-green-600'><Link to='/'>Home</Link></span></h2>
        </div>
    );
};

export default ErrorPage;