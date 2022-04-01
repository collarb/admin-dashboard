import React, { useEffect } from "react";
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
} from "@themesberg/react-bootstrap";
import useFetchIncidents from "../../hooks/incidents/useFetchIncidents";
import Loader from "../core/Loader";
import Actions from "../core/actions";
import useUpdateStatus from "../../hooks/core/useUpdateStatus";
import { STATUS_APPROVE, STATUS_FORWARD } from "../../util/constants";
import { INCIDENTS_API } from "../../util/apis";

function Incidents() {
  const { loading, incidents, refresh } = useFetchIncidents();
  const { updateStatus, success } = useUpdateStatus();

  useEffect(() => {
    if (success) refresh();
  }, [success]);

  return (
    <>
      <Actions />

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
                        incidents.map((pt, index) => (
                          <TableRow
                            key={`page-traffic-${pt.id}`}
                            item={pt}
                            index={index}
                            updateStatus={updateStatus}
                          />
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

function TableRow({ item, index, updateStatus }) {
  return (
    <tr>
      <td>
        <Card.Link href="#" className="text-primary fw-bold">
          {index + 1}
        </Card.Link>
      </td>
      <td className="fw-bold">{item.type_display.name}</td>
      <td>{item.subject}</td>
      <td>
        <p
          style={{
            width: "200px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.description}
        </p>
      </td>
      <td>{item.area.name}</td>
      <td>{item.created_on}</td>
      <td>{item.status}</td>
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
            <Dropdown.Item
              className="fw-bold"
              onClick={() =>
                updateStatus(
                  INCIDENTS_API,
                  "Are you sure you want to approve this incident for approval?",
                  item.id,
                  STATUS_FORWARD
                )
              }
            >
              <FontAwesomeIcon icon={faFileArchive} className="me-2" /> Forward
              For Approval
            </Dropdown.Item>
            <Dropdown.Item
              className="fw-bold"
              onClick={() =>
                updateStatus(
                  INCIDENTS_API,
                  "Are you sure you want to approve this incident?",
                  item.id,
                  STATUS_APPROVE
                )
              }
            >
              <FontAwesomeIcon icon={faCheck} className="me-2" /> Approve
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
}

export default Incidents;
