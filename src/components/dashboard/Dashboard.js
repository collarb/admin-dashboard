
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faBook, faUser, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';

import { CounterWidget, NotificationWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, ReportedIncidentsWidget, SalesValueWidgetPhone, AcquisitionWidget } from '../core/Widgets';
import { DashboardIncidents } from '../incidents/Incidents';
import { trafficShares, totalOrders } from "../../data/charts";
import Actions from "../core/actions";

function Dashboard() {
  return (
    <>
      <Actions/>

      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-sm-block">
          <ReportedIncidentsWidget
            title="Incidents And Reports Summary"
            value="10,567"
            percentage={10.57}
            chart_data={{
              labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              series: [
                {
                  name: "Incidents",
                  data: [1, 2, 2, 3, 3, 4, 3],
                  meta:"incidents",
                },
                {
                  name: "Reports",
                  data: [0, 1, 6, 7, 2, 1, 2],
                  meta: "reports"
                },
              ],
            }}
          />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Citizens"
            title="345"
            period="Feb 1 - Apr 1"
            percentage={18.2}
            description="Citizens registration summary"
            icon={faUser}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Incidents"
            title="43,594"
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faExclamationTriangle}
            description="Incidents reported summary"
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Reports"
            title="43,594"
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faBook}
            description="Reports created summary"
            iconColor="shape-tertiary"
          />
        </Col>
      </Row>

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