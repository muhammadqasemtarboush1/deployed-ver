import React from 'react'

//Import Components
import styles from '../../styles/Visit.module.css'
import Image from 'next/image';
import "nprogress/nprogress.css";


// get our fontawesome imports
import { faPhone, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "nprogress/nprogress.css";
import NProgress from 'nprogress';
import axios from 'axios';
import { useRouter } from 'next/router'
import Link from 'next/link';




export default function PatientVisit({ visitData }) {
    const router = useRouter()
    const visitUpdateUrl = "https://sehtak.herokuapp.com/api/v1/visits/" + visitData.id + "/"
    async function CloseVisit() {
        NProgress.start()
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("AuthTokens")).access}` }
        };


        const closing = {
            visit_status: false,
        }
        try {
            const res = await axios.put(visitUpdateUrl, closing, config);
            if (res.status === 400) {
                console.log(`${res.status} bad request`)
                NProgress.done()
            }
            if (res.status === 201 || res.status === 200) {
                console.log('closed')
                NProgress.done()
            }
        }
        catch (error) {
            console.log(` Error Signing in: ${error}`)
            NProgress.done()
        }
    }


    async function onSubmit() {
        if (confirm("Are You Sure That You Want To Close This Visit?") == true) {
            await CloseVisit()
            router.reload(window.location.pathname)
        }
    }

    return (
        <>
            <>
                <div className={styles.vHeader}>
                    <div>
                        <p className={styles.title}>Visit Date</p>
                        <p className={styles.title}>{visitData.created_at}</p>
                    </div>
                    <div className={styles.title}>
                        <p> Dr. {visitData.doctor.name}</p>
                        <p><span><FontAwesomeIcon icon={faPhone} /></span> {visitData.doctor.phone}</p>
                    </div>
                    <div className={styles.title}>
                        <p >Visit ID </p>
                        <p>{visitData.id} <span><FontAwesomeIcon icon={faCopy} /></span></p>
                    </div>
                </div>
                <hr />
                <div className='container mx-auto'>
                    <div className={styles.components}>
                        <div className={styles.desc}>
                            <label for="message" class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-400 " >Description</label>
                            <div id="message" class="overflow-y-auto h-36 block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-30 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" >{visitData.description ? visitData.description : "there is no description provided yet"}</div>
                        </div>
                        <div className={styles.medicine}>
                            <div>
                                <label class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-400">Medicine</label>
                                <div id="message" className="overflow-y-auto h-44 w-60 block p-2.5 text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300">{visitData.medicine ? visitData.medicine : "there is no medicine yet"}</div>
                            </div>
                            <div>
                                <label for="green-toggle" class="inline-flex relative items-center mr-5 cursor-pointer">
                                    <input type="checkbox" value="" id="green-toggle" class="sr-only peer" />
                                    <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Sold to Patient: {visitData.medicine_status ? <span className='text-green-400'>sold</span> : <span className='text-red-400'>Not yet</span>}</span>
                                </label>
                            </div>
                            <div>
                                <Image src='/images/treatment_icons.png' alt='' height='200' width='230' />
                            </div>
                        </div>
                        <div >
                            <div className='mb-5'>
                                <label for="message" class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-400">Tests</label>
                                <div id="message" rows="9" class="mb-3 overflow-y-auto h-36 block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-30 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" >{visitData.test ? visitData.test : "there is no tests provided yet"}</div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 mt-5" for="tests_files">Tests Results</label>
                                <div className='flex justify-around'>

                                    <div id="message" class="overflow-y-auto h-36 block p-2.5 w-96 text-lg text-gray-900 bg-gray-400 rounded-lg border border-gray-30 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" >
                                        {visitData.test_attachments ?

                                            <div> {visitData.test_attachments.split(",").map(link => {
                                                return (<span key={link} ><Link href={link}><span className='mr-5 text-lg underline cursor-pointer'>Test Link</span></Link></span>)
                                            })

                                            }  </div> : "there is no test_attachments provided yet"}</div>




                                </div>
                            </div>
                            <div className='mb-5'>
                                <label for="message" class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-400">X-Rays</label>
                                <div id="message" rows="9" class="mb-3 overflow-y-auto h-36 block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-30 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" >{visitData.x_rays_description ? visitData.x_rays_description : "there is no X-rays provided yet"}</div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="user_avatar">X-Rays Results</label>
                                <div className='flex justify-around'>

                                    <div id="message" class="overflow-y-auto h-36 block p-2.5 w-96 text-lg text-gray-900 bg-gray-400 rounded-lg border border-gray-30 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" >

                                        {visitData.x_rays_attachments ?

                                            <div> {visitData.x_rays_attachments.split(",").map(link => {
                                                return (<span key={link} ><Link href={link}><span className='mr-5 text-lg underline cursor-pointer'>x_ray Link</span></Link></span>)
                                            })

                                            }  </div> : "there is no x_rays_attachments provided yet"}
                                    </div>


                                </div>
                            </div>
                            {
                                visitData.visit_status ?
                                    <div className={styles.buttons + " flex justify-end pr-1 py-7"}>
                                        <button onClick={onSubmit} className={styles.buttonClose}>Close Visit</button>
                                    </div>
                                    : ""
                            }
                        </div>
                    </div>
                </div>


            </>

        </>
    )
}