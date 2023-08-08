import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  password: String,
  age: Number,
  address: String,
  city: String,
  zipCode: String,
  token: String,
});

export const User = mongoose.model("User", userSchema);
