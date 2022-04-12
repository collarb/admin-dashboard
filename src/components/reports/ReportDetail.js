import React  from "react";
import { Row, Col } from "@themesberg/react-bootstrap";
import useGetReport from '../../hooks/reports/useGetReport';
import Loader from "../core/Loader";

import { ReportDetailWidget, AttachementPreviewWidget } from '../core/Widgets';

function ReportDetail({ reportId }) {
    
    const { loading, report } = useGetReport(reportId);
    
    return ( 
        loading?
        <Loader/>:
        <Row>
            <Col xs={12} xl={5}>

                <AttachementPreviewWidget
                    title="Report Attachment"
                    attachment = {report.attachment}
                />
            </Col>
            <Col xs={12} xl={7}>
                <ReportDetailWidget data={report}/>
            </Col>
        </Row>
    );
}

export default ReportDetail;
