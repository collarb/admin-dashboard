import React, { useEffect,useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeOpenText,
  faAngleDown,
  faFileArchive,
  faCheck,
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
import useGetReports from "../../hooks/reports/useGetReports";
import Loader from "../core/Loader";
import useUpdateReport from "../../hooks/reports/useUpdateReport";
import { REPORT, STATUS_APPROVE, STATUS_FORWARD, STATUS_APPROVE_DISPLAY, 
  STATUS_REJECT_DISPLAY, STATUS_FORWARD_DISPLAY } from "../../util/constants";
import Actions from "../core/actions";
import useModal from "../../hooks/core/useModal";
import FeedbackForm from "./FeedbackForm";
import DropdownMenu from "../core/DropdownMenu";
import ReportDetail from "./ReportDetail";
import { userContext } from "../../context/userContext";

function Reports() {
  const { user } = useContext(userContext);
  const { reports, refresh, loading, refreshing } = useGetReports();
  const { updateReport, success } = useUpdateReport();
  const { openModal } = useModal();

  useEffect(() => {
    if (success) refresh();
  }, [success]);

  const handleFeedback = (id) => {
    openModal(<FeedbackForm reportId={id} />, "Add Feedback");
  };

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
                            handleFeedback={handleFeedback}
                            viewReportDetails={viewReportDetails}
                            user={user}
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

const TableRow = (props) => {
  const {
    item,
    index,
    updateReport,
    handleFeedback,
    viewReportDetails,
    user
  } = props;

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
              onClick={() => viewReportDetails(item.id)}
            >
              <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
            </Dropdown.Item>
            {
              user.is_manager &&
              <Dropdown.Item
                className="fw-bold"
                onClick={() => handleFeedback(item.id)}
              >
                <FontAwesomeIcon icon={faEnvelopeOpenText} className="me-2" /> Add
                Feedback
              </Dropdown.Item>
            }
            
            {
              user.is_data_entrant && !([STATUS_FORWARD_DISPLAY, STATUS_APPROVE_DISPLAY].includes(item.status_display)) &&
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
            }
            {
              user.is_manager &&
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
            }
          </DropdownMenu>
        </Dropdown>
      </td>
    </tr>
  );
};

export default Reports;
