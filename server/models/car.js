import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  model: String,
  mark: String,
  year: String,
  ac: String,
  doors: String,
  transmision: String,
  fuel: String,
  available: Number,
  image: String,
  locationId: String,
});

export const Car = mongoose.model("Cars", carSchema);
