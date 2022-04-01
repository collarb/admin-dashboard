import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText, faAngleDown, faFileArchive, faCheck } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Button,
  Dropdown,
  Card,
  Table,
  ProgressBar,
} from "@themesberg/react-bootstrap";
import useFetchIncidents from "../../hooks/incidents/useFetchIncidents";
import Loader from "../core/Loader";
import Actions from "../core/actions";

function Incidents() {
  const { loading, incidents } = useFetchIncidents();

  return (
    <>
      <Actions/>

      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={12} className="mb-4">
              <Card border="light" className="shadow-sm mb-4">
                <Card.Header>
                  <Row className="align-items-center">
                    <Col>
                      <h5>Reported Incidents</h5>
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
                      {loading ? (
                        <Loader />
                      ) : incidents.length === 0 ? (
                        <div>No data</div>
                      ) : (
                        incidents.map((pt,index) => (
                          <TableRow key={`page-traffic-${pt.id}`} item={pt} index={index} />
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

function TableRow({item, index}) {

  return (
    <tr>
      <td>
        <Card.Link href="#" className="text-primary fw-bold">
          {index+1}
        </Card.Link>
      </td>
      <td className="fw-bold">
        <FontAwesomeIcon
          icon={faAngleDown}
          className={`icon icon-xs text-gray w-30`}
        />
        {item.type_display.name}
      </td>
      <td>{item.subject}</td>
      <td>{item.description ? item.description : "--"}</td>
      <td>{item.area ? item.area.description : "--"}</td>
      <td>
        <Row className="d-flex align-items-center">
          <Col xs={12} xl={2} className="px-0">
            <small className="fw-bold">{item.views}%</small>
          </Col>
          <Col xs={12} xl={10} className="px-0 px-xl-1">
            <ProgressBar
              variant="primary"
              className="progress-lg mb-0"
              now={item.views}
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
              For Approval
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faCheck} className="me-2" /> Approve
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
}

export default Incidents;
