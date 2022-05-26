import React, { useState } from 'react';
import { Form, InputGroup } from "@themesberg/react-bootstrap";
import useModal from '../../hooks/core/useModal';

function CustomDateFilterForm({ handleParams, formatDate }) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { ModalFooter , closeModal} = useModal();

    const customFilter = duration => {
        const { start, end } = duration;
        return {
            ...(start? {start: formatDate(new Date(duration.start))}: {}),
            ...(end? {end: formatDate(new Date(duration.end))}: {})
        }
    };

    const submit = (event) => {
        event.preventDefault();
        handleParams(customFilter({start: startDate, end: endDate}));
        closeModal();
    };

    return (
        <Form onSubmit={submit}>
            <Form.Group className="mb-3">
                <Form.Label>Start</Form.Label>
                <InputGroup>
                <Form.Control
                    type="date"
                    placeholder="Start date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>End</Form.Label>
                <InputGroup>
                <Form.Control
                    type="date"
                    placeholder="End date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                </InputGroup>
            </Form.Group>

            <ModalFooter />
        </Form>
    );
}

export default CustomDateFilterForm;