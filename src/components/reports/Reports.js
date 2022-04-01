import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faBook,
  faEnvelopeOpenText,
  faUserShield,
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
import useModal from "../../hooks/core/useModal";
import ReportForm from "./ReportForm";
import useGetReports from "../../hooks/reports/useGetReports";
import Loader from "../core/Loader";
import useUpdateStatus from "../../hooks/core/useUpdateStatus";
import { REPORT, STATUS_APPROVE, STATUS_FORWARD } from "../../util/constants";

function Reports() {
  const { openModal } = useModal();
  const { reports, refresh, loading, refreshing } = useGetReports();
  const { updateStatus, success } = useUpdateStatus();

  useEffect(() => {
    if (success) refresh();
  }, [success]);

  const addForm = () => {
    openModal(<ReportForm refresh={refresh} />, "Add incident");
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Dropdown className="btn-toolbar">
          <Dropdown.Toggle
            as={Button}
            variant="primary"
            size="sm"
            className="me-2"
          >
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Action
          </Dropdown.Toggle>
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faUserShield} className="me-2" /> New User
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold" onClick={addForm}>
              <FontAwesomeIcon icon={faBook} className="me-2" /> New Report
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

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

const TableRow = (props) => {
  const { item, index, updateStatus } = props;

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
                  REPORT,
                  "Are you sure you want to forward this report for review?",
                  item.id,
                  STATUS_FORWARD
                )
              }
            >
              <FontAwesomeIcon icon={faFileArchive} className="me-2" /> Forward
              For Review
            </Dropdown.Item>
            <Dropdown.Item
              className="fw-bold"
              onClick={() =>
                updateStatus(
                  REPORT,
                  "Are you sure you want to approve this report?",
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
};

export default Reports;
