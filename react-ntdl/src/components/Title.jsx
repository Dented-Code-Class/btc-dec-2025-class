import React from "react";
import { Col, Row } from "react-bootstrap";

const Title = (props) => {
  return (
    <Row>
      <Col className="my-3 text-center">
        {/* Header */}
        {/* {Title({ title: "TEST" })} */}
        <h1>{props.title}</h1>
      </Col>
    </Row>
  );
};

export default Title;
