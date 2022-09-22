//Import Components

import Navbar from "../../components/Navbar";

import LabsTable from '../../components/HealthcareCenters/LabsTable';


export default function Labs(){
    return(
        <>
        <Navbar/>
            <div>
                <LabsTable/>
            </div>
        </>
    )
}