import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import {  Col, Row, Form, Card, Button, Container, InputGroup } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import useLogin from '../../hooks/account/useLogin';
import Loader from "../core/Loader";
import Background from '../../assets/img/kampala.jpeg';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {loading, signin} = useLogin();

    const submit = event => {
        event.preventDefault();
        signin({username,password});
    }

  return (
    <main style={{backgroundImage: `url(${Background})`, height: "100vh", width: "100%"}}>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center form-bg-image">
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to KCCA Connect</h3>
                </div>
                {
                  loading?<Loader/>:null
                }
                <Form className="mt-4" onSubmit={submit}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Username</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        required
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="password"
                          name="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Card.Link className="small text-end" >
                        <Link to="/forgot_password">Lost password?</Link>
                      </Card.Link>
                    </div>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Sign in
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}

export default Login;
