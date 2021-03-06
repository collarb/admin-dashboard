import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeOpenText,
  faEllipsisH,
  faFileArchive,
  faEye,
  faCheck,
  faBookReader,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Button,
  Dropdown,
  Card,
  Table,
} from "@themesberg/react-bootstrap";
import useNotifications from "../../hooks/notification/useNotifications";
import Loader from "../core/Loader";
import Actions from "../core/actions";
import DropdownMenu from "../core/DropdownMenu";
import {
  INCIDENT_NOTIFICATION,
  REPORT_NOTIFICATION,
} from "../../util/constants";
import { Link } from "react-router-dom";
import Moment from "react-moment";

function Notifications() {
  const { loading, notifications, mark_as_read } = useNotifications();

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
                      <h5>Notifications</h5>
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
                        <th className="border-0">Description</th>
                        <th className="border-0">Sent On</th>
                        <th className="border-0">Status</th>
                        <th className="border-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <Loader />
                      ) : notifications.length === 0 ? (
                        <div>No Notications</div>
                      ) : (
                        notifications.map((pt, index) => (
                          <TableRow
                            key={`page-traffic-${pt.id}`}
                            item={pt}
                            index={index}
                            mark_as_read={mark_as_read}
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

function TableRow({ item, index, mark_as_read }) {
  return (
    <tr>
      <td>
        <Card.Link href="#" className="text-primary fw-bold">
          {index + 1}
        </Card.Link>
      </td>
      <td>{item.description ? item.description : "--"}</td>
      <td><Moment format="ddd, Do MMM YYYY">{item.timestamp}</Moment></td>
      <td>{item.unread ? "Unread" : "Read"}</td>
      <td>
        <Dropdown className="btn-toolbar">
          <Dropdown.Toggle
            as={Button}
            variant="success"
            size="sm"
            className="me-2"
          >
            <FontAwesomeIcon icon={faEllipsisH} className="me-2" />
            Action
          </Dropdown.Toggle>
          <DropdownMenu className="dashboard-dropdown dropdown-menu-left">
            {item.activity_type == INCIDENT_NOTIFICATION ? (
              <Dropdown.Item className="fw-bold">
                <FontAwesomeIcon icon={faEye} className="me-2" />
                <Link to={"/incidents/" + item.activity.id}>
                  Incident Details
                </Link>
              </Dropdown.Item>
            ) : (
              <Dropdown.Item className="fw-bold">
                <FontAwesomeIcon icon={faEye} className="me-2" />
                <Link to={"/reports/" + item.activity.id}>Report Details</Link>
              </Dropdown.Item>
            )}
            {item.unread && (
              <Dropdown.Item className="fw-bold" onClick={()=>mark_as_read(item.id, index)}>
                <FontAwesomeIcon icon={faCheck} className="me-2" />
                Mark As Read
              </Dropdown.Item>
            )}
            {!item.unread && (
              <Dropdown.Item className="fw-bold">
                <FontAwesomeIcon icon={faBookReader} className="me-2" /> Mark As
                UnRead
              </Dropdown.Item>
            )}
          </DropdownMenu>
        </Dropdown>
      </td>
    </tr>
  );
}

export default Notifications;
