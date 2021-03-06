import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropdownMenu from '../core/DropdownMenu';
import {
  faAngleDown,
  faAngleUp,
  faChartArea,
  faChartBar,
  faChartLine,
  faFlagUsa,
  faFolderOpen,
  faGlobeEurope,
  faPaperclip,
  faUserPlus,
  faPaste,
  faCalendar,
  faCheck,
  faHourglass,
  faMapMarker,
  faStickyNote,
  faEye,
  faThumbsUp,
  faBell,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  faAngular,
  faBootstrap,
  faReact,
  faVuejs,
} from "@fortawesome/free-brands-svg-icons";
import {
  Col,
  Row,
  Card,
  Image,
  Button,
  ListGroup,
  ProgressBar,
  Dropdown,
} from "@themesberg/react-bootstrap";
import {
  CircleChart,
  BarChart,
  DataValueChart,
  DataValueChartphone,
} from "./Charts";

import Profile1 from "../../assets/img/team/profile-picture-1.jpg";
import ProfileCover from "../../assets/img/profile-cover.jpg";

import teamMembers from "../../data/teamMembers";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { fullScreenPlugin } from "@react-pdf-viewer/full-screen";
import Moment from "react-moment";
import { Notification } from "./Navbar";
import { Link } from "react-router-dom";
import useNotifications from "../../hooks/notification/useNotifications";
import useGetMasterData from "../../hooks/incidents/useGetMasterData";

export const ProfileCardWidget = () => {
  return (
    <Card border="light" className="text-center p-0 mb-4">
      <div
        style={{ backgroundImage: `url(${ProfileCover})` }}
        className="profile-cover rounded-top"
      />
      <Card.Body className="pb-5">
        <Card.Img
          src={Profile1}
          alt="Neil Portrait"
          className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4"
        />
        <Card.Title>Neil Sims</Card.Title>
        <Card.Subtitle className="fw-normal">
          Senior Software Engineer
        </Card.Subtitle>
        <Card.Text className="text-gray mb-4">New York, USA</Card.Text>

        <Button variant="primary" size="sm" className="me-2">
          <FontAwesomeIcon icon={faUserPlus} className="me-1" /> Connect
        </Button>
        <Button variant="secondary" size="sm">
          Send Message
        </Button>
      </Card.Body>
    </Card>
  );
};

