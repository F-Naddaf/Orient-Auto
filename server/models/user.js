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
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }],
});

export const User = mongoose.model("User", userSchema);
