import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Container, InputGroup, Card } from "@themesberg/react-bootstrap";
import Loader from "../core/Loader";
import useForgotPassword from "../../hooks/account/useForgotPassword";
import Background from '../../assets/img/kampala2.jpeg';
import { Link } from "react-router-dom";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const { submitForgotPassword, loading } = useForgotPassword();

    const submit = event => {
        event.preventDefault();
        if (email) {
            submitForgotPassword({action: "request", email});
        }
    }

    return (
        <main style={{
            backgroundImage: `url(${Background})`,
            height: "100vh",
            width: "100%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}>
            <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container>
                    <Row className="justify-content-center form-bg-image">
                        <Col
                            xs={12}
                            className="d-flex align-items-center justify-content-center"
                        >
                            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <div className="text-center text-md-center mb-4 mt-md-0">
                                    <h3 className="mb-0">Reset  Password</h3>
                                </div>
                                {
                                    loading ? <Loader /> : null
                                }
                                <Form className="mt-4" onSubmit={submit}>
                                    <Form.Group id="email" className="mb-4">
                                        <Form.Label>Email or phone number you registered your account with</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faEnvelope} />
                                            </InputGroup.Text>
                                            <Form.Control
                                                autoFocus
                                                required
                                                type="text"
                                                name="email"
                                                placeholder="Enter your email or phone number"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                            />
                                        </InputGroup>

                                    </Form.Group>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <Card.Link className="small text-end" >
                                            <Link to="/login">Have an account? Login</Link>
                                        </Card.Link>
                                    </div>
                                    <Button variant="primary" type="submit" className="w-100">
                                        Submit
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

export default ForgotPassword;