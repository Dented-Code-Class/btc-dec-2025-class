import express from "express";
import fs from "fs";
import { randomIdGenerator } from "./helpers/helper.js";
import mongoose, { mongo } from "mongoose";
import { configDotenv } from "dotenv";
import cors from "cors";

configDotenv();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/ntdl-d";

// TAsk schema
let taskSchema = new mongoose.Schema({
  task: {
    type: String,
    require: true,
  },
  hour: {
    type: Number,
    require: true,
  },
  type: {
    type: String,
    enum: ["good", "bad"],
    require: true,
  },
});

//Task model
const Task = mongoose.model("Task", taskSchema);

app.use(express.json());
app.use(cors());
// req.body

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
app.post("/api/v1/tasks", async (req, res) => {
  // 1. get paylod
  try {
    let newTask = req.body;
    // 1.1 populate new id
    // newTask.id = randomIdGenerator();
    // // 2. read database
    // let taskList = JSON.parse(fs.readFileSync("./data/tasks.json", "utf-8"));
    // // 3. get task list
    // taskList.push(newTask);
    // // 4. write to database / file
    // fs.writeFileSync("./data/tasks.json", JSON.stringify(taskList));

    console.log(1010, newTask);
    let data = await Task.insertOne(newTask);

    console.log(2020, data);

    return res.status(201).send({
      status: "success",
      message: "Task Created",
      task: data,
    });
  } catch (error) {
    console.log("err");
    return res.send({
      status: "Error",
      message: "Error found",
    });
  }
});

// Read
app.get("/api/v1/tasks", async (req, res) => {
  // 1. read file
  // let tasks = JSON.parse(fs.readFileSync("./data/tasks.json", "utf-8"));

  const tasks = await Task.find();
  return res.status(200).send({
    status: "success",
    message: "Tasks Found!",
    tasks,
  });
});

// Update
app.patch("/api/v1/tasks/:id", async (req, res) => {
  try {
    //1. get task id
    let taskid = req.params.id;

    // read tasks.json
    // let taskList = JSON.parse(fs.readFileSync("./data/tasks.json", "utf-8"));

    // // find the task with the same taskId

    // let task = taskList.find((t) => t.id == taskid);

    // //get update payload
    // let updatePayload = req.body;

    // task.hour = updatePayload.hour ?? task.hour;
    // task.type = updatePayload.type ?? task.type;

    // // write the changes in the file
    // fs.writeFileSync("./data/tasks.json", JSON.stringify(taskList));
    let updatePayload = req.body;

    const data = await Task.findByIdAndUpdate(taskid, updatePayload, {
      new: true,
    });

    return res.send({
      status: "success",
      message: "Update successful",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "Error",
      message: "Updating Failed",
      Error,
    });
  }
});

// Delete
app.delete("/api/v1/tasks/:id", async (req, res) => {
  //1. get task id
  try {
    let taskid = req.params.id;

    // // read tasks.json
    // let taskList = JSON.parse(fs.readFileSync("./data/tasks.json", "utf-8"));

    // // find the task with the same taskId
    // let task = taskList.find((t) => t.id === taskid);

    // if (task) {
    //   let filtertask = taskList.filter((t) => t.id != taskid);

    //   // write the changes in the file
    //   fs.writeFileSync("./data/tasks.json", JSON.stringify(filtertask));

    let data = await Task.findByIdAndDelete(taskid);
    return res.send({
      status: "success",
      message: "Delete successful",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "Error",
      message: "Error deleting task",
    });
  }
});

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MONGO CONNECTED", MONGO_URL);
    app.listen(PORT, (error) => {
      if (error) {
        console.log(error);
        console.log("SERVER did not start!");
      } else {
        console.log("Server started at PORT: ", PORT);
      }
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("ERROR MONGO");
  });
