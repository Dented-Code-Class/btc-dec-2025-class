import express from "express";
import fs from "fs";
import { randomIdGenerator } from "./helpers/helper.js";

const app = express();
const PORT = 3000;

// req.body
app.use(express.json());

// GET base url
app.get("/", (req, res) => {
  return res.send({
    status: "success",
    message: "TASK API",
  });
});

// CRUD OPERATION TASK

// Create
// POST api/v1/tasks
// {task, hour, type}
app.post("/api/v1/tasks", (req, res) => {
  // 1. get paylod
  let newTask = req.body;
  // 1.1 populate new id
  newTask.id = randomIdGenerator();
  // 2. read database
  let taskList = JSON.parse(fs.readFileSync("./data/tasks.json", "utf-8"));
  // 3. get task list
  taskList.push(newTask);
  // 4. write to database / file
  fs.writeFileSync("./data/tasks.json", JSON.stringify(taskList));

  return res.status(201).send({
    status: "success",
    message: "Task Created",
  });
});

// Read
app.get("/api/v1/tasks", (req, res) => {
  // 1. read file
  let tasks = JSON.parse(fs.readFileSync("./data/tasks.json", "utf-8"));
  return res.status(200).send({
    status: "success",
    message: "Tasks Found!",
    tasks,
  });
});

// Update

// Delete
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
    console.log("SERVER did not start!");
  } else {
    console.log("Server started at PORT: ", PORT);
  }
});
