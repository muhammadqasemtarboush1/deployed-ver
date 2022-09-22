import Image from 'next/image'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import styles from '../../styles/Visit.module.css'
import { Router, useRouter } from 'next/router';
import { useEffect, useState } from "react";
import axios from "axios";


// get our fontawesome imports
import { faPhone, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Pharmacies_card() {

    const router = useRouter();
    const { id } = router.query

    const [centerCard, setCenterCard] = useState({});
    const [visible, setVisibility] = useState('invisible');

    const [lat, setLat] = useState(null)
    const [lon, setLon] = useState(null)


    const getCenterCard = async () => {
        try {
            const response = await axios.get(`https://sehtak.herokuapp.com/pharmacist/profile/${id}`);
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
                    <h1 className={styles.titleb}>Pharmacy Card</h1>
                    <Image src='/images/ph_prof.png' alt='' height='230' width='230' />
                </div>
                <div>
                    <p className={styles.title}> {centerCard.name}</p>
                    <p className={styles.title}><span><FontAwesomeIcon icon={faPhone} /></span> {centerCard.phone}</p>
                    <p className={styles.title}>
                        <button onClick={handleVisiblity}>
                            <span><FontAwesomeIcon icon={faMapLocationDot} /> View Location</span>

                        </button>
                    </p>
                    <iframe className={`${visible}`} id='iframeId' height="300px" width="140%" title='doctor location'></iframe>

                </div>
                <div>
                    {/* <button className={styles.visitButton}> Visit</button> */}
                </div>
            </div>
            <Footer />
        </>
    )
}