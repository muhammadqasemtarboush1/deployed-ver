import React from 'react'
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
import Link from 'next/link';


export default function DoctorVisit({ visitData }) {

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
            description: e.target.description.value,
            medicine: e.target.medicine.value,
            medicine_status: false,
            test_description: e.target.tests.value,
            visit_status: true,
            x_rays_description: e.target.x_ray.value
        }
        console.log('DataToUpdate :>> ', DataToUpdate);
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
                        <div><span><FontAwesomeIcon icon={faPhone} /></span> {visitData.doctor.phone}</div>
                    </div>
                    <div className={styles.title}>
                        <p >Visit ID </p>
                        <div>{visitData.id} <span><FontAwesomeIcon icon={faCopy} /></span></div>
                    </div>
                </div>
                <hr />
                <div className='container mx-auto'>
                    <form onSubmit={UpdateVisit}>
                        <div className={styles.components}>
                            <div className={styles.desc}>
                                <label for="message" class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-400 " >Description</label>
                                <textarea id="message" rows="6" name='description' class="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Please Dr. leave your comments here..." >{visitData.description ? visitData.description : ""}</textarea>
                            </div>
                            <div className={styles.medicine}>
                                <div>
                                    <label class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-400">Medicine</label>
                                    <textarea id="message" name='medicine' placeholder="Please Dr. leave your comments here..." className="overflow-y-auto h-44 w-60 block p-2.5 text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300">{visitData.medicine ? visitData.medicine : ""}</textarea>
                                </div>
                                <div>
                                    <label for="medicine_status" class="inline-flex relative items-center mr-5 cursor-pointer">
                                        <input type="checkbox" name='medicine_status' id="medicine_status" class="sr-only peer" />
                                        <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Sold to Patient</span>
                                    </label>
                                </div>
                                <div>
                                    <Image src='/images/treatment_icons.png' alt='' height='200' width='230' />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label for="tests" class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-400">Tests</label>
                                    <textarea id="tests" name='tests' rows="5" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Please Dr. leave your comments here..." >{visitData.test_description ? visitData.test_description : ""}</textarea>
                                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 mt-5" for="tests_files">Tests Results</label>
                                    <div className=''>


                                        <div id="message" class="mb-5 overflow-y-auto h-36 block p-2.5 w-96 text-lg text-gray-900 bg-gray-200 rounded-lg border border-gray-30 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" >
                                            {visitData.test_attachments ?

                                                <div> {visitData.test_attachments.split(",").map(link => {
                                                    return (<span key={link} ><Link href={link}><span className='mr-5 text-lg underline cursor-pointer'>Test Link</span></Link></span>)
                                                })

                                                }  </div> : "There is no test attachments provided yet"}</div>


                                    </div>
                                </div>
                                <div>
                                    <label for="message" class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-400">X-Rays</label>



                                    <textarea id="x_ray" name='x_ray' rows="5" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Please Dr. leave your comments here...">{visitData.x_rays_description ? visitData.x_rays_description : ""}</textarea>
                                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 mt-5" for="xrays_files">Xray Results</label>
                                    <div id="x_ray" class="overflow-y-auto h-36 block p-2.5 w-96 text-lg text-gray-900 bg-gray-200 rounded-lg border border-gray-30 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" >

                                        {visitData.x_rays_attachments ?

                                            <div> {visitData.x_rays_attachments.split(",").map(link => {
                                                return (<span key={link} ><Link href={link}><span className='mr-5 text-lg underline cursor-pointer'>x_ray Link</span></Link></span>)
                                            })

                                            }  </div> : "There is no x rays attachments provided yet"}
                                    </div>


                                </div>
                                <div className={styles.buttons}>
                                    <button type='submit' className={styles.buttonSave}>Save</button>
                                    {/* <button onClick={onSubmitCloseVisit} className={styles.buttonClose}>Close Visit</button> */}
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </>

        </>
    )
}
