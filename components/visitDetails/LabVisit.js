import React, { useState } from 'react'
import { faPhone, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Import Components
import styles from '../../styles/Visit.module.css'
import Image from 'next/image';
import "nprogress/nprogress.css";

import "nprogress/nprogress.css";
import NProgress from 'nprogress';
import axios from 'axios';
import { useRouter } from 'next/router'
import UploadFile from '../../components/uploadfile';
import Link from 'next/link';


export default function LabVisit({ visitData }) {

    const [links, setLinks] = useState([])
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

    async function UpdateVisit(e) {
        e.preventDefault()
        NProgress.start()
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("AuthTokens")).access}` }
        };


        const DataToUpdate = {
            test_attachments: links.join(","),
            visit_status: true,
        }
        try {
            const res = await axios.put(visitUpdateUrl, DataToUpdate, config);
            if (res.status === 400) {
                console.log(`${res.status} bad request`)
                NProgress.done()
            }
            if (res.status === 201 || res.status === 200) {
                console.log('updated')
                NProgress.done()
                router.reload(window.location.pathname)
            }
        }
        catch (error) {
            console.log(` Error Signing in: ${error}`)
            NProgress.done()
        }
    }



    async function onSubmitCloseVisit() {
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
                    <form onSubmit={UpdateVisit}>
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
                                        <UploadFile setLinks={setLinks} links={links} />
                                        <div id="message" class="overflow-y-auto h-36 block p-2.5 w-96 text-lg text-gray-900 bg-gray-400 rounded-lg border border-gray-30 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" >
                                            {visitData.test_attachments ?

                                                <div> {visitData.test_attachments.split(",").map(link => {
                                                    return (<span key={link} ><Link href={link}><span className='mr-5 text-lg underline cursor-pointer'>Test Link</span></Link></span>)
                                                })

                                                }  </div> : "there is no test_attachments provided yet"}</div>




                                    </div>
                                </div>
                                {/* <div>
                                <label for="message" class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-400">X-Rays</label>
    
    
    
                                <textarea id="tests" name='tests' rows="5" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Please Dr. leave your comments here..." defaultValue={visitData.x_rays}></textarea>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 mt-5" for="xrays_files">Xray Results</label>
                                <div className='flex justify-around'>
                                    <input name='xrays_files' class="block w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="xrays_files" type="file"/>
                                    <div id="message" class="overflow-y-auto h-36 block p-2.5 w-96 text-lg text-gray-900 bg-red-500 rounded-lg border border-gray-30 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" >{visitData.x_rays_attachments? visitData.x_rays_attachments : "there is no X_rays_attachments provided yet"}</div>
                                </div>                               
            
                            </div> */}
                                <div className={styles.buttons}>
                                    <button type='submit' className={styles.buttonSave}>Save</button>
                                    <button onClick={onSubmitCloseVisit} className={styles.buttonClose}>Close Visit</button>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </>

        </>
    )
}
