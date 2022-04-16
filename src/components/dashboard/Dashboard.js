
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBook, faUser, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from '@themesberg/react-bootstrap';

import { CounterWidget, NotificationWidget, ReportedIncidentsWidget} from '../core/Widgets';
import { DashboardIncidents } from '../incidents/Incidents';
import Actions from "../core/actions";
import useGetDashboardData from '../../hooks/utils/useGetDashboardData';

function Dashboard() {
  const {data} = useGetDashboardData("start=01-02-2022")

  return (
    <>
      <Actions/>

      {data && <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-sm-block">
          <ReportedIncidentsWidget
            title="Incidents And Reports Summary"
            value="10,567"
            percentage={10.57}
            chart_data={{
              labels: data.labels,
              series: [
                {
                  name: "Incidents",
                  data: data.summary_chart[0],
                  meta:"incidents",
                },
                {
                  name: "Reports",
                  data: data.summary_chart[1],
                  meta: "reports"
                },
              ],
            }}
          />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Citizens"
            title={data.users}
            period={data.period}
            percentage={0}
            description="Citizens registration summary"
            icon={faUser}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Incidents"
            title={data.incidents}
            period={data.period}
            percentage={0}
            icon={faExclamationTriangle}
            description="Incidents reported summary"
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Reports"
            title={data.reports}
            period={data.period}
            percentage={0}
            icon={faBook}
            description="Reports created summary"
            iconColor="shape-tertiary"
          />
        </Col>
      </Row>}

      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={8} className="mb-4">
              <Row>
                <Col xs={12} className="mb-4">
                  <DashboardIncidents />
                </Col>
              </Row>
            </Col>

            <Col xs={12} xl={4} className="px-0 mb-4">
              <NotificationWidget />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;