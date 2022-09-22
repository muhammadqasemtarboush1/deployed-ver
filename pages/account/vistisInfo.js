import React, { useState, useEffect } from 'react'
import Image from 'next/image'

import { useAuth } from '../../contexts/Auth';
import { useRouter } from 'next/router';
import jwt_decode from "jwt-decode";

import Navbar from '../../components/Navbar';
import PatientInfo from '../../components/ProfileComponents/Patient/PatientInfo'
import PatientVisits from '../../components/ProfileComponents/Patient/PatientVisits'
import ProUserInfo from '../../components/ProfileComponents/ProUsers/ProUserInfo'
import ProUserVisits from '../../components/ProfileComponents/ProUsers/ProUserVisits'




export default function VistisInfo() {

    const [auth, setauth] = useState(false);
    
    const { isAuth } = useAuth();
    const isLoggedIn = isAuth()
    const router = useRouter();




    useEffect(() => {
        isAuth()?setauth(true): setauth(false);
    }, [])

    const theBlueLine = "text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
    const theBlueText = "text-blue-600 dark:text-blue-500"

    const theGrayLine = "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
    const theGrayText = "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"

    const [switchVal, setSwitchVal] = useState("visit")

    const [visit, setVisit] = useState([theBlueLine, theBlueText])
    const [profile, setProfile] = useState([theGrayLine, theGrayText])


    let userRole = ''
    if (typeof window !== 'undefined' && isLoggedIn) {
        const token = JSON.parse(localStorage.getItem("AuthTokens")).access
        userRole = jwt_decode(token).role
    }
    // else {
    //     router.push('login?status=failed');
    // }

    // let visit =[theBlueLine,theBlueText]
    // let profile = [theGrayLine,theGrayText]

    useEffect(() => {

        if (switchVal == "visit") {
            setVisit([theBlueLine, theBlueText])
            setProfile([theGrayLine, theGrayText])
        } else {
            setProfile([theBlueLine, theBlueText])
            setVisit([theGrayLine, theGrayText])
        }
    }, [switchVal])


    return (
        <>
            {auth ?
                <div className='h-screen backGroundCoverImage2'>
                    <Navbar />

                    <div>
                        <div className='w-4/6 ml-12'>
                            <div className="border-b border-gray-200 dark:border-gray-700">
                                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                                    <li className={"mr-2" + profile[0]} onClick={() => setSwitchVal("profile")}>
                                        <div href="#" className={profile[1] + "inline-flex p-4 border-b-2 border-transparent rounded-t-lg"}>
                                            <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>Profile
                                        </div>
                                    </li>
                                    <li className={"mr-2" + visit[0]} onClick={() => setSwitchVal("visit")}>

                                        <div className={visit[1] + `inline-flex p-4 border-b-2 border-transparent rounded-t-lg`} aria-current="page">
                                            <svg aria-hidden="true" className="w-5 h-5 mr-2 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>Visits
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {
                                switchVal == "visit" && userRole == 'PATIENT' && <PatientVisits />
                            }
                            {
                                switchVal == "profile" && userRole == 'PATIENT' && <PatientInfo />
                            }

                            {
                                switchVal == "visit" && userRole != 'PATIENT' && <ProUserVisits />
                            }
                            {
                                switchVal == "profile" && userRole != 'PATIENT' && <ProUserInfo />

                            }

                        </div>

                    </div>


                </div> : ""}
        </>
    )
}