export const ChoosePhotoWidget = (props) => {
  const { title, photo } = props;

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">{title}</h5>
        <div className="d-xl-flex align-items-center">
          <div className="user-avatar xl-avatar">
            <Image fluid rounded src={photo} />
          </div>
          <div className="file-field">
            <div className="d-flex justify-content-xl-center ms-xl-3">
              <div className="d-flex">
                <span className="icon icon-md">
                  <FontAwesomeIcon icon={faPaperclip} className="me-3" />
                </span>
                <input type="file" />
                <div className="d-md-block text-start">
                  <div className="fw-normal text-dark mb-1">Choose Image</div>
                  <div className="text-gray small">
                    JPG, GIF or PNG. Max size of 800K
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export const CounterWidgetOld = (props) => {
  const { icon, iconColor, category, title, period, percentage } = props;
  const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
  const percentageColor = percentage < 0 ? "text-danger" : "text-success";

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <Row className="d-block d-xl-flex align-items-center">
          <Col
            xl={5}
            className="text-xl-center d-flex align-items-center justify-content-xl-center mb-3 mb-xl-0"
          >
            <div
              className={`icon icon-shape icon-md icon-${iconColor} rounded me-4 me-sm-0`}
            >
              <FontAwesomeIcon icon={icon} />
            </div>
            <div className="d-sm-none">
              <h5>{category}</h5>
              <h3 className="mb-1">{title}</h3>
            </div>
          </Col>
          <Col xs={12} xl={7} className="px-xl-0">
            <div className="d-none d-sm-block">
              <h5>{category}</h5>
              <h3 className="mb-1">{title}</h3>
            </div>
            <small>
              {period}, <FontAwesomeIcon icon={faGlobeEurope} size="xs" />{" "}
              WorldWide
            </small>
            <div className="small mt-2">
              <FontAwesomeIcon
                icon={percentageIcon}
                className={`${percentageColor} me-1`}
              />
              <span className={`${percentageColor} fw-bold`}>
                {percentage}%
              </span>{" "}
              Since last month
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export const CounterWidget = (props) => {
  const { icon, iconColor, category, title, period, percentage, description } = props;
  const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
  const percentageColor = percentage < 0 ? "text-danger" : "text-success";

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <Row className="d-block d-xl-flex align-items-center">
          <Col
            xl={3}
            className="text-xl-center d-flex align-items-center justify-content-xl-center mb-3 mb-xl-0"
          >
            <div
              className={`icon icon-shape icon-md icon-${iconColor} rounded me-4 me-sm-0`}
            >
              <FontAwesomeIcon icon={icon} />
            </div>
            <div className="d-sm-none">
              <h5>{category}</h5>
              <h3 className="mb-1">{title}</h3>
            </div>
          </Col>
          <Col xs={12} xl={7} className="px-xl-0">
            <div className="d-none d-sm-block">
              <h5>{category}</h5>
              <h3 className="mb-1">{title}</h3>
            </div>
            <small>
              {period} <FontAwesomeIcon icon={faCalendar} size="xs" />
            </small>
            <div className="small mt-2">
              {description}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export const CircleChartWidget = (props) => {
  const { title, data = [] } = props;
  const series = data.map((d) => d.value);

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <Row className="d-block d-xl-flex align-items-center">
          <Col
            xs={12}
            xl={5}
            className="text-xl-center d-flex align-items-center justify-content-xl-center mb-3 mb-xl-0"
          >
            <CircleChart series={series} />
          </Col>
          <Col xs={12} xl={7} className="px-xl-0">
            <h5 className="mb-3">{title}</h5>

            {data.map((d) => (
              <h6
                key={`circle-element-${d.id}`}
                className="fw-normal text-gray"
              >
                <FontAwesomeIcon
                  icon={d.icon}
                  className={`icon icon-xs text-${d.color} w-20 me-1`}
                />
                {` ${d.label} `}
                {`${d.value}%`}
              </h6>
            ))}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export const BarChartWidget = (props) => {
  const { title, value, percentage, data = [] } = props;
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const series = data.map((d) => d.value);
  const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
  const percentageColor = percentage < 0 ? "text-danger" : "text-success";

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="d-flex flex-row align-items-center flex-0 border-bottom">
        <div className="d-block">
          <h6 className="fw-normal text-gray mb-2">{title}</h6>
          <h3>{value}</h3>
          <small className="mt-2">
            <FontAwesomeIcon
              icon={percentageIcon}
              className={`${percentageColor} me-1`}
            />
            <span className={`${percentageColor} fw-bold`}>{percentage}%</span>
          </small>
        </div>
        <div className="d-block ms-auto">
          {data.map((d) => (
            <div
              key={`bar-element-${d.id}`}
              className="d-flex align-items-center text-end mb-2"
            >
              <span className={`shape-xs rounded-circle bg-${d.color} me-2`} />
              <small className="fw-normal">{d.label}</small>
            </div>
          ))}
        </div>
      </Card.Body>
      <Card.Body className="p-2">
        <BarChart labels={labels} series={series} />
      </Card.Body>
    </Card>
  );
};

export const TeamMembersWidget = () => {
  const TeamMember = (props) => {
    const { name, statusKey, image, icon, btnText } = props;
    const status = {
      online: { color: "success", label: "Online" },
      inMeeting: { color: "warning", label: "In a meeting" },
      offline: { color: "danger", label: "Offline" },
    };

    const statusColor = status[statusKey] ? status[statusKey].color : "danger",
      statusLabel = status[statusKey] ? status[statusKey].label : "Offline";

    return (
      <ListGroup.Item className="px-0">
        <Row className="align-items-center">
          <Col className="col-auto">
            <a href="#top" className="user-avatar">
              <Image src={image} className="rounded-circle" />
            </a>
          </Col>
          <Col className="ms--2">
            <h4 className="h6 mb-0">
              <a href="#!">{name}</a>
            </h4>
            <span className={`text-${statusColor}`}>??? </span>
            <small>{statusLabel}</small>
          </Col>
          <Col className="col-auto">
            <Button variant="tertiary" size="sm">
              <FontAwesomeIcon icon={icon} className="me-1" /> {btnText}
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header className="border-bottom border-light d-flex justify-content-between">
        <h5 className="mb-0">Team members</h5>
        <Button variant="secondary" size="sm">
          See all
        </Button>
      </Card.Header>
      <Card.Body>
        <ListGroup className="list-group-flush list my--3">
          {teamMembers.map((tm) => (
            <TeamMember key={`team-member-${tm.id}`} {...tm} />
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export const ProgressTrackWidget = () => {
  const Progress = (props) => {
    const { title, percentage, icon, color, last = false } = props;
    const extraClassName = last ? "" : "mb-2";

    return (
      <Row className={`align-items-center ${extraClassName}`}>
        <Col xs="auto">
          <span className={`icon icon-md text-${color}`}>
            <FontAwesomeIcon icon={icon} className="me-1" />
          </span>
        </Col>
        <Col>
          <div className="progress-wrapper">
            <div className="progress-info">
              <h6 className="mb-0">{title}</h6>
              <small className="fw-bold text-dark">
                <span>{percentage} %</span>
              </small>
            </div>
            <ProgressBar variant={color} now={percentage} min={0} max={100} />
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header className="border-bottom border-light">
        <h5 className="mb-0">Progress track</h5>
      </Card.Header>
      <Card.Body>
        <Progress
          title="Rocket - SaaS Template"
          color="purple"
          icon={faBootstrap}
          percentage={34}
        />
        <Progress
          title="Pixel - Design System"
          color="danger"
          icon={faAngular}
          percentage={60}
        />
        <Progress
          title="Spaces - Listings Template"
          color="tertiary"
          icon={faVuejs}
          percentage={45}
        />
        <Progress
          title="Stellar - Dashboard"
          color="info"
          icon={faReact}
          percentage={35}
        />
        <Progress
          last
          title="Volt - Dashboard"
          color="purple"
          icon={faBootstrap}
          percentage={34}
        />
      </Card.Body>
    </Card>
  );
};

export const RankingWidget = () => {
  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between border-bottom border-light pb-3">
          <div>
            <h6>
              <FontAwesomeIcon
                icon={faGlobeEurope}
                className="icon icon-xs me-3"
              />{" "}
              Global Rank
            </h6>
          </div>
          <div>
            <Card.Link href="#" className="text-primary fw-bold">
              #755 <FontAwesomeIcon icon={faChartLine} className="ms-2" />
            </Card.Link>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between border-bottom border-light py-3">
          <div>
            <h6 className="mb-0">
              <FontAwesomeIcon icon={faFlagUsa} className="icon icon-xs me-3" />
              Country Rank
            </h6>
            <div className="small card-stats">
              United States{" "}
              <FontAwesomeIcon
                icon={faAngleUp}
                className="icon icon-xs text-success ms-2"
              />
            </div>
          </div>
          <div>
            <Card.Link href="#top" className="text-primary fw-bold">
              #32 <FontAwesomeIcon icon={faChartLine} className="ms-2" />
            </Card.Link>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between pt-3">
          <div>
            <h6 className="mb-0">
              <FontAwesomeIcon
                icon={faFolderOpen}
                className="icon icon-xs me-3"
              />
              Category Rank
            </h6>
            <Card.Link href="#top" className="small card-stats">
              Travel &gt; Accomodation
            </Card.Link>
          </div>
          <div>
            <Card.Link href="#top" className="text-primary fw-bold">
              #16 <FontAwesomeIcon icon={faChartLine} className="ms-2" />
            </Card.Link>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export const ReportedIncidentsWidget = (props) => {
  const { title, filterDate, chart_data, setDivision } = props;
  const { divisions } = useGetMasterData();

  return (
    <Card className="bg-success-alt shadow-sm">
      <Card.Header className="d-flex flex-row align-items-center flex-0">
        <div className="d-block">
          <h4 className="fw-normal mb-2">{title}</h4>
        </div>
        <div className="d-flex ms-auto">
          <Dropdown>
            <Dropdown.Toggle
              as={Button}
              variant="success"
              size="sm"
              className="me-2"
            >
              <FontAwesomeIcon icon={faCalendar} className="me-2" />
              Filter By Date
            </Dropdown.Toggle>

            <DropdownMenu>
              <Dropdown.Item className="fw-bold" onClick={() => filterDate("1")}>
                This month
              </Dropdown.Item>

              <Dropdown.Item className="fw-bold" onClick={() => filterDate("2")}>
                Last month
              </Dropdown.Item>

              <Dropdown.Item className="fw-bold" onClick={() => filterDate("3")}>
                Custom
              </Dropdown.Item>
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
              Filter By Division
            </Dropdown.Toggle>
            <DropdownMenu>
              <Dropdown.Item className="fw-bold" onClick={() => setDivision(null)}>
                All
              </Dropdown.Item>
              {
                divisions.map(division => (
                  <Dropdown.Item className="fw-bold" onClick={() => setDivision(division)}>
                    {division.name}
                  </Dropdown.Item>
                ))
              }

            </DropdownMenu>
          </Dropdown>
        </div>
      </Card.Header>
      <Card.Body className="px-2">
        <DataValueChart data={chart_data} />
      </Card.Body>
    </Card>
  );
};

export const SalesValueWidgetPhone = (props) => {
  const { title, value, percentage } = props;
  const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
  const percentageColor = percentage < 0 ? "text-danger" : "text-success";

  return (
    <Card className="bg-secondary-alt shadow-sm">
      <Card.Header className="d-md-flex flex-row align-items-center flex-0">
        <div className="d-block mb-3 mb-md-0">
          <h5 className="fw-normal mb-2">{title}</h5>
          <h3>${value}</h3>
          <small className="fw-bold mt-2">
            <span className="me-2">Yesterday</span>
            <FontAwesomeIcon
              icon={percentageIcon}
              className={`${percentageColor} me-1`}
            />
            <span className={percentageColor}>{percentage}%</span>
          </small>
        </div>
        <div className="d-flex ms-auto">
          <Button variant="secondary" size="sm" className="me-2">
            Month
          </Button>
          <Button variant="primary" size="sm" className="me-3">
            Week
          </Button>
        </div>
      </Card.Header>
      <Card.Body className="p-2">
        <DataValueChartphone />
      </Card.Body>
    </Card>
  );
};

export const AcquisitionWidget = () => {
  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <h5>Acquisition</h5>
        <p>
          Tells you where your visitors originated from, such as search engines,
          social networks or website referrals.
        </p>
        <div className="d-block">
          <div className="d-flex align-items-center pt-3 me-5">
            <div className="icon icon-shape icon-sm icon-shape-danger rounded me-3">
              <FontAwesomeIcon icon={faChartBar} />
            </div>
            <div className="d-block">
              <label className="mb-0">Bounce Rate</label>
              <h4 className="mb-0">33.50%</h4>
            </div>
          </div>
          <div className="d-flex align-items-center pt-3">
            <div className="icon icon-shape icon-sm icon-shape-quaternary rounded me-3">
              <FontAwesomeIcon icon={faChartArea} />
            </div>
            <div className="d-block">
              <label className="mb-0">Sessions</label>
              <h4 className="mb-0">9,567</h4>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export const ReportDetailWidget = ({ data = {} }) => {
  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between border-bottom border-light pb-3">
          <div>
            <h6>
              <FontAwesomeIcon
                icon={faFolderOpen}
                className="icon icon-xs me-3"
              />
              Type
            </h6>
          </div>
          <div>
            <Card.Link href="#" className="text-primary">
              {data.type_display ? data.type_display.name : "NIL"}
            </Card.Link>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between border-bottom border-light py-3">
          <div>
            <h6>
              <FontAwesomeIcon icon={faPaste} className="icon icon-xs me-3" />
              Subject
            </h6>
            <div className="align-items-center">
              <Card.Link href="#" className="text-primary">
                {data.subject ? data.subject : "NIL"}
              </Card.Link>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between border-bottom border-light py-3">
          <div>
            <h6>
              <FontAwesomeIcon
                icon={faStickyNote}
                className="icon icon-xs me-3"
              />
              Description
            </h6>
            <div className="align-items-center">
              <Card.Link href="#" className="text-primary">
                {data.description ? data.description : "NIL"}
              </Card.Link>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between border-bottom border-light py-3">
          <div>
            <h6>
              <FontAwesomeIcon
                icon={faMapMarker}
                className="icon icon-xs me-3"
              />
              Affected Area
            </h6>
            <div className="align-items-center">
              <Card.Link href="#" className="text-primary">
                {data.area?.description ? data.area.description : "NIL"}
              </Card.Link>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between border-bottom border-light py-3">
          <div>
            <h6>
              <FontAwesomeIcon
                icon={faCalendar}
                className="icon icon-xs me-3"
              />
              Created On
            </h6>
          </div>
          <div>
            <Card.Link href="#" className="text-primary">
              <Moment format="ddd, D MMM YYYY H:MM:SS">
                {data.created_on ? data.created_on : "NIL"}
              </Moment>
            </Card.Link>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between border-bottom border-light py-3">
          <div>
            <h6>
              <FontAwesomeIcon
                icon={faHourglass}
                className="icon icon-xs me-3"
              />
              Status
            </h6>
          </div>
          <div>
            <Card.Link href="#" className="text-primary">
              {data.status_display ? data.status_display.toUpperCase() : "NIL"}
            </Card.Link>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between py-3">
          <div>
            <h6>
              <FontAwesomeIcon icon={faCheck} className="icon icon-xs me-3" />
              Published
            </h6>
          </div>
          <div>
            <Card.Link href="#" className="text-primary fw-bold">
              {data?.published ? "YES" : "NO"}
            </Card.Link>
          </div>
        </div>

        {data?.published && (
          <>
            <div className="d-flex align-items-center justify-content-between border-bottom border-top border-light py-3">
              <div>
                <h6>
                  <FontAwesomeIcon icon={faEye} className="icon icon-xs me-3" />
                  Views
                </h6>
              </div>
              <div>
                <Card.Link href="#" className="text-primary fw-bold">
                  {data?.views_count}
                </Card.Link>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between py-3">
              <div>
                <h6>
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    className="icon icon-xs me-3"
                  />
                  Likes
                </h6>
              </div>
              <div>
                <Card.Link href="#" className="text-primary fw-bold">
                  {data?.thumbs_up}
                </Card.Link>
              </div>
            </div>
          </>
        )}

        <div className="d-flex align-items-center justify-content-between border-top border-bottom border-light py-3">
          <div>
            <h6>
              <FontAwesomeIcon
                icon={faUser}
                className="icon icon-xs me-3"
              />
              Created By
            </h6>
          </div>
          <div>
            <Card.Link href="#" className="text-primary">
              <h6>
                {data.user ? `${data.user.full_name} (${data.user.display_role})` : "NIL"}
              </h6>
              {data.user.profile ? ` ${data.user.profile.mobile_number} | ${data.user.profile.mobile_number_2} ` : ""}
            </Card.Link>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between border-top border-light py-3">
          <div>
            <h6>
              <FontAwesomeIcon
                icon={faStickyNote}
                className="icon icon-xs me-3"
              />
              Feedback
            </h6>
            <div className="align-items-center">
              <Card.Link href="#" className="text-primary">
                {data.feedback ? data.feedback : "NIL"}
              </Card.Link>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export const IncidentDetailWidget = ({ data = {} }) => {
  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between border-bottom border-light pb-3">
          <div>
            <h6>
              <FontAwesomeIcon
                icon={faFolderOpen}
                className="icon icon-xs me-3"
              />
              Type
            </h6>
          </div>
          <div>
            <Card.Link href="#" className="text-primary">
              {data.type_display ? data.type_display.name : "NIL"}
            </Card.Link>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between border-bottom border-light py-3">
          <div>
            <h6>
              <FontAwesomeIcon icon={faPaste} className="icon icon-xs me-3" />
              Subject
            </h6>
            <div className="align-items-center">
              <Card.Link href="#" className="text-primary">
                {data.subject ? data.subject : "NIL"}
              </Card.Link>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between border-bottom border-light py-3">
          <div>
            <h6>
              <FontAwesomeIcon
                icon={faStickyNote}
                className="icon icon-xs me-3"
              />
              Description
            </h6>
            <div className="align-items-center">
              <Card.Link href="#" className="text-primary">
                {data.description ? data.description : "NIL"}
              </Card.Link>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between border-bottom border-light py-3">
          <div>
            <h6>
              <FontAwesomeIcon
                icon={faMapMarker}
                className="icon icon-xs me-3"
              />
              Affected Area
            </h6>
            <div className="align-items-center">
              <Card.Link href="#" className="text-primary">
                {data.area?.description ? data.area.description : "NIL"}
              </Card.Link>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between border-bottom border-light py-3">
          <div>
            <h6>
              <FontAwesomeIcon
                icon={faMapMarker}
                className="icon icon-xs me-3"
              />
              GPS Co-ordinates
            </h6>
            <div className="align-items-center">
              <Card.Link href="#" className="text-primary">
                {data.latitude ? data.latitude : "NIL"}, {data.longitude ? data.longitude : "NIL"}
              </Card.Link>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between border-bottom border-light py-3">
          <div>
            <h6>
              <FontAwesomeIcon
                icon={faCalendar}
                className="icon icon-xs me-3"
              />
              Reported On
            </h6>
          </div>
          <div>
            <Card.Link href="#" className="text-primary">
              <Moment format="ddd, Do MMM YYYY H:MM:SS">
                {data.created_on ? data.created_on : "NIL"}
              </Moment>
            </Card.Link>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between border-bottom border-light py-3">
          <div>
            <h6>
              <FontAwesomeIcon
                icon={faHourglass}
                className="icon icon-xs me-3"
              />
              Status
            </h6>
          </div>
          <div>
            <Card.Link href="#" className="text-primary">
              {data.status_display ? data.status_display.toUpperCase() : "NIL"}
            </Card.Link>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between border-bottom border-light py-3">
          <div>
            <h6>
              <FontAwesomeIcon
                icon={faUser}
                className="icon icon-xs me-3"
              />
              Reported By
            </h6>
          </div>
          <div>
            <Card.Link href="#" className="text-primary">
              <h6>{data.user ? `${data.user.full_name} (${data.user.display_role})` : "NIL"}</h6>
              {data.user.profile ? ` ${data.user.profile.mobile_number} | ${data.user.profile.mobile_number_2}` : ""}
            </Card.Link>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between border-light py-3">
          <div>
            <h6>
              <FontAwesomeIcon
                icon={faStickyNote}
                className="icon icon-xs me-3"
              />
              Feedback
            </h6>
            <div className="align-items-center">
              <Card.Link href="#" className="text-primary">
                {data.feedback ? data.feedback : "NIL"}
              </Card.Link>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export const AttachementPreviewWidget = ({ title, attachment }) => {
  const fullScreenPluginInstance = fullScreenPlugin({ enableShortcuts: true });
  const { EnterFullScreen } = fullScreenPluginInstance;

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="d-flex flex-row align-items-center flex-0 border-bottom">
        <div className="d-block">
          <h6 className="fw-normal text-gray mb-2">{title}</h6>
        </div>
      </Card.Body>
      <Card.Body className="p-2">
        {String(attachment)?.includes(".pdf") ? (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
            <div
              style={{
                border: "1px solid rgba(0, 0, 0, 0.3)",
                height: "100%",
              }}
            >
              <Viewer
                fileUrl={attachment}
                theme="auto"
                defaultScale={1}
                plugins={[fullScreenPluginInstance]}
              />
              <EnterFullScreen />
            </div>
          </Worker>
        ) : (
          <Image fluid={true} src={attachment} />
        )}
      </Card.Body>
    </Card>
  );
};

export const NotificationWidget = () => {
  const { notifications } = useNotifications("unread=true");
  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <div className="d-flex align-items-center justify-content-between pt-2">
              <h6>
                <FontAwesomeIcon
                  icon={faBell}
                  className="icon icon-xs me-3"
                />
                Notifications
              </h6>
            </div>
          </Col>
          <Col className="text-end">
            <Link to={"/notifications"}>
              <Button variant="success" size="sm">
                View all
              </Button>
            </Link>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <ListGroup className="list-group-flush">
          {notifications.map(n => <Notification key={`notification-${n.id}`} {...n} />)}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
