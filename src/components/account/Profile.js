import React, { useContext } from "react";
import { Card } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass, faClock, faEnvelope, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";
import { userContext } from '../../context/userContext';

function Profile() {
    const { user } = useContext(userContext);

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
      <div className="d-flex align-items-center justify-content-between border-bottom border-light py-3">
          <div>
            <h6>
              <FontAwesomeIcon
                icon={faUser}
                className="icon icon-xs me-3"
              />
              Username
            </h6>
          </div>
          <div>
            <Card.Link href="#" className="text-primary">
              {user.username}
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
              Surname
            </h6>
          </div>
          <div>
            <Card.Link href="#" className="text-primary">
              {user.surname}
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
              First name
            </h6>
          </div>
          <div>
            <Card.Link href="#" className="text-primary">
              {user.first_name}
            </Card.Link>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between py-3">
          <div>
            <h6>
              <FontAwesomeIcon icon={faEnvelope} className="icon icon-xs me-3" />
              Email
            </h6>
          </div>
          <div>
            <Card.Link href="#" className="text-primary fw-bold">
              {user.email}
            </Card.Link>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between border-bottom border-light py-3">
          <div>
            <h6>
              <FontAwesomeIcon
                icon={faPhone}
                className="icon icon-xs me-3"
              />
              Mobile number
            </h6>
          </div>
          <div>
            <Card.Link href="#" className="text-primary">
              {user.profile?.mobile_number}
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
              Role
            </h6>
          </div>
          <div>
            <Card.Link href="#" className="text-primary">
              {user.display_role}
            </Card.Link>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between border-bottom border-light py-3">
          <div>
            <h6>
              <FontAwesomeIcon
                icon={faClock}
                className="icon icon-xs me-3"
              />
              Date joined
            </h6>
          </div>
          <div>
            <Card.Link href="#" className="text-primary">
            {<Moment format="ddd, Do MMM YYYY">{user.date_joined}</Moment>}
            </Card.Link>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Profile;
