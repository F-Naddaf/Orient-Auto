import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  model: String,
  mark: String,
  year: String,
  ac: String,
  doors: String,
  transmission: String,
  fuel: String,
  price: Number,
  image: String,
});

export const Car = mongoose.model("Cars", carSchema);
