import mongoose from "mongoose";
let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
  },
});

//User Model
export const User = mongoose.model("User", userSchema);
