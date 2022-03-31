import React, { useState } from "react";
import { Form, InputGroup } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useModal from "../../hooks/core/useModal";
import useAddIncident from '../../hooks/incidents/useAddIncident';

function ReportForm() {
  const {addIncident} = useAddIncident();
  const {ModalFooter} = useModal();

  const submit = event => {
      event.preventDefault();
  }

  return (
    <Form onSubmit={submit}>
      <Form.Group className="mb-3">
        <Form.Label>Icon Right</Form.Label>
        <InputGroup>
          <Form.Control type="text" placeholder="Search" />
          <InputGroup.Text>
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Icon Right</Form.Label>
        <InputGroup>
          <Form.Control type="text" placeholder="Search" />
          <InputGroup.Text>
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Icon Right</Form.Label>
        <InputGroup>
          <Form.Control type="text" placeholder="Search" />
          <InputGroup.Text>
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Icon Right</Form.Label>
        <InputGroup>
          <Form.Control type="text" placeholder="Search" />
          <InputGroup.Text>
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Icon Right</Form.Label>
        <InputGroup>
          <Form.Control type="text" placeholder="Search" />
          <InputGroup.Text>
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Icon Right</Form.Label>
        <InputGroup>
          <Form.Control type="text" placeholder="Search" />
          <InputGroup.Text>
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Icon Right</Form.Label>
        <InputGroup>
          <Form.Control type="text" placeholder="Search" />
          <InputGroup.Text>
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Icon Right</Form.Label>
        <InputGroup>
          <Form.Control type="text" placeholder="Search" />
          <InputGroup.Text>
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <ModalFooter />
    </Form>
  );
}

export default ReportForm;
