import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward, faBackward } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from 'react-paginate';
import {
  faEnvelopeOpenText,
  faAngleDown,
  faFileArchive,
  faCheck,
  faPencilAlt,
  faTrash
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
} from "../../util/constants";
import Actions from "../core/actions";
import useModal from "../../hooks/core/useModal";
import FeedbackForm from "./FeedbackForm";
import DropdownMenu from "../core/DropdownMenu";
import ReportForm from './ReportForm';

function Reports() {
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
                        reports.map((pt, index) => (
                          <TableRow
                            key={`page-traffic-${pt.id}`}
                            index={index}
                            item={pt}
                            updateReport={updateReport}
                            deleteReport={deleteReport}
                            handleFeedback={handleFeedback}
                            handleEditReport={handleEditReport}
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

  return (
    <tr>
      <td>
        <Card.Link href="#" className="text-primary fw-bold">
          {index + 1}
        </Card.Link>
      </td>
      <td>{item.type_display.name}</td>
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
      <td>{item.created_on}</td>
      <td>{item.status_display}</td>
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
              }
            >
              <FontAwesomeIcon icon={faFileArchive} className="me-2" /> Forward
              For Review
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
          </DropdownMenu>
        </Dropdown>
      </td>
    </tr>
  );
};

export default Reports;
