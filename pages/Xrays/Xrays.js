//Import Components
import Navbar from "../../components/Navbar";
import XraysTable from '../../components/HealthcareCenters/XraysTable';

export default function Xrays(){
    return(
        <>
        <Navbar/>
        {/* <h1 className={styles.title}> Xray Centers</h1>
        <hr/>
        <br/>
        <div className={styles.inputs}>
            <div className={styles.inputs}>
                <input placeholder='Search by Name' type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                <Image src='/images/search.jpg' alt='' width='50' height='50'/>

            </div>
            <div className={styles.inputs}>
                <input placeholder='Search by Specialty' type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                <Image src='/images/specialty.jpg' alt='' width='50' height='50'/>
            
            </div>
            <div className={styles.inputs}>
                <input placeholder='Search by Location' type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                <Image src='/images/location.jpg' alt='' width='50' height='50'/>
            
            </div>    
            </div> */}
            <div>
                <XraysTable/>
            </div>
        </>
    )
}