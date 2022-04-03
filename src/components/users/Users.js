
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText, faAngleDown, faFileArchive, faEye } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Button,
  Dropdown,
  Card,
  Table,
} from "@themesberg/react-bootstrap";
import useGetUsers from "../../hooks/account/useGetUsers";
import Loader from "../core/Loader";
import Actions from "../core/actions";

function Users(){

    const {loading, users} = useGetUsers();

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
                        <h5>Users</h5>
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
                          <th className="border-0">Full Name</th>
                          <th className="border-0">Email</th>
                          <th className="border-0">Mobile Number</th>
                          <th className="border-0">Gender</th>
                          <th className="border-0">Role</th>
                          <th className="border-0">Member Since</th>
                          <th className="border-0">Status</th>
                          <th className="border-0"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <Loader />
                        ) : users.length === 0 ? (
                          <div>No Users Available</div>
                        ) : (
                          users.map((pt,index) => (
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
      <td>{item.full_name}</td>
      <td>{item.email}</td>
      <td>{item.profile?.mobile_number?item.profile.mobile_number:"NIL"}</td>
      <td>{item.gender}</td>
      <td>{item.display_role}</td>
      <td>{item.date_joined}</td>
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
              <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
}

export default Users