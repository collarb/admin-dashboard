
import React from "react";
import { Form, InputGroup } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faEye, faForward, faBackward } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Button,
  Dropdown,
  Card,
  Table,
} from "@themesberg/react-bootstrap";
import ReactPaginate from 'react-paginate';
import useGetUsers from "../../hooks/account/useGetUsers";
import Loader from "../core/Loader";
import Actions from "../core/actions";
import {ROLES, USER_STATUSES, USER_GENDER} from "../../util/constants";
import DropdownMenu from '../core/DropdownMenu';

function Users(){

    const {loading, users, pageCount, itemsPerPage, page, onPageChange} = useGetUsers();

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
                      <Col>
                        <div className="d-flex flex-wrap flex-md-nowrap align-items-center py-4">
                                <Dropdown>
                                    <Dropdown.Toggle
                                        as={Button}
                                        variant="success"
                                        size="sm"
                                        className="me-2"
                                    >
                                        <FontAwesomeIcon icon={faAngleDown} className="me-2" />
                                        Status Filter
                                    </Dropdown.Toggle>
                                    <DropdownMenu>
                                        {
                                        USER_STATUSES.map(status=>(
                                            <Dropdown.Item className="fw-bold">
                                            :{status[1]}
                                            </Dropdown.Item>
                                        ))
                                        }
                                        
                                    </DropdownMenu>
                                </Dropdown>
                                <Dropdown>
                                    <Dropdown.Toggle
                                        as={Button}
                                        variant="success"
                                        size="sm"
                                        className="me-2"
                                    >
                                        <FontAwesomeIcon icon={faAngleDown} className="me-2" />
                                        Role Filter
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
                                        {
                                        ROLES.map(role=>(
                                            <Dropdown.Item className="fw-bold">
                                            :{role[1]}
                                            </Dropdown.Item>
                                        ))
                                        }
                                        
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown>
                                    <Dropdown.Toggle
                                        as={Button}
                                        variant="success"
                                        size="sm"
                                        className="me-2"
                                    >
                                        <FontAwesomeIcon icon={faAngleDown} className="me-2" />
                                        Gender Filter
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
                                        {
                                        USER_GENDER.map(gender=>(
                                            <Dropdown.Item className="fw-bold">
                                            :{gender[1]}
                                            </Dropdown.Item>
                                        ))
                                        }
                                        
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Form className="navbar-search">
                                  <Form.Group id="topbarSearch">
                                    <InputGroup className="input-group-merge search-bar">
                                      <Form.Control type="text" placeholder="Search" />
                                    </InputGroup>
                                  </Form.Group>
                                </Form>
                        </div>
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
                          <th className="border-0">Actions</th>
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

        <ReactPaginate
          breakLabel="..."
          nextLabel={<FontAwesomeIcon icon={faForward} className="me-2" />}
          onPageChange={event => onPageChange(event.selected)}
          pageRangeDisplayed={5}
          pageCount={Math.ceil(pageCount / itemsPerPage)}
          previousLabel={<FontAwesomeIcon icon={faBackward} className="me-2" />}
          renderOnZeroPageCount={null}
          forcePage={page}
          containerClassName={"pagination justify-content-end"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
          breakClassName={"pafaArrowRightge-item"}
          breakLinkClassName={"page-link"}
        />
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
        <a><FontAwesomeIcon icon={faEye} /> View Details</a>
      </td>
    </tr>
  );
}

export default Users