//Import Components
import styles from '../styles/AboutUs.module.css'
import Image from 'next/image'

export default function AboutUs(){
    return(
        <>
        <div className={styles.aboutcomponent}>
            <div className={styles.aboutImage}>
            <Image src='/images/records.png' alt='' height='1000' width='1300' />
            </div>
            <div>
            <h2 className={styles.abouth2}>About Us</h2>
            <p className={styles.aboutp}>
            It is a platform for health history of the patients including the records of the diseases and hospitals,
            labs, x-rays centers <br/>and pharmacies. The users in the medical centers can modify the patient data on their
            profile based on the permission level. It will solve the paper wasting which will save the environment,
            increase the integration between the health centers about the same patient,decrease the time of the
            patient to be recovered as soon as possible without trying many new medicines.
            </p>
            </div>
        </div>
        </>
    )
}