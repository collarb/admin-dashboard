import React, { useState } from "react";
import { Form, InputGroup } from "@themesberg/react-bootstrap";
import useUpdateReport from '../../hooks/reports/useUpdateReport';
import { REPORT_API } from "../../util/apis";
import useModal from "../../hooks/core/useModal";
import { REPORT } from '../../util/constants';

function FeedbackForm({ reportId, type }) {
    const [feedback, setFeedback] = useState("");
    const { submitUpdate } = useUpdateReport();
    const { ModalFooter } = useModal();

    const submit = (event) => {
        event.preventDefault();
        submitUpdate(
            type,
            reportId,
            {
              feedback: feedback
            }
        );
    }
    
    return (
        <Form onSubmit={submit}>
    
          <Form.Group className="mb-3">
            <Form.Label>Feedback</Form.Label>
            <InputGroup>
              <Form.Control
                as="textarea"
                rows="4"
                placeholder="Enter feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>
    
          <ModalFooter />
        </Form>
    );
}

export default FeedbackForm;
