
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText, faAngleDown, faFileArchive } from "@fortawesome/free-solid-svg-icons";
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

function Notifications() {

    const {loading, notifications} = useNotifications();

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
                          notifications.map((pt,index) => (
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

};

function TableRow({item, index}) {

  return (
    <tr>
      <td>
        <Card.Link href="#" className="text-primary fw-bold">
          {index+1}
        </Card.Link>
      </td>
      <td>{item.description ? item.description : "--"}</td>
      <td>{item.timestamp}</td>
      <td>{item.uread? "Unread":"Read"}</td>
      <td className="d-flex justify-content-between flex-wrap flex-md-nowrap">
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
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left">
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faEnvelopeOpenText} className="me-2" /> Mark As
              Read
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faFileArchive} className="me-2" /> Mark As
              UnRead
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
}

export default Notifications;