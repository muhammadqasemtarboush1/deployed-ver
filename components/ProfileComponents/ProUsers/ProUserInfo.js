import React, { useState, useEffect } from 'react';

import axios from 'axios';
import jwt_decode from 'jwt-decode';

import Link from 'next/link';

import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import styles from '../../../styles/UserEditData.module.css';

export default function ProUserInfo() {

    const token = JSON.parse(localStorage.getItem('AuthTokens')).access;
    const userRole = jwt_decode(token).role.toLowerCase();
    console.log('userRole', userRole)
    const api = `https://sehtak.herokuapp.com/${userRole}/profile/`;
    const id_pro_user = jwt_decode(token).info_id;
    // const editUserUrl = `https://sehtak.herokuapp.com/${userRole}/profile/edit/`

    // https://sehtak.herokuapp.com/doctor/profile/1/
    // https://sehtak.herokuapp.com/doctors/profile/1
    const [proData, setProData] = useState(null);
    const [location, setLocation] = useState();
    const ifameData = document.getElementById("iframeId")
    useEffect(() => {
        async function getProfileInfo() {
            NProgress.start();
            await axios
                .get(api + id_pro_user + '', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    console.log(res.data);
                    setProData(res.data);

                    // setProData(da/ta.location )
                    let cLocation = res.data.location.split(',')
                    setLocation(cLocation)
                    // const lat= split_loc()[0];
                    // const lon= split_loc()[1];

                    ifameData.src = `https://maps.google.com/maps?q=${location[0]},${location[1]}&hl=es;&output=embed`
                    console.log(ifameData.src, ' ifameData.src  ifameData.src  ifameData.src');
                    NProgress.done();
                })
                .catch((error) => {
                    console.error(error);
                    console.log(222222);
                    console.log(api + id_pro_user + '/');
                    NProgress.done();
                });
        }

        getProfileInfo();
    }, []);

    return (
        <>

            {!proData ? (
                <div className="mt-5 ml-20" role="status">
                    <svg
                        aria-hidden="true"
                        className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            ) : (
                <div className="profile">
                    <div className="flex justify-between my-4 mb-6">
                        <span className={styles.name}>Hello {proData?.name} </span>
                        {/* <Link href="UserEditData">
                            <span className={styles.editButton}>Edit</span>
                        </Link> */}
                    </div>
                    <hr />
                    <div className="mt-3 ml-5">
                        <span className=""> Phone Number: </span>
                        <span className="font-medium text-sky-600">

                            {proData?.phone}
                        </span>
                    </div>
                    <div className="flex mt-3 ml-5">
                    </div>
                    <div className="mt-3 ml-5">
                        <span className="">City: </span>
                        <span className="font-medium text-l text-sky-500">
                            {proData?.city}
                        </span>
                    </div>
                    {
                        location && location.length > 1 && <div className="mt-3 ml-5">
                            <span className="">Location </span>
                            <iframe id='iframeId' height="300px" width="100%" title="doctor location "></iframe>
                        </div>
                    }

                </div>
            )}
        </>
    );
}
