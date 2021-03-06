import React, { useEffect, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward, faBackward, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { Form, InputGroup } from "@themesberg/react-bootstrap";
import ReactPaginate from "react-paginate";
import Moment from "react-moment";
import {
  faEnvelopeOpenText,
  faPencilAlt,
  faTrash,
  faFileArchive,
  faCheck,
  faTimesCircle,
  faEye,
  faEllipsisH,
  faAngleDown
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
  STATUS_FORWARD,
  STATUS_APPROVE_DISPLAY,
  STATUS_FORWARD_DISPLAY,
  STATUS_REJECT,
} from "../../util/constants";
import Actions from "../core/actions";
import useModal from "../../hooks/core/useModal";
import FeedbackForm from "./FeedbackForm";
import DropdownMenu from "../core/DropdownMenu";
import ReportDetail from "./ReportDetail";
import { userContext } from "../../context/userContext";
import ReportForm from "./ReportForm";
import useGetMasterData from "../../hooks/incidents/useGetMasterData";



function Reports() {
  const [filter, setFilter] = useState({});
  const [filterView, setFilterView] = useState({});
  const [searchKey, setSearchKey] = useState(null);
  const { user } = useContext(userContext);
  const {
    reports,
    refresh,
    loading,
    refreshing,
    pageCount,
    itemsPerPage,
    page,
    loadReports,
    onPageChange,
  } = useGetReports();
  const { updateReport, deleteReport, success } = useUpdateReport();
  const { openModal } = useModal();
  const {
    types
  } = useGetMasterData();

  useEffect(() => {
    if (success) refresh();
  }, [success]);

  useEffect(() => {
    if(filter) loadReports(filter, () => {});
  }, [filter]);

  const handleFeedback = (id) => {
    openModal(<FeedbackForm reportId={id} type={REPORT} />, "Add Feedback");
  };

  const handleEditReport = (report) => {
    openModal(<ReportForm report={report} edit={true} />, "Edit Report", {
      size: "lg",
    });
  };
  const viewReportDetails = (id) => {
    openModal(<ReportDetail reportId={id} />, "Report Details", { size: "xl" });
  };

  const handleFilter = (key, value, name) => {
    setFilter({...filter, [key]: value});
    if(key !== "search") setFilterView({...filterView, [key]: {value, name}});
  }

  const handleSearch = event => {
    event.preventDefault();
    setFilter({...filter, search: searchKey});
  };

  const handleCloseFilter = key => {
    const _temp = Object.assign({}, filter);
    const _tempView = Object.assign({}, filterView);
    delete _temp[key];
    delete _tempView[key];
    setFilter(_temp);
    setFilterView(_tempView);
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
                    <Col xs={12} xl={6}>
                        <div className="d-flex flex-wrap flex-md-nowrap align-items-center py-4 flex-end">
                          {
                            Object.keys(filterView).map((item, index) => (
                              <Button variant="primary" size="sm" className="me-2" key={index} onClick={() => handleCloseFilter(item)}>
                                { filterView[item]["name"] } <FontAwesomeIcon icon={faTimesCircle} />
                              </Button>
                            ))
                          }
                            <Dropdown>
                                <Dropdown.Toggle
                                    as={Button}
                                    variant="success"
                                    size="sm"
                                    className="me-2"
                                >
                                    <FontAwesomeIcon icon={faAngleDown} className="me-2" />
                                    Type Filter
                                </Dropdown.Toggle>
                                <DropdownMenu>
                                    {
                                    types.map(type=>(
                                        <Dropdown.Item className="fw-bold" onClick={() => handleFilter("type", type.id, type.name)}>
                                        :{type.name}
                                        </Dropdown.Item>
                                    ))
                                    }
                                    
                                </DropdownMenu>
                            </Dropdown>

                            <Form className="navbar-search" onSubmit={handleSearch}>
                              <Form.Group id="topbarSearch">
                                <InputGroup className="input-group-merge search-bar">
                                  <Form.Control 
                                    type="text" 
                                    placeholder="Enter Search Key and Press Enter" 
                                    value={searchKey} 
                                    onChange={event => setSearchKey(event.target.value)}
                                  />
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
                        <th className="border-0">Type</th>
                        <th className="border-0">Reference NO.</th>
                        <th className="border-0">Title</th>
                        <th className="border-0">Affected Area</th>
                        <th className="border-0">Reported On</th>
                        <th className="border-0">Status</th>
                        <th className="border-0">Views &amp;  Likes </th>
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

const TableRow = (props) => {
  const {
    item,
    index,
    updateReport,
    deleteReport,
    handleFeedback,
    handleEditReport,
  } = props;
  const { viewReportDetails, user } = props;

  return (
    <tr>
      <td>
        <Card.Link href="#" className="text-primary fw-bold">
          {index + 1}
        </Card.Link>
      </td>
      <td>{item.type_display.name}</td>
      <td>{item.ref}</td>
      <td>
        <p
          style={{
            width: "100px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.title}
        </p>
      </td>
      
      <td>{item.area.name}</td>
      <td>
        <Moment format="ddd, Do MMM YYYY">{item.created_on}</Moment>
      </td>
      <td>
        {item.status_display}
        {item.published ? " & Published" : null}
      </td>
      <td>
        <Row className="d-flex align-items-center">
          <Col className="col-auto align-items-center mx-3" xs={2} sm={2} xl={2}>
            <div className="d-flex align-items-center">
              <div>
                <h4 className="h6 mb-0 text-small">{item.views_count}</h4>
              </div>
            </div>
            <FontAwesomeIcon icon={faEye}/>
          </Col>
          <Col className="col-auto align-items-center mx-1" xs={2} sm={2} xl={2}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="h6 mb-0 text-small">{item.thumbs_up}</h4>
              </div>
            </div>
            <FontAwesomeIcon icon={faThumbsUp} />
          </Col>
        </Row>
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
            {/* view details */}
            <Dropdown.Item
              className="fw-bold"
              onClick={() => viewReportDetails(item.id)}
            >
              <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
            </Dropdown.Item>

            {!item.published && (
              <>
                {
                  // edit and delete
                  ((user.is_data_entrant &&
                    item.status_display !== STATUS_APPROVE_DISPLAY && item.status_display !== STATUS_FORWARD_DISPLAY) ||
                    user.is_manager ||
                    user.is_ddt) && (
                    <>
                      <Dropdown.Item
                        className="fw-bold"
                        onClick={() => handleEditReport(item)}
                      >
                        <FontAwesomeIcon icon={faPencilAlt} className="me-2" />{" "}
                        Edit
                      </Dropdown.Item>

                      <Dropdown.Item
                        className="fw-bold"
                        onClick={() =>
                          deleteReport(
                            "Are you sure you want to delete this report?",
                            item.id,
                            REPORT
                          )
                        }
                      >
                        <FontAwesomeIcon icon={faTrash} className="me-2" />{" "}
                        Delete
                      </Dropdown.Item>
                    </>
                  )
                }
              </>
            )}

            {/* add feedback */}
            {user.is_manager && item.status_display === STATUS_FORWARD_DISPLAY && (
              <Dropdown.Item
                className="fw-bold"
                onClick={() => handleFeedback(item.id)}
              >
                <FontAwesomeIcon icon={faEnvelopeOpenText} className="me-2" />
                Add Feedback
              </Dropdown.Item>
            )}

            {/* forward for review */}
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

            {/* reject */}
            {(user.is_manager || user.is_ddt) &&
              item.status_display === STATUS_FORWARD_DISPLAY && (
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
                  <FontAwesomeIcon icon={faFileArchive} className="me-2" />
                  Reject
                </Dropdown.Item>
              )}

            {/* approve */}
            {user.is_manager && item.status_display !== STATUS_APPROVE_DISPLAY && (
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

            {/* publish */}
            {(user.is_manager || user.is_ddt) &&
              !item.published && item.status_display === STATUS_APPROVE_DISPLAY && (
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

            {/* unpublish */}
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
