import React, { useRef } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";

const UserForm = ({ addUser }) => {
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  return (
    <>
      <h2>USER FORM</h2>
      <hr />
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          let userObj = {
            name: nameRef.current.value,
            phone: phoneRef.current.value,
            address: addressRef.current.value,
          };
          addUser(userObj);
        }}
      >
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Name</Form.Label>
            <Form.Control
              ref={nameRef}
              required
              type="text"
              placeholder="Name"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Phone NUmber</Form.Label>
            <Form.Control
              ref={phoneRef}
              required
              type="number"
              placeholder="phone Number"
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Address</Form.Label>

            <Form.Control ref={addressRef} type="text" placeholder="Address" />
          </Form.Group>
        </Row>
        <Button type="submit">Submit form</Button>
      </Form>
    </>
  );
};

export default UserForm;
