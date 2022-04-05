import React, { useState } from "react";
import { Row, Col } from "@themesberg/react-bootstrap";
import useGetReport from '../../hooks/reports/useGetReport';

import { ReportDetailWidget, AttachementPreviewWidget } from '../core/Widgets';

function ReportDetail({ reportId }) {
    // const [feedback, setFeedback] = useState("");
    // const { submitUpdate } = useUpdateReport();
    // const { ModalFooter } = useModal();
    
    return ( 
        <Row>
            <Col xs={12} xl={4} className="mb-4">
                <AttachementPreviewWidget
                    title="Report Attachemnt"
                    attachment = ""
                />
            </Col>
            <Col xs={12} xl={8}>
                <ReportDetailWidget/>
            </Col>
        </Row>
    );
}

export default ReportDetail;
