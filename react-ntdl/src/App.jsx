import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Title from "./components/Title";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Hours from "./components/Hours";
import { Container } from "react-bootstrap";

function App() {
  const [tasks, setTasks] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [loadCounter, setLoadCounter] = useState(0);

  // Swap task functionality
  const swapTask = async (id) => {
    let tempTaskList = [...tasks];
    // let tempTaskList = tasks;

    let selectedTask = tempTaskList.find((item) => item.id === id);
    selectedTask.type = selectedTask.type === "good" ? "bad" : "good";

    // call patch api
    let response = await fetch("http://localhost:3000/api/v1/tasks/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", // Indicate that the body is JSON
      },
      body: JSON.stringify({ type: selectedTask.type }),
    });

    setTasks(tempTaskList);
  };

  // TODO: Delete task functionality
  const deleteTask = async (id) => {
    // delete api call
    let response = await fetch("http://localhost:3000/api/v1/tasks/" + id, {
      method: "DELETE",
    });

    let data = await response.json();
    if (data.status === "success") {
      let filteredTasks = tasks.filter((item) => item.id != id);
      setTasks(filteredTasks);
    }
  };

  // fetch task using api
  const fetchTasks = async () => {
    let response = await fetch("http://localhost:3000/api/v1/tasks", {
      method: "GET",
    });

    let data = await response.json();

    console.log(1111, data);

    let fetchedTasks = data.tasks.map((t) => {
      return { ...t, id: t._id };
    });

    setTasks(fetchedTasks);
  };

  // USE EFFECT
  // SIDE EFFECT HOOK
  useEffect(() => {
    // retrieve tasks from local storage

    // fetch api
    fetchTasks();
    // let data = JSON.parse(localStorage.getItem("tasks")) || [];
    // setTasks(data);
  }, []);

  useEffect(() => {
    let tempTotalHours = tasks.reduce((acc, item) => {
      return acc + item.hour;
    }, 0);

    setTotalHours(tempTotalHours);

    setLoadCounter((prev) => {
      return prev + 1;
    });
  }, [tasks]);

  return (
    <>
      <Container>
        <Title title="NOT TO DO LIST" />
        <TaskForm setTasks={setTasks} />
        <TaskList tasks={tasks} swapTask={swapTask} deleteTask={deleteTask} />
        <Hours totalHours={totalHours} />
      </Container>
    </>
  );
}

export default App;
