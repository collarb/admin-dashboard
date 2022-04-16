
import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { Row, Col, Nav, Image, Navbar, Dropdown, Container, ListGroup } from '@themesberg/react-bootstrap';
import NOTIFICATIONS_DATA from "../../data/notifications";
import Profile3 from "../../assets/img/team/profile-picture-3.jpg";
import { userContext } from '../../context/userContext';
import { authContext } from '../../context/authContext';
import useModal from '../../hooks/core/useModal';
import Profile from '../account/Profile';
import Moment from "react-moment";


export default () => {
  const {user} = useContext(userContext);
  const {logout} = useContext(authContext);
  const { openModal } = useModal();

  const viewProfile = () => {
    openModal(<Profile />, "Account Profile", { size: "lg" });
  }

  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  const areNotificationsRead = notifications.reduce((acc, notif) => acc && notif.read, true);

  const markNotificationsAsRead = () => {
    setTimeout(() => {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    }, 300);
  };

  const NotificationOld = (props) => {
    const { link, sender, image, time, message, read = false } = props;
    const readClassName = read ? "":"text-danger";

    return (
      <ListGroup.Item action href={link} className="border-bottom border-light">
        <Row className="align-items-center">
          <Col className="col-auto">
            <Image src={image} className="user-avatar lg-avatar rounded-circle" />
          </Col>
          <Col className="ps-0 ms--2">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="h6 mb-0 text-small">{sender}</h4>
              </div>
              <div className="text-end">
                <small className={readClassName}>{time}</small>
              </div>
            </div>
            <p className="font-small mt-1 mb-0">{message}</p>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  };

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
          </div>
          <Nav className="align-items-center">

            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <Image src={Profile3} className="user-avatar md-avatar rounded-circle" />
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold">{user?.surname} {user?.first_name} ({user?.username})</span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                <Dropdown.Item className="fw-bold" onClick={() => viewProfile()}>
                  <FontAwesomeIcon icon={faUserCircle} className="me-2" /> My Profile
                </Dropdown.Item>

                <Dropdown.Divider />

                <Dropdown.Item className="fw-bold" onClick={logout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};


export const Notification = (props) => {
  const { link, description, image, activity, message, timestamp ,unread = false } = props;
  const readClassName = unread ? "text-danger":"";

  return (
    <ListGroup.Item action href={link} className="border-bottom border-light">
      <Row className="align-items-center">
        {/* <Col className="col-auto">
          <Image src={image} className="user-avatar lg-avatar rounded-circle" />
        </Col> */}
        <Col className="ps-0 ms--2">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="h6 mb-0 text-small">{description}</h4>
            </div>
            <div className="text-end">
              <small className={readClassName}>{<Moment format="ddd, Do MMM YYYY">{timestamp}</Moment>}</small>
            </div>
          </div>
          <p className="font-small mt-1 mb-0">{activity.subject}</p>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};