import React, { useState, useEffect } from "react";
import { Form, InputGroup } from "@themesberg/react-bootstrap";
import PropTypes from 'prop-types';
import useModal from "../../hooks/core/useModal";
import useGetMasterData from "../../hooks/incidents/useGetMasterData";
import Loader from "../core/Loader";
import useAddReport from '../../hooks/reports/useAddReport';

function ReportForm({refresh, report}) {
  const [reportType, setReportType] = useState(report?.reportType || "");
  const [division, setDivision] = useState(report?.division || "");
  const [parish, setParish] = useState(report?.parish || "");
  const [village, setVillage] = useState(report?.village || "");
  const [street, setStreet] = useState(report?.street || "");
  const [title, setTitle] = useState(report?.title || "");
  const [description, setDescription] = useState(report?.description || "");
  const [attachment, setAttachment] = useState(report?.attachment || null);
  const {
    divisions,
    parishes,
    villages,
    streets,
    loading,
    types,
    fetchChildren,
  } = useGetMasterData();
  const { addReport, success } = useAddReport();
  const { ModalFooter, closeModal } = useModal();

  useEffect(() => {
    if(success) {
      closeModal();
      refresh();
    }
  }, [success]);

  useEffect(() => {
    if (types && types.length) {
      setReportType(types[0].id);
    }
  }, [types]);

  useEffect(() => {
    if (divisions && divisions.length) {
      setDivision(divisions[0].id);
      fetchChildren(divisions[0].id, "parishes");
    }
  }, [divisions]);

  useEffect(() => {
    if (parishes && parishes.length) {
      setParish(parishes[0].id);
      fetchChildren(parishes[0].id, "villages");
    }
  }, [parishes]);

  useEffect(() => {
    if (villages && villages.length) {
      setVillage(villages[0].id);
      fetchChildren(villages[0].id, "streets");
    }
  }, [villages]);

  useEffect(() => {
    if (streets && streets.length) {
      setStreet(streets[0].id);
    }
  }, [streets]);

  const handleDivision = (obj) => {
    setDivision(obj);
    fetchChildren(obj, "parishes");
  };

  const handleParish = (obj) => {
    setParish(obj);
    fetchChildren(obj, "villages");
  };

  const handleVillage = (obj) => {
    setVillage(obj);
    fetchChildren(obj, "streets");
  };

  const handleStreet = (obj) => {
    setStreet(obj);
  };

  const submit = (event) => {
    event.preventDefault();
    addReport({
      title,
      description,
      ...(attachment? {attachment: attachment}: {}),
      type: reportType,
      affected_area: street,
    });
  };

  return (
    <Form onSubmit={submit}>
      {
        loading && <Loader />
      }

      <Form.Group className="mb-3">
        <Form.Label>Type</Form.Label>
        <Form.Select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          required
        >
          {types.map((item, index) => (
            <option key={index} value={item.id}>
              {item?.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Division</Form.Label>
        <Form.Select
          value={division}
          onChange={(e) => handleDivision(e.target.value)}
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
        <Form.Label>Parish</Form.Label>
        <Form.Select
          value={parish}
          onChange={(e) => handleParish(e.target.value)}
          required
        >
          {parishes.map((item, index) => (
            <option key={index} value={item.id}>
              {item?.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Village</Form.Label>
        <Form.Select
          value={village}
          onChange={(e) => handleVillage(e.target.value)}
          required
        >
          {villages.map((item, index) => (
            <option key={index} value={item.id}>
              {item?.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Street</Form.Label>
        <Form.Select
          value={street}
          onChange={(e) => handleStreet(e.target.value)}
          required
        >
          {streets.map((item, index) => (
            <option key={index} value={item.id}>
              {item?.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <InputGroup>
          <Form.Control
            as="textarea"
            rows="4"
            placeholder="Enter description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Attachment</Form.Label>
        <InputGroup>
          <Form.Control type="file" />
        </InputGroup>
      </Form.Group>

      <ModalFooter />
    </Form>
  );
}

export default ReportForm;
