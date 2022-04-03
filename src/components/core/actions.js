import {
    faPlus,
    faBook,
    faUserShield
  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
Button,
Dropdown
} from "@themesberg/react-bootstrap";
import useModal from "../../hooks/core/useModal";
import ReportForm from "../reports/ReportForm";
import AccountForm from '../account/AccountForm';


function Actions({refresh=f=>f}) {
    
    const { openModal } = useModal();

    const addReport = () => {
        openModal(<ReportForm refresh={refresh}/>, "Create New Report");
      };

    const addUser = () => {
        openModal(<AccountForm refresh={refresh}/>, "Register user");
    }

    return(
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
                <Dropdown.Item className="fw-bold"  onClick={addUser}>
                <FontAwesomeIcon icon={faUserShield} className="me-2" /> New User
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold" onClick={addReport}>
                <FontAwesomeIcon icon={faBook} className="me-2" /> New Report
                </Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
      </div>
    );
}

export default Actions;