import React from "react";
import { Alert, Button, Table } from "react-bootstrap";
import Title from "./Title";

const List = ({ title, tasks, swapTask, deleteTask, type }) => {
  // {title, tasks, type}

  let taskHours = tasks.reduce((acc, item) => {
    return acc + item.hour;
  }, 0);
  return (
    <>
      {/* <h2 className="text-center">{title}</h2> */}
      <Title title={title} />
      <hr />
      <Table striped="rows">
        <tbody>
          {tasks.map((t, idx) => {
            return (
              <tr>
                <td>{idx + 1}</td>
                <td>{t.task}</td>
                <td>{t.hour} Hrs</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => {
                      swapTask(t.id);
                    }}
                  >
                    Swap
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteTask(t.id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {type == "bad" ? (
        <Alert key="danger" variant="danger">
          You have wasted {taskHours} hours
        </Alert>
      ) : (
        <Alert key="primary" variant="primary">
          You have been productive for {taskHours} hours
        </Alert>
      )}
    </>
  );
};

export default List;
