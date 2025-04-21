import axios from 'axios';
import React, { useContext, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    headers: {}
})
const useAxiosSecure = () => {
    const {logoutUser} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(()=>{
        axiosInstance.interceptors.response.use(response =>{
            return response
        },error=>{
            // console.log('error caught in interceptor',error)
            if(error.status == 401 || error.status == 403){
                // console.log('need to log out user')
                logoutUser()
                .then(()=>{
                    // console.log('logged out from interceptor ');
                    navigate('/login')
                })
                .catch(er=>{
                    // console.log('error detected in interceptor when trying to log out',er)
                })
            }
            return Promise.reject(error)
        })
    },[])
    return axiosInstance;
};

export default useAxiosSecure;