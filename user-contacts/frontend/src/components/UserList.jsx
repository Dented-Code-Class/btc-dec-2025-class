import React from "react";
import { Button, Table } from "react-bootstrap";

const UserList = ({ users, deleteUser }) => {
  return (
    <>
      <h2>USER LIST</h2>
      <hr />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th> Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, idx) => {
            return (
              <tr>
                <td>{idx + 1}</td>
                <td>{u.name}</td>
                <td>{u.phone}</td>
                <td>{u.address}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteUser(u._id);
                    }}
                  >
                    Delete
                  </Button>
                  <Button>Update</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default UserList;
