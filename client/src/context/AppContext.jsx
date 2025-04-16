import axios from 'axios';
import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';

export const AppContext = createContext()

export const AppContextProvider = (props)=>{

    axios.defaults.withCredentials = true;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState(null)

    const getAuthState = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/auth/is-auth', { withCredentials: true })
            if(data.success){
                setIsLoggedIn(true)
                getUserData()  
            }
        }catch(error){
            console.error('Auth state error:', error);
            toast.error(error.response?.data?.message || 'Error checking auth state')
        }
    }

    const getUserData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/user/data', { withCredentials: true })
            if(data.success) {
                console.log('Received user data:', data.userData);
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error('Get user data error:', error);
            toast.error(error.response?.data?.message || 'Error fetching user data')
        }
    }

    useEffect(()=>{
        getAuthState();
    },[])
    
    const value = {
        backendUrl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData
    }
    
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}