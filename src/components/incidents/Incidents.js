import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText, faAngleDown, faFileArchive, faCheck, faForward, faBackward } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Button, Dropdown, Card,Table } from "@themesberg/react-bootstrap";
import ReactPaginate from 'react-paginate';
import useFetchIncidents from "../../hooks/incidents/useFetchIncidents";
import Loader from "../core/Loader";
import Actions from "../core/actions";
import useUpdateReport from "../../hooks/reports/useUpdateReport";
import { STATUS_APPROVE, STATUS_FORWARD } from "../../util/constants";
import { INCIDENTS_API } from "../../util/apis";
import DropdownMenu from '../core/DropdownMenu';

function Incidents() {
  const { loading, incidents, refresh, pageCount, itemsPerPage, page, onPageChange } = useFetchIncidents();
  const { updateReport, success } = useUpdateReport();

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
                            updateReport={updateReport}
                          />
                        ))
                      )}
                    </tbody>
                  </Table>
                  
                </Card.Body>
              </Card>

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
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

function TableRow({ item, index, updateReport }) {
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
          <DropdownMenu>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faEnvelopeOpenText} className="me-2" /> Add
              Feedback
            </Dropdown.Item>
            <Dropdown.Item
              className="fw-bold"
              onClick={() =>
                updateReport(
                  INCIDENTS_API,
                  "Are you sure you want to approve this incident for approval?",
                  item.id,
                  {
                    status: STATUS_FORWARD
                  }
                )
              }
            >
              <FontAwesomeIcon icon={faFileArchive} className="me-2" /> Forward
              For Approval
            </Dropdown.Item>
            <Dropdown.Item
              className="fw-bold"
              onClick={() =>
                updateReport(
                  INCIDENTS_API,
                  "Are you sure you want to approve this incident?",
                  item.id,
                  {
                    status: STATUS_APPROVE
                  }
                )
              }
            >
              <FontAwesomeIcon icon={faCheck} className="me-2" /> Approve
            </Dropdown.Item>
          </DropdownMenu>
        </Dropdown>
      </td>
    </tr>
  );
}

export default Incidents;
