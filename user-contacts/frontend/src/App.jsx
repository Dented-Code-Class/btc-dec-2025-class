import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

function App() {
  const [users, setUsers] = useState([
    {
      _id: "12",
      name: "mark",
      phone: 982392,
      address: "lidcombe",
    },
  ]);
  const [editingUser, setEditingUser] = useState(null);
  const fetchUser = async () => {
    let response = await fetch("http://localhost:3000/api/v1/users");
    let data = await response.json();
    console.log(data);
    setUsers(data.users);
  };

  const addUser = async (userObj) => {
    let response = await fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });
    let data = await response.json();
    fetchUser();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const deleteUser = async (id) => {
    let response = await fetch("http://localhost:3000/api/v1/users/" + id, {
      method: "DELETE",
    });
    let data = await response.json();
    console.log(data);
    if (data.status === "success") {
      let filteredUsers = users.filter((item) => item._id != id);
      setUsers(filteredUsers);
    }
  };
  const updateUser = async (id, updateUser) => {
    let response = await fetch("http://localhost:3000/api/v1/users/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUser),
    });
    let data = await response.json();
    fetchUser();
    setEditingUser(null);
  };

  return (
    <>
      <UserList
        users={users}
        deleteUser={deleteUser}
        setEditingUser={setEditingUser}
      />
      <UserForm
        addUser={addUser}
        editingUser={editingUser}
        updateUser={updateUser}
        setEditingUser={setEditingUser}
      />
    </>
  );
}

export default App;
