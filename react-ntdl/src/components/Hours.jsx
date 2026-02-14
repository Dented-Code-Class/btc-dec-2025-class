import React from "react";
import { Alert, Col, Row } from "react-bootstrap";

const Hours = (props) => {
  return (
    <Row>
      <Col>
        <Alert key="primary" variant="primary">
          Total Hours: {props.totalHours}
        </Alert>
      </Col>
    </Row>
  );
};

export default Hours;
