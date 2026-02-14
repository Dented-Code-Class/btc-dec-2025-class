import { User } from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    let newUser = req.body;

    let data = await User.insertOne(newUser);
    return res.send({
      status: "Success",
      messgae: "user created successfully",
      user: data,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      message: "Error creating User",
    });
  }
};
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.send({
      status: "Success",
      message: "Users found",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      message: "Error Getting User",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    let userId = req.params.id;
    let updatePayload = req.body;
    const user = await User.findByIdAndUpdate(userId, updatePayload, {
      new: true,
    });
    return res.send({
      status: "success",
      message: "Update successful",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      message: "Error updating User",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    let userId = req.params.id;
    // let data = await User.findByIdAndDelete(userId);
    let data = await User.deleteOne({ _id: userId });

    return res.send({
      status: "success",
      message: "delete user successful",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      message: "Error deleting User",
    });
  }
};
