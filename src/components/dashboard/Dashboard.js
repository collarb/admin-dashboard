
import React, {useState, useEffect} from "react";
import {faBook, faUser, faExclamationTriangle, faCheck, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from '@themesberg/react-bootstrap';
import { CounterWidget, NotificationWidget, ReportedIncidentsWidget} from '../core/Widgets';
import { DashboardIncidents } from '../incidents/Incidents';
import Actions from "../core/actions";
import useGetDashboardData from '../../hooks/utils/useGetDashboardData';
import useModal from '../../hooks/core/useModal';
import CustomDateFilterForm from "./CustomDateFilterForm.";

function Dashboard() {

  const {data, handleParams} = useGetDashboardData();
  const [division, setDivision] = useState(null);
  const { openModal } = useModal();

  useEffect(()=>{
    if(division){
      handleParams({division: division?.id})
    }else{
      handleParams({division: ""})
    }
  },[division]);

  const formatDate = d => (("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
  d.getFullYear());
  ;

  const thisMonthFilter = () => {
      const date = new Date();
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      return [formatDate(firstDay), formatDate(lastDay)];
  };

  const lastMonthFilter = () => {
      const date = new Date();
      const firstDay = new Date(date.getFullYear(), date.getMonth()-1, 1);
      const lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
      return [formatDate(firstDay), formatDate(lastDay)];
  };

  const filterDate = value => {
      switch(value) {
          case "1":
            var res = thisMonthFilter();
            handleParams({start: res[0], end: res[1]});
            break;

          case "2":
            var res = lastMonthFilter();
            handleParams({start: res[0], end: res[1]});
            break;

          case "3":
            openModal(
              <CustomDateFilterForm handleParams={handleParams} formatDate={formatDate} />, 
              "Custom Date Filter"
            );
            break;

          default:
              return null;
      }
  };

  return (
    <>
      <Actions/>

      {data && <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-sm-block">
          <ReportedIncidentsWidget
            title={`Submitted Incidents And Reports Summary : ${division?division.description:"All Divisions"}`}
            value="10,567"
            setDivision={setDivision}
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
            filterDate={filterDate}
          />
        </Col>
        <Col xs={12} sm={6} xl={2} className="mb-4">
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
          <Row>
            <Col xs={12} sm={12} xl={12} className="mb-4">
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
            <Col xs={12} sm={12} xl={12} className="mb-4">
              <CounterWidget
                category="Approved Incidents"
                title={data.approved_incidents}
                period={data.period}
                percentage={0}
                icon={faCheckSquare}
                description="Incidents approved summary"
                iconColor="shape-tertiary"
              />
            </Col>
          </Row>
          
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <Row>
            <Col xs={12} sm={12} xl={12} className="mb-4">
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
            <Col xs={12} sm={12} xl={12} className="mb-4">
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
          </Row>
        </Col>
        <Col xs={12} sm={6} xl={2} className="mb-4">
          <CounterWidget
            category="Published Reports"
            title={data.published_reports}
            period={data.period}
            percentage={0}
            icon={faCheck}
            description="Published reports summary"
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