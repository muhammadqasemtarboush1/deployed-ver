import { useState } from "react";
import { useAuth } from '../../contexts/Auth';
import { useRouter } from 'next/router';
// import redirect from 'nextjs-redirect'
import { useEffect } from 'react';


import {PatientProfile } from '../../components/ProfileComponents/Patient/PatientProfile'


function App() {
    
    const {isAuth } = useAuth();
    const router = useRouter();
    const isLoggedIn = isAuth()
    useEffect(() => {
        if(!isLoggedIn){
            router.push('login?ss=failed');
            return     
        }
    },[isLoggedIn])


    return (
        
            <>
               {isLoggedIn ? <PatientProfile/>:"" }
            </>
    );
}

export default App;

