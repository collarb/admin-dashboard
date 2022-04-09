import React, { useState } from "react";
import { Row, Col } from "@themesberg/react-bootstrap";
import useGetIncidentDetails from '../../hooks/incidents/useGetIncidentDetails';
import Loader from "../core/Loader";

import { IncidentDetailWidget, AttachementPreviewWidget } from '../core/Widgets';

function IncidentDetail({ incidentId }) {
    
    const { loading, incident } = useGetIncidentDetails(incidentId);
    
    return ( 
        loading?
        <Loader/>:
        <Row>
            <Col xs={12} xl={5}>

                <AttachementPreviewWidget
                    title="Incident Attachment"
                    attachment = {incident.attachment}
                />
            </Col>
            <Col xs={12} xl={7}>
                <IncidentDetailWidget data={incident}/>
            </Col>
        </Row>
    );
}

export default IncidentDetail;
