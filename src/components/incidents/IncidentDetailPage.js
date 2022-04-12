import React from "react";
import Actions from "../core/actions";
import IncidentDetail from "./IncidentDetail";
import {useParams} from 'react-router';

function IncidentDetailPage() {

    const { Id } = useParams();

    return (
        <>
            <Actions />
            <IncidentDetail incidentId={Id}/>
        </>

    );

    
}

export default IncidentDetailPage