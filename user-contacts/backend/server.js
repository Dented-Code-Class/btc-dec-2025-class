import express from "express";
import mongoose, { mongo } from "mongoose";
import { configDotenv } from "dotenv";
import cors from "cors";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "./src/controllers/userController.js";

configDotenv();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/user-db";

app.use(express.json());
app.use(cors());

// GET base url
app.get("/", (req, res) => {
  return res.send({
    status: "success",
    message: "User API",
  });
});
//POST
app.post("/api/v1/users", createUser);
//GET
app.get("/api/v1/users", getUsers);

//PATCH
app.patch("/api/v1/users/:id", updateUser);
//DELETE
app.delete("/api/v1/users/:id", deleteUser);

mongoose
  .connect(MONGO_URL) // MONGOURL --> Connection string
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
