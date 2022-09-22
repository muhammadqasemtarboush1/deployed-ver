import Image from 'next/image'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import styles from '../../styles/Visit.module.css'
import { Router, useRouter } from 'next/router';
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "nprogress/nprogress.css";
import NProgress from 'nprogress';



// get our fontawesome imports
import { faPhone, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Doctor_card() {

    const CreateVisitURL = "https://sehtak.herokuapp.com/api/v1/visits/create/"

    const router = useRouter();
    const { id } = router.query

    const [centerCard, setCenterCard] = useState({});
    const [visible, setVisibility] = useState('invisible');

    const [lat, setLat] = useState(null)
    const [lon, setLon] = useState(null)
    let role = null

    if (typeof window !== 'undefined') {
        let accessData = JSON.parse(localStorage.getItem("AuthTokens")).access

        role = jwt_decode(accessData).role
        console.log(role, "rreerrefref");
    }
    const getCenterCard = async () => {
        try {
            const response = await axios.get(`https://sehtak.herokuapp.com/doctors/profile/${id}`);
            setCenterCard(response.data);
            if (response.status === 200) {
                const location_arr = await response.data.location.split(',')
                setLat(location_arr[0])
                setLon(location_arr[1])
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCenterCard();

    }, [])

    async function CreateVisit() {
        NProgress.start()
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("AuthTokens")).access}` }
        };
        let accessData = null
        let patientID = null
        let doctorID = null

        if (typeof window !== 'undefined') {
            accessData = JSON.parse(localStorage.getItem("AuthTokens")).access
            patientID = jwt_decode(accessData).info_id
            doctorID = centerCard.id
        }
        const ses = CreateVisitURL
        const userInput = {
            "description": "",
            "medicine": "",
            "medicine_status": false,
            "test_description": "",
            "test_attachments": "",
            "x_rays_description": "",
            "x_rays_attachments": "",
            "visit_status": true,
            "doctor": doctorID
        }
        try {
            const res = await axios.post(ses, userInput, config);

            if (res.status === 400) {
                console.log(`${res.status} bad request`)
                NProgress.done()
            }
            if (res.status === 201 || res.status === 200) {
                router.push('/account/vistisInfo?visitAdded=added');
            }
        }
        catch (error) {
            console.log(` Error Signing in: ${error}`)
            NProgress.done()
        }
    }

    const handleVisiblity = () => {
        setVisibility('visible');
        const ifameData = document.getElementById("iframeId")
        ifameData.src = `https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`
    }

    return (
        <>
            <Navbar />
            <div className='main'>
                <div>
                    <h1 className={styles.titleb}>Doctor Card</h1>
                    <Image src='/images/doc_prof.png' alt='' height='230' width='230' />
                </div>
                <div>
                    <p className={styles.title}> Dr. {centerCard.name}</p>
                    <p className={styles.title}><span><FontAwesomeIcon icon={faPhone} /></span> {centerCard.phone}</p>
                    <p className={styles.title}>
                        <button onClick={handleVisiblity}>
                            <span><FontAwesomeIcon icon={faMapLocationDot} /> View Location</span>

                        </button>
                    </p>
                    <iframe className={`${visible}`} id='iframeId' height="300px" width="140%" title='doctor location'></iframe>

                </div>
                <div>
                    {
                        role && role == "PATIENT" && <button onClick={CreateVisit} className={styles.visitButton}> Visit</button>

                    }
                </div>
            </div>
            <Footer />
        </>
    )
}