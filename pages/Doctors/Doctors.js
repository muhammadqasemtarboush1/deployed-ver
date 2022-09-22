//Import Components
import Navbar from "../../components/Navbar";
import DoctorsTable from '../../components/HealthcareCenters/DoctorsTable';

export default function Doctors(){
    return(
        <>
        <Navbar/>
            <div>
                <DoctorsTable/>
            </div>
        </>
    )
}
