//Import Components
import styles from '../styles/Clients.module.css'
import Image from 'next/image'

export default function Clients(){
    return(
        <>
        <div className={styles.clients}>
        <h2 className={styles.h2}>Our Clients</h2>
        <div className={styles.clisec}>
        <div className={styles.clicon}>
            <p className={styles.p}>Istiqlal Hospital</p>
            <div className={styles.img}>
            <Image src='/images/isteklal.png' alt='' width='220' height='220'/>
            </div>
        </div>
        <div className={styles.clicon}>
            <p className={styles.p}>Dr Yasin Soub Tayseer</p>
            <div className={styles.img}>
            <Image src='/images/doctor1.jpeg' alt='' width='220' height='220'/>
            </div>
        </div>
        <div className={styles.clicon}>
            <p className={styles.p}>Medlabs</p>
            <div className={styles.img}>
            <Image src='/images/medlabs.png' alt='' width='220' height='220'/>
            </div>
        </div>
        <div className={styles.clicon}>
            <p className={styles.p}>Gulf X-ray Centers</p>
            <div className={styles.img}>
            <Image src='/images/gulf.jpeg' alt='' width='220' height='220'/>
            </div>
        </div>
        </div> 
        </div>
        </>
    )
}