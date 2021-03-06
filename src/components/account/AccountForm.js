import React, { useState, useEffect } from "react";
import { Form, InputGroup } from "@themesberg/react-bootstrap";
import useAccountMasterData from '../../hooks/account/useAccountMasterData';
import useModal from "../../hooks/core/useModal";
import { ACTIVE, FEMALE, LOCK, MALE, ROLES } from "../../util/constants";
import useAddUser from '../../hooks/account/useAddUser';
import DangerousText from "../core/DangerousText";
import useUpdateUser from '../../hooks/account/useUpdateUser';
import { getRole } from "../../util/helper";

function AccountForm({user}) {
  const [surname, setSurname] = useState(user?.last_name || '');
  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [otherName, setOtherName] = useState(user?.other_name || '');
  const [gender, setGender] = useState(user?.gender || MALE);
  const [dob, setDob] = useState(user?.profile?.date_of_birth || '');
  const [email, setEmail] = useState(user?.email || '');
  const [mobile1, setMobile1] = useState(user?.profile?.mobile_number || '');
  const [mobile2, setMobile2] = useState(user?.profile?.mobile_number_2 || '');
  const [division, setDivision] = useState(user?.profile?.division || '');
  const [designation, setDesignation] = useState(user?.profile?.designation || '');
  const [department, setDepartment] = useState(user?.profile?.department || '');
  const [address, setAddress] = useState(user?.profile?.address || '');
  const [username, setUsername] = useState(user?.username || '');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [status, setStatus] = useState(user?.is_active || ACTIVE);
  const [hod, setHod] = useState(user?.profile?.head_of_department || "0");
  const [errorPass, setErrorPass] = useState("");
  const [role, setRole] = useState(getRole(user));

  const { divisions, departments, designations } = useAccountMasterData();
  const { ModalFooter } = useModal();
  const { addUser } = useAddUser();
  const { updateUser } = useUpdateUser();

  useEffect(() => {
    if(divisions.length) setDivision(divisions[0].id);
    if(departments.length) setDepartment(departments[0].id);
    if(designations.length) setDesignation(designations[0].id);

  }, [divisions, departments, designations]);

  const handleSubmit = event => {
    event.preventDefault();
    if(password !== repassword) {
      setErrorPass("Passwords do not match")
      return;
    }
    const payload = {
      surname,
      first_name: firstName,
      // last_name: otherName,
      last_name: surname,
      username,
      email,
      gender,
      role,
      password,
      profile: {
        ...(user?.id? {}: {mobile_number: mobile1}),
        mobile_number_2: mobile2,
        head_of_department: hod,
        division,
        department,
        designation
      }
    };
    user?.id? updateUser(user?.id, payload): addUser(payload);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Surname</Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Enter surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>First name</Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Other name</Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Enter other name"
            value={otherName}
            onChange={(e) => setOtherName(e.target.value)}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Gender</Form.Label>
        <Form.Select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value={MALE}>Male</option>
          <option value={FEMALE}>Female</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date of birth</Form.Label>
        <InputGroup>
          <Form.Control
            type="date"
            placeholder="Enter date of birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <InputGroup>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
      </Form.Group>

      {
        !user?.id &&
        <Form.Group className="mb-3">
          <Form.Label>Telephone number</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Enter telephone number"
              value={mobile1}
              onChange={(e) => setMobile1(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
      }

      <Form.Group className="mb-3">
        <Form.Label>Telephone number 2</Form.Label>
        <InputGroup>
          <Form.Control
            type="tel"
            placeholder="Enter telephone number 2"
            value={mobile2}
            onChange={(e) => setMobile2(e.target.value)}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Division</Form.Label>
        <Form.Select
          value={division}
          onChange={(e) => setDivision(e.target.value)}
          required
        >
          {divisions.map((item, index) => (
            <option key={index} value={item.id}>
              {item?.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Department</Form.Label>
        <Form.Select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        >
          {departments.map((item, index) => (
            <option key={index} value={item.id}>
              {item?.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Designation</Form.Label>
        <Form.Select
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          required
        >
          {designations.map((item, index) => (
            <option key={index} value={item.id}>
              {item?.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Head of department</Form.Label>
        <Form.Select
          value={hod}
          onChange={(e) => setHod(e.target.value)}
          required
        >
          <option value="0">No</option>
          <option value="1">Yes</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Role</Form.Label>
        <Form.Select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          {ROLES.map((item, index) => (
            <option key={index} value={item[0]}>
              {item[1]}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Address</Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputGroup>
      </Form.Group>

      {
        !user?.id && <>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <InputGroup>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputGroup>
      </Form.Group>
      {
        errorPass?
        <DangerousText message={errorPass} />
        : null
      }
      <Form.Group className="mb-3">
        <Form.Label>Confirm password</Form.Label>
        <InputGroup>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
            required
          />
        </InputGroup>
      </Form.Group>
        </>
      }

      <Form.Group className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value={ACTIVE}>Active</option>
          <option value={LOCK}>Lock</option>
        </Form.Select>
      </Form.Group>

      <ModalFooter />
    </Form>
  );
}

export default AccountForm;
