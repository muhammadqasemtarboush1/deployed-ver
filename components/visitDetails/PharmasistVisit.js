import React, { useState } from 'react'

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

export default function PharmasistVisit({ visitData }) {

    const [IsSold, setIsSold] = useState(visitData.medicine_status);

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
            console.log(` Error in Updating: ${error}`)
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
            medicine: e.target.medicine.value,
            medicine_status: IsSold
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
                                    <textarea id="message" name='medicine' className="overflow-y-auto h-44 w-60 block p-2.5 text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300">{visitData.medicine ? visitData.medicine : "there is no medicine yet"}</textarea>
                                </div>
                                <div>
                                    <label for="medicine_status" class="inline-flex relative items-center mr-5 cursor-pointer">
                                        <input type="checkbox" name='medicine_status' id="medicine_status" class="sr-only peer" />
                                        {
                                            visitData.medicine_status === false ?
                                                <><div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600" onClick={(e) => setIsSold(!IsSold)}></div><span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Sold to Patient</span></> :
                                                <div className='px-2 text-white bg-green-500 rounded-md text-we'>Sold</div>
                                        }

                                    </label>
                                </div>
                                <div>
                                    <Image src='/images/treatment_icons.png' alt='' height='200' width='230' />
                                </div>
                            </div>
                            <div >

                                <div className={styles.buttons}>
                                    <button type='submit' className={styles.buttonSave}>Save</button>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </>

        </>
    )
}
