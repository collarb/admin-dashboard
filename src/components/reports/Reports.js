import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeOpenText,
  faAngleDown,
  faFileArchive,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Button,
  Dropdown,
  Card,
  Table,
  ProgressBar,
} from "@themesberg/react-bootstrap";

import useGetReports from "../../hooks/reports/useGetReports";
import Loader from "../core/Loader";
import Actions from "../core/actions";

function Reports() {

  const { reports, refresh, loading, refreshing } = useGetReports();

  

  return (
    <>
      <Actions refresh={refresh}/>
      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={12} className="mb-4">
              <Card border="light" className="shadow-sm mb-4">
                <Card.Header>
                  <Row className="align-items-center">
                    <Col>
                      <h5>Reports</h5>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body className="pb-0">
                  <Table
                    responsive
                    className="table-centered table-nowrap rounded mb-0"
                  >
                    <thead className="thead-light">
                      <tr>
                        <th className="border-0">#</th>
                        <th className="border-0">Type</th>
                        <th className="border-0">Subject</th>
                        <th className="border-0">Description</th>
                        <th className="border-0">Affected Area</th>
                        <th className="border-0">Reported On</th>
                        <th className="border-0">Status</th>
                        <th className="border-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading || refreshing ? (
                        <Loader />
                      ) : reports.length === 0 ? (
                        <div>No dara</div>
                      ) : (
                        reports.map((pt) => (
                          <TableRow key={`page-traffic-${pt.id}`} item={pt} />
                        ))
                      )}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

const TableRow = (props) => {
  const {
    id,
    source,
    sourceIcon,
    sourceIconColor,
    sourceType,
    category,
    rank,
    trafficShare,
  } = props;

  return (
    <tr>
      <td>
        <Card.Link href="#" className="text-primary fw-bold">
          {id}
        </Card.Link>
      </td>
      <td className="fw-bold">
        <FontAwesomeIcon
          icon={sourceIcon}
          className={`icon icon-xs text-${sourceIconColor} w-30`}
        />
        {source}
      </td>
      <td>{sourceType}</td>
      <td>{category ? category : "--"}</td>
      <td>{rank ? rank : "--"}</td>
      <td>
        <Row className="d-flex align-items-center">
          <Col xs={12} xl={2} className="px-0">
            <small className="fw-bold">{trafficShare}%</small>
          </Col>
          <Col xs={12} xl={10} className="px-0 px-xl-1">
            <ProgressBar
              variant="primary"
              className="progress-lg mb-0"
              now={trafficShare}
              min={0}
              max={100}
            />
          </Col>
        </Row>
      </td>
      <td>
        <Col xs={12} xl={10} className="px-0 px-xl-1">
          <ProgressBar
            variant="primary"
            className="progress-lg mb-0"
            now={50}
            min={0}
            max={100}
          />
        </Col>
      </td>
      <td>
        <Dropdown className="btn-toolbar">
          <Dropdown.Toggle
            as={Button}
            variant="success"
            size="sm"
            className="me-2"
          >
            <FontAwesomeIcon icon={faAngleDown} className="me-2" />
            Action
          </Dropdown.Toggle>
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faEnvelopeOpenText} className="me-2" /> Add
              Feedback
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faFileArchive} className="me-2" /> Forward
              For Review
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faCheck} className="me-2" /> Approve
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
};

export default Reports;
