import React, { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/Firebase.config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import axios from 'axios';
import { GoogleAuthProvider } from "firebase/auth";

export const AuthContext = createContext(null)
export const AuthProvider = ({ children }) => {
    const provider = new GoogleAuthProvider();
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logoutUser = () => {
        setLoading(true)
        return signOut(auth)
    }
    const updateUserProfile = (updateData)=>{
        setLoading(true)
        return updateProfile(auth.currentUser, updateData)
    }
    const loginWithGoogle =()=>{
        setLoading(true)
        return signInWithPopup(auth, provider)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if(currentUser?.email){
                const user = {email: currentUser.email}
                axios.post('http://localhost:5000/jwt',user,{ withCredentials: true})
                .then(res=>{
                    console.log(res.data)
                    setLoading(false)
                })
            }
            else{
                axios.post('http://localhost:5000/logout',{},{ withCredentials: true})
                .then(res=>{
                    console.log('logout',res.data)
                    setLoading(false)
                })
            }
            
        })
        return () => {
            unsubscribe();
        }
    }, [])
    const authInfo = {
        user, setUser,createUser, loginUser, logoutUser,updateUserProfile,loginWithGoogle, loading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;