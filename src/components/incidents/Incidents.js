import React, { useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeOpenText,
  faEllipsisH,
  faFileArchive,
  faCheck,
  faForward,
  faBackward,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Button,
  Dropdown,
  Card,
  Table,
} from "@themesberg/react-bootstrap";
import ReactPaginate from "react-paginate";
import useFetchIncidents from "../../hooks/incidents/useFetchIncidents";
import Loader from "../core/Loader";
import Actions from "../core/actions";
import useModal from "../../hooks/core/useModal";
import useUpdateReport from "../../hooks/reports/useUpdateReport";
import {
  STATUS_APPROVE,
  STATUS_FORWARD,
  STATUS_FORWARD_DISPLAY,
  STATUS_APPROVE_DISPLAY,
  STATUS_PENDING_DISPLAY,
} from "../../util/constants";
import { INCIDENTS_API } from "../../util/apis";
import DropdownMenu from "../core/DropdownMenu";
import { userContext } from "../../context/userContext";
import FeedbackForm from "../reports/FeedbackForm";
import IncidentDetail from "./IncidentDetail";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export const DashboardIncidents = () => {

  const { incidents } = useFetchIncidents(5);

  const { user } = useContext(userContext);

  const TableRow = ({item, index}) => {
    return (
      <tr>
      <td className="fw-bold">
        <Link to={`incidents/${item.id}/`}>
        {item.type_display.name}
        </Link>
      </td>
      <td>
      <p
          style={{
            width: "90px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.subject}
          </p></td>
      <td>
        <p
          style={{
            width: "90px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.description}
        </p>
      </td>
      <td>{item.area.name}</td>
      <td>{item.status_display}</td>
    </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Reported Incidents</h5>
          </Col>
          <Col className="text-end">
            <Link to={"/incidents"}>
              <Button variant="secondary" size="sm">
                View all
              </Button>
            </Link>
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Subject</th>
            <th scope="col">Description</th>
            <th scope="col">Affected Area</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {incidents.length === 0 ? (
            <div>No Reported Incidents</div>
          ) : (
            incidents.map((pt, index) => (
              <TableRow
                key={`page-traffic-${pt.id}`}
                item={pt}
                index={index}
                user={user}
              />
            ))
          )}
        </tbody>
      </Table>
    </Card>
  );
};

function Incidents() {
  const {
    loading,
    incidents,
    refresh,
    pageCount,
    itemsPerPage,
    page,
    onPageChange,
  } = useFetchIncidents();
  const { updateReport, success } = useUpdateReport();
  const { user } = useContext(userContext);
  const { openModal } = useModal();

  useEffect(() => {
    if (success) refresh();
  }, [success]);

  const viewIncidentDetails = (id) => {
    openModal(<IncidentDetail incidentId={id} />, "Incident Details", {
      size: "xl",
    });
  };

  const handleFeedback = (id) => {
    openModal(
      <FeedbackForm reportId={id} type={INCIDENTS_API} />,
      "Add Feedback"
    );
  };

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
                        <th className="border-0">Reference NO.</th>
                        <th className="border-0">Subject</th>
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
                            viewIncidentDetails={viewIncidentDetails}
                            handleFeedback={handleFeedback}
                            user={user}
                          />
                        ))
                      )}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>

              <ReactPaginate
                breakLabel="..."
                nextLabel={
                  <FontAwesomeIcon icon={faForward} className="me-2" />
                }
                onPageChange={(event) => onPageChange(event.selected)}
                pageRangeDisplayed={5}
                pageCount={Math.ceil(pageCount / itemsPerPage)}
                previousLabel={
                  <FontAwesomeIcon icon={faBackward} className="me-2" />
                }
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

function TableRow({
  item,
  index,
  updateReport,
  user,
  viewIncidentDetails,
  handleFeedback,
}) {
  return (
    <tr>
      <td>
        <Card.Link href="#" className="text-primary fw-bold">
          {index + 1}
        </Card.Link>
      </td>
      <td className="fw-bold">{item.type_display.name}</td>
      <td className="fw-bold">{item.ref}</td>
      <td>
        <p
          style={{
            width: "150px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.subject}
        </p>
      </td>
      <td>{item.area.name}</td>
      <td>
        <Moment format="ddd, Do MMM YYYY">{item.created_on}</Moment>
      </td>
      <td>{item.status_display}</td>
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
          <DropdownMenu>
            {/* view details */}
            <Dropdown.Item
              className="fw-bold"
              onClick={() => viewIncidentDetails(item.id)}
            >
              <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
            </Dropdown.Item>

            {/* forward for approval */}

            {user.is_data_entrant &&
              item.status_display === STATUS_PENDING_DISPLAY && (
                <Dropdown.Item
                  className="fw-bold"
                  onClick={() =>
                    updateReport(
                      INCIDENTS_API,
                      "Are you sure you want to forward this incident for approval?",
                      item.id,
                      {
                        status: STATUS_FORWARD,
                      }
                    )
                  }
                >
                  <FontAwesomeIcon icon={faFileArchive} className="me-2" />{" "}
                  Forward For Approval
                </Dropdown.Item>
              )}

            {/* add feedback */}

            {
              // data entrant
              ((user.is_data_entrant &&
                item.status_display === STATUS_PENDING_DISPLAY) ||
                // manager
                (user.is_manager &&
                  item.status_display === STATUS_FORWARD_DISPLAY)) && (
                <Dropdown.Item
                  className="fw-bold"
                  onClick={() => handleFeedback(item.id)}
                >
                  <FontAwesomeIcon icon={faEnvelopeOpenText} className="me-2" />{" "}
                  Add Feedback
                </Dropdown.Item>
              )
            }

            {/* Approve */}

            {user.is_manager && item.status_display === STATUS_FORWARD_DISPLAY && (
              <Dropdown.Item
                className="fw-bold"
                onClick={() =>
                  updateReport(
                    INCIDENTS_API,
                    "Are you sure you want to approve this incident?",
                    item.id,
                    {
                      status: STATUS_APPROVE,
                    }
                  )
                }
              >
                <FontAwesomeIcon icon={faCheck} className="me-2" /> Approve
              </Dropdown.Item>
            )}
          </DropdownMenu>
        </Dropdown>
      </td>
    </tr>
  );
}

export default Incidents;
