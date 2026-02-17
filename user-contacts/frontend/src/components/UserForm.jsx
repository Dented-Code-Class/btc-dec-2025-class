import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";

const UserForm = ({ addUser, editingUser, setEditingUser, updateUser }) => {
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);

  useEffect(() => {
    if (editingUser) {
      nameRef.current.value = editingUser.name ?? "";
      phoneRef.current.value = editingUser.phone ?? "";
      addressRef.current.value = editingUser.address ?? "";
    } else {
      // When edit mode ends, clear the form back to Add mode
      if (nameRef.current) nameRef.current.value = "";
      if (phoneRef.current) phoneRef.current.value = "";
      if (addressRef.current) addressRef.current.value = "";
    }
  }, [editingUser]);

  // ADDED: helper to clear form after submit/cancel
  const clearForm = () => {
    nameRef.current.value = "";
    phoneRef.current.value = "";
    addressRef.current.value = "";
  };
  return (
    <>
      <h2>{editingUser ? "UPDATE USER" : "USER FORM"}</h2>
      <hr />
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          let userObj = {
            name: nameRef.current.value,
            phone: phoneRef.current.value,
            address: addressRef.current.value,
          };
          if (editingUser) {
            updateUser(editingUser._id, userObj);
            // updateUser will setEditingUser(null) in App
          } else {
            addUser(userObj);
          }

          clearForm();
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
        <div className="d-flex gap-2">
          {/* ADDED: button text changes based on mode */}
          <Button type="submit" variant={editingUser ? "warning" : "primary"}>
            {editingUser ? "Update User" : "Add User"}
          </Button>

          {/* ADDED: Cancel editing */}
          {/* Why: lets you exit edit mode without submitting */}
          {editingUser && (
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setEditingUser(null);
                clearForm();
              }}
            >
              Cancel
            </Button>
          )}
        </div>
      </Form>
    </>
  );
};

export default UserForm;
