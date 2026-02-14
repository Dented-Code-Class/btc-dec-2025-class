import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const TaskForm = (props) => {
  const [task, setTask] = useState("");
  const [hour, setHour] = useState(0);
  const [type, setType] = useState("good");

  // const randomIdGenerator = (inputLen = 6) => {
  //   /**
  //    * Function Description: Generate random string with length 6
  //    * inputLen: input length of string, default value is 6
  //    */
  //   const characters =
  //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  //   let rString = "";
  //   let length = inputLen;

  //   for (let i = 0; i < length; i++) {
  //     let randomNumber = Math.floor(Math.random() * characters.length);

  //     rString += characters[randomNumber];
  //   }

  //   return rString;
  // };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // create the task object

    if (task != "" && hour != 0 && type != "") {
      let taskObject = {
        task: task,
        hour: hour,
        type: type,
      };

      console.log("task object", taskObject);
      // call post api
      // create task api
      let response = await fetch("http://localhost:3000/api/v1/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indicate that the body is JSON
        },
        body: JSON.stringify(taskObject),
      });

      let data = await response.json();

      taskObject.id = data.task._id;

      // add to main original tasks list
      props.setTasks((prev) => {
        return [...prev, taskObject];
      });

      setTask("");
      setHour(0);
      setType("good");
    }
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <Row className="shadow-lg px-2 py-3 rounded-pill">
        <Col xs={6}>
          <Form.Group className="my-2" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              placeholder="Add Task"
              value={task}
              onChange={(e) => {
                setTask(e.target.value);
              }}
            />
          </Form.Group>
        </Col>
        <Col xs={2}>
          <Form.Group className="my-2" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="number"
              placeholder="Hour"
              value={hour}
              onChange={(e) => {
                setHour(parseInt(e.target.value));
              }}
            />
          </Form.Group>
        </Col>
        <Col xs={2}>
          <Form.Select
            className="my-2"
            aria-label="Default select example"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="good">Good</option>
            <option value="bad">Bad</option>
          </Form.Select>
        </Col>
        <Col xs={2}>
          <Button type="submit" className="my-2" variant="primary">
            Add Task
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default TaskForm;
