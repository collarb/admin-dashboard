import React, { useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward, faBackward } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from 'react-paginate';
import Moment from 'react-moment';
import {
  faEnvelopeOpenText,
  faAngleDown,
  faPencilAlt,
  faTrash,
  faFileArchive,
  faCheck,
  faTimesCircle,
  faEye,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Button,
  Dropdown,
  Card,
  Table,
} from "@themesberg/react-bootstrap";
import useGetReports from "../../hooks/reports/useGetReports";
import Loader from "../core/Loader";
import useUpdateReport from "../../hooks/reports/useUpdateReport";
import {
  REPORT,
  STATUS_APPROVE,
  STATUS_COMPLETE,
  STATUS_FORWARD,
  STATUS_APPROVE_DISPLAY,
  STATUS_REJECT_DISPLAY,
  STATUS_FORWARD_DISPLAY,
  STATUS_REJECT,
} from "../../util/constants";
import Actions from "../core/actions";
import useModal from "../../hooks/core/useModal";
import FeedbackForm from "./FeedbackForm";
import DropdownMenu from "../core/DropdownMenu";
import ReportDetail from "./ReportDetail";
import { userContext } from '../../context/userContext';
import ReportForm from './ReportForm';

function Reports() {
  const { user } = useContext(userContext);
  const { reports, refresh, loading, refreshing, pageCount, itemsPerPage, page, onPageChange } = useGetReports();
  const { updateReport, deleteReport, success } = useUpdateReport();
  const { openModal } = useModal();
  
  useEffect(() => {
    if (success) refresh();
  }, [success]);

  const handleFeedback = (id) => {
    openModal(<FeedbackForm reportId={id} />, "Add Feedback");
  };

  const handleEditReport = (report) => {
    openModal(<ReportForm report={report} edit={true} />, "Edit Report");
  }
  const viewReportDetails = (id) => {
    openModal(<ReportDetail reportId={id} />, "Report Details", { size: "xl" });
  };

  return (
    <>
      <Actions refresh={refresh} />
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
                        <th className="border-0">Ref NO.</th>
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
                        <div>No Reports Yet</div>
                      ) : (
                        reports.map((pt, index) => (
                          <TableRow
                            key={`page-traffic-${pt.id}`}
                            index={index}
                            item={pt}
                            updateReport={updateReport}
                            deleteReport={deleteReport}
                            handleFeedback={handleFeedback}
                            handleEditReport={handleEditReport}
                            viewReportDetails={viewReportDetails}
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

const TableRow = (props) => {
  const { item, index, updateReport, deleteReport, handleFeedback, handleEditReport } = props;
  const {
    viewReportDetails,
    user,
  } = props;

  return (
    <tr>
      <td>
        <Card.Link href="#" className="text-primary fw-bold">
          {index + 1}
        </Card.Link>
      </td>
      <td>{item.type_display.name}</td>
      <td>{item.ref}</td>
      <td>{item.title}</td>
      <td>
        <p
          style={{
            width: "100px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.description}
        </p>
      </td>
      <td>{item.area.name}</td>
      <td>
      <Moment format='ddd, Do MMM YYYY'>{item.created_on}</Moment>
      </td>
      <td>
        {item.status_display}
        {item.published ? " & Published" : null}
      </td>
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
            <Dropdown.Item
              className="fw-bold"
              onClick={() => handleFeedback(item.id)}
            >
              <FontAwesomeIcon icon={faEnvelopeOpenText} className="me-2" /> Add
              Feedback
            </Dropdown.Item>
            <Dropdown.Item
              className="fw-bold"
              onClick={() =>
                updateReport(
                  REPORT,
                  "Are you sure you want to forward this report for review?",
                  item.id,
                  {
                    status: STATUS_FORWARD,
                  }
                )
              }>Forward</Dropdown.Item>
            <Dropdown.Item
              className="fw-bold"
              onClick={() => viewReportDetails(item.id)}
            >
              <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
            </Dropdown.Item>
            <Dropdown.Item
              className="fw-bold"
              onClick={() =>
                updateReport(
                  REPORT,
                  "Are you sure you want to approve this report?",
                  item.id,
                  {
                    status: STATUS_APPROVE,
                  }
                )
              }
            >
              <FontAwesomeIcon icon={faCheck} className="me-2" /> Approve
            </Dropdown.Item>
            {item.status !== STATUS_COMPLETE && (
              <>
                <Dropdown.Item
                  className="fw-bold"
                  onClick={() =>
                    handleEditReport(item )
                  }
                >
                  <FontAwesomeIcon icon={faPencilAlt} className="me-2" /> Edit
                </Dropdown.Item>

                <Dropdown.Item
                  className="fw-bold"
                  onClick={() =>
                    deleteReport(
                      "Are you sure you want to delete this report?",
                      item.id,
                    )
                  }
                >
                  <FontAwesomeIcon icon={faTrash} className="me-2" /> Delete
                </Dropdown.Item>
              </>
            )}
            {user.is_manager &&
              [STATUS_FORWARD_DISPLAY].includes(item.status_display) && (
                <Dropdown.Item
                  className="fw-bold"
                  onClick={() => handleFeedback(item.id)}
                >
                  <FontAwesomeIcon icon={faEnvelopeOpenText} className="me-2" />{" "}
                  Add Feedback
                </Dropdown.Item>
              )}

            {user.is_data_entrant &&
              ![STATUS_FORWARD_DISPLAY, STATUS_APPROVE_DISPLAY].includes(
                item.status_display
              ) && (
                <Dropdown.Item
                  className="fw-bold"
                  onClick={() =>
                    updateReport(
                      REPORT,
                      "Are you sure you want to forward this report for review?",
                      item.id,
                      {
                        status: STATUS_FORWARD,
                      }
                    )
                  }
                >
                  <FontAwesomeIcon icon={faFileArchive} className="me-2" />{" "}
                  Forward For Review
                </Dropdown.Item>
              )}
            {(user.is_manager || user.is_ddt) &&
              [STATUS_FORWARD_DISPLAY].includes(item.status_display) && (
                <Dropdown.Item
                  className="fw-bold"
                  onClick={() =>
                    updateReport(
                      REPORT,
                      "Are you sure you want to reject this report?",
                      item.id,
                      {
                        status: STATUS_REJECT,
                      }
                    )
                  }
                >
                  <FontAwesomeIcon icon={faFileArchive} className="me-2" />{" "}
                  Forward For Review
                </Dropdown.Item>
              )}
            {user.is_manager &&
              ![STATUS_APPROVE_DISPLAY].includes(item.status_display) && (
                <Dropdown.Item
                  className="fw-bold"
                  onClick={() =>
                    updateReport(
                      REPORT,
                      "Are you sure you want to approve this report?",
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
            {(user.is_manager || user.is_ddt) &&
              !item.published &&
              [STATUS_APPROVE_DISPLAY].includes(item.status_display) && (
                <Dropdown.Item
                  className="fw-bold"
                  onClick={() =>
                    updateReport(
                      REPORT,
                      "Are you sure you want to publish this report?",
                      item.id,
                      {
                        published: true,
                      }
                    )
                  }
                >
                  <FontAwesomeIcon icon={faCheck} className="me-2" /> Publish
                </Dropdown.Item>
              )}
            {(user.is_manager || user.is_ddt) && item.published && (
              <Dropdown.Item
                className="fw-bold"
                onClick={() =>
                  updateReport(
                    REPORT,
                    "Are you sure you want to unpublish this report?",
                    item.id,
                    {
                      published: false,
                    }
                  )
                }
              >
                <FontAwesomeIcon icon={faTimesCircle} className="me-2" />
                Unpublish
              </Dropdown.Item>
            )}
          </DropdownMenu>
        </Dropdown>
      </td>
    </tr>
  );
};

export default Reports;
