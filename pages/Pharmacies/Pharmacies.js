//Import Components
import Navbar from "../../components/Navbar";
import PharmaciesTable from '../../components/HealthcareCenters/PharmaciesTable';

export default function Pharmacies(){
    return(
        <>
        <Navbar/>
            <div>
                <PharmaciesTable/>
            </div>
        </>
    )
}