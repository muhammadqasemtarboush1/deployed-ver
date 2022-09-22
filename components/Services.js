 //Import Components
import Link from 'next/link'
import styles from '../styles/Services.module.css'
import Image from 'next/image'

export default function Services(){
    return(
        <>
        <div className={styles.services}>
        <h2 className={styles.h2}>Our Services</h2>
        <div className={styles.sersec}>
        <div className={styles.seicon}>
            <p className={styles.p}>Create Doctor Visits</p>
            <div className={styles.img}>
            <Image src='/images/doctor.jpg' alt='' width='220' height='220'/>
            </div>
        </div>
        <div className={styles.seicon}>
            <p className={styles.p}>Serve your Medicines</p>
            <div className={styles.img}>
            <Image src='/images/medicines.png' alt='' width='220' height='220'/>
            </div>
        </div>
        <div className={styles.seicon}>
            <p className={styles.p}>Check your Tests Results</p>
            <div className={styles.img}>
            <Image src='/images/tests.jpeg' alt='' width='220' height='220'/>
            </div>
        </div>
        <div className={styles.seicon}>
            <p className={styles.p}>Check your X-rays</p>
            <div className={styles.img}>
            <Image src='/images/xray.png' alt='' width='220' height='220'/>
            </div>
        </div>
        </div> 
        </div>
        </>
    )
}