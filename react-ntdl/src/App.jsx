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
  const swapTask = (id) => {
    let tempTaskList = [...tasks];
    // let tempTaskList = tasks;

    let selectedTask = tempTaskList.find((item) => item.id === id);
    selectedTask.type = selectedTask.type === "good" ? "bad" : "good";
    setTasks(tempTaskList);
  };

  // TODO: Delete task functionality
  const deleteTask = (id) => {
    let filteredTasks = tasks.filter((item) => item.id != id);
    setTasks(filteredTasks);
  };

  // USE EFFECT
  // SIDE EFFECT HOOK
  useEffect(() => {
    // retrieve tasks from local storage
    let data = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(data);
  }, []);

  useEffect(() => {
    let tempTotalHours = tasks.reduce((acc, item) => {
      return acc + item.hour;
    }, 0);

    setTotalHours(tempTotalHours);

    if (loadCounter > 0) {
      // update/save tasks to local storage
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

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
