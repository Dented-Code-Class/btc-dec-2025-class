import React from "react";
import List from "./List";
import { Col, Row } from "react-bootstrap";

const TaskList = (props) => {
  let goodTasks = props.tasks.filter((t) => {
    return t.type == "good";
  });
  let badTasks = props.tasks.filter((t) => {
    return t.type == "bad";
  });
  return (
    <Row className="mt-4">
      <Col>
        <List
          title="GOOD LIST"
          tasks={goodTasks}
          type="good"
          swapTask={props.swapTask}
          deleteTask={props.deleteTask}
        />
      </Col>
      <Col>
        <List
          title="BAD LIST"
          tasks={badTasks}
          type="bad"
          swapTask={props.swapTask}
          deleteTask={props.deleteTask}
        />
      </Col>
    </Row>
  );
};

export default TaskList;
