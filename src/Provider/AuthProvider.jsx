import React, { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/Firebase.config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
export const AuthContext = createContext(null)
export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email,password)
    }
    const loginUser = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logoutUser = ()=>{
        setLoading(true)
        return signOut(auth)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser)
            setLoading(false)
        })
        return ()=>{
            unsubscribe();
        }
    },[])
    const authInfo = {
        user,createUser,loginUser, logoutUser,loading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    ); 
};

export default AuthProvider;